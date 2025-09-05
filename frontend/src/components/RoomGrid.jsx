import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const RoomGrid = forwardRef((props, ref) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authHeader = {
    Authorization: "Basic " + btoa("admin:admin123"),
    "Content-Type": "application/json",
  };

  const fetchRooms = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:8080/rooms", { headers: authHeader })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch rooms: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  useImperativeHandle(ref, () => ({
    refresh: fetchRooms
  }));

  useEffect(() => {
    fetchRooms();
  }, []);

  const randomizeOccupancy = () => {
    fetch("http://localhost:8080/rooms/random-occupancy", {
      method: "POST",
      headers: authHeader,
    }).then(fetchRooms);
  };

  const resetOccupancy = () => {
    fetch("http://localhost:8080/rooms/reset", {
      method: "POST",
      headers: authHeader,
    }).then(fetchRooms);
  };

  if (loading) return <p className="text-center text-gray-600">Loading rooms...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Hotel Room Grid</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button onClick={randomizeOccupancy} className="px-4 py-2 bg-blue-500 text-white rounded-lg">🎲 Randomize Occupancy</button>
        <button onClick={resetOccupancy} className="px-4 py-2 bg-red-500 text-white rounded-lg">♻️ Reset Occupancy</button>
        <button onClick={fetchRooms} className="px-4 py-2 bg-gray-500 text-white rounded-lg">🔄 Refresh</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`p-6 rounded-lg shadow-md text-center font-medium text-white ${
              room.available ? "bg-green-500" : "bg-red-500"
            }`}
          >
            Room #{room.number} (Floor {room.floor})<br />
            {room.available ? "Available ✅" : "Booked ❌"}
          </div>
        ))}
      </div>
    </div>
  );
});

export default RoomGrid;
