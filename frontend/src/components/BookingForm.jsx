import { useState, useEffect } from "react";

function BookingForm({refreshRooms}) {
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [message, setMessage] = useState("");

  const authHeader = {
    Authorization: "Basic " + btoa("admin:admin123"),
    "Content-Type": "application/json",
  };

  // Fetch guests & rooms on mount
  useEffect(() => {
    fetch("http://localhost:8080/guests", { headers: authHeader })
      .then((res) => res.json())
      .then(setGuests);

    fetch("http://localhost:8080/rooms", { headers: authHeader })
      .then((res) => res.json())
      .then(setRooms);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedGuest || selectedRooms.length === 0) {
      setMessage("Please select guest and at least one room.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/bookings", {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          guestId: selectedGuest,
          roomIds: selectedRooms.map(Number),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Booking created successfully!");
        setSelectedRooms([]);
        setSelectedGuest("");
        refreshRooms?.();
      } else {
        setMessage(`❌ Error: ${data.error || JSON.stringify(data)}`);
      }
    } catch (err) {
      setMessage(`❌ Something went wrong: ${err.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">📅 Create Booking</h2>

      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Guest select */}
        <div>
          <label className="block mb-1 font-semibold">Guest:</label>
          <select
            value={selectedGuest}
            onChange={(e) => setSelectedGuest(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Guest</option>
            {guests.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} (ID: {g.id})
              </option>
            ))}
          </select>
        </div>

        {/* Rooms select */}
        <div>
          <label className="block mb-1 font-semibold">Rooms:</label>
          <select
            multiple
            value={selectedRooms}
            onChange={(e) =>
              setSelectedRooms(Array.from(e.target.selectedOptions, (o) => o.value))
            }
            className="w-full p-2 border rounded h-40"
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id} disabled={!r.available}>
                #{r.number} (Floor {r.floor}) {r.available ? "" : "(Booked)"}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Hold Ctrl (Cmd on Mac) to select multiple rooms.
          </p>
        </div>

        <button type="submit" className="w-full py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
          Book Rooms
        </button>
      </form>
    </div>
  );
}

export default BookingForm;