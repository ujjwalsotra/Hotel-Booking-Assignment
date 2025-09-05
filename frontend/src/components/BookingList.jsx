import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const BookingList = forwardRef((props, ref) => {
  const [bookings, setBookings] = useState([]);
  const authHeader = {
    Authorization: "Basic " + btoa("admin:admin123"),
  };

  const fetchBookings = () => {
    fetch("http://localhost:8080/bookings", { headers: authHeader })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch(() => setBookings([]));
  };

  useImperativeHandle(ref, () => ({
    refresh: fetchBookings
  }));

  useEffect(() => fetchBookings(), []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">📑 All Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings found</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <p>
                <strong>Booking ID:</strong> {b.id}
              </p>
              <p>
                <strong>Guest:</strong>{" "}
                {b.guest ? `${b.guest.name} (ID: ${b.guest.id})` : "N/A"}
              </p>
              <p>
                <strong>Rooms:</strong>{" "}
                {b.rooms && b.rooms.length > 0
                  ? b.rooms.map((r) => `#${r.number} (Floor ${r.floor})`).join(", ")
                  : "No rooms"}
              </p>
              <p>
                <strong>Total Travel Time:</strong> {b.totalTravelTime} min
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
})

export default BookingList;