import GuestForm from "./components/GuestForm";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import RoomGrid from "./components/RoomGrid";
import { useRef } from "react";


export default function App() {

  const roomGridRef = useRef();
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🏨 Hotel Reservation System</h1>
      <GuestForm/>
      <BookingForm refreshRooms={() => roomGridRef.current?.refresh()}/>
      <RoomGrid ref={roomGridRef}/>
      <BookingList/>
    </div>
  );
}
