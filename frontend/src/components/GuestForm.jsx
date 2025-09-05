import { useState, useEffect } from "react";

function GuestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);
  const [guests, setGuests] = useState([]);

  // Fetch guests on load
  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = () => {
    fetch("http://localhost:8080/guests", {
      headers: {
        Authorization: "Basic " + btoa("admin:admin123"),
      },
    })
      .then((res) => res.json())
      .then((data) =>{
        console.log("Guest fetched:", data);
       setGuests(data)})
      .catch((err) =>{console.error("Error fetching guests:", err);
        setGuests([])});
  };

  const handleCreateGuest = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("admin:admin123"),
      },
      body: JSON.stringify({ name, email, phone }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Guest creation failed");
        }
        return res.json();
      })
      .then((data) => {
        setMessage({ type: "success", text: `Guest created! ID: ${data.id}` });
        setName("");
        setEmail("");
        setPhone("");
        fetchGuests(); // refresh list
      })
      .catch((err) => {
        setMessage({ type: "error", text: err.message });
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">👤 Create Guest</h2>
      <form onSubmit={handleCreateGuest} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          ➕ Add Guest
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      {/* Guests List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">📋 Guest List</h3>
        {guests.length === 0 ? (
          <p className="text-gray-500 text-sm">No guests found</p>
        ) : (
          <ul className="space-y-2">
            {guests.map((g) => (
              <li
                key={g.id}
                className="p-2 border rounded-md bg-gray-50 flex justify-between"
              >
                <span>
                  <strong>{g.name}</strong> ({g.email}) — {g.phone}
                </span>
                <span className="text-sm text-gray-600">ID: {g.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GuestForm;