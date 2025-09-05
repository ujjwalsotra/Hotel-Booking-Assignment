package com.hotel.booking.hotel_reservation.Service;

import com.hotel.booking.hotel_reservation.DTO.BookingRequest;
import com.hotel.booking.hotel_reservation.Entities.Booking;
import com.hotel.booking.hotel_reservation.Entities.Guest;
import com.hotel.booking.hotel_reservation.Entities.Room;
import com.hotel.booking.hotel_reservation.Repositories.BookingRepository;
import com.hotel.booking.hotel_reservation.Repositories.GuestRepository;
import com.hotel.booking.hotel_reservation.Repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final GuestRepository guestRepository;
    private final RoomRepository roomRepository;

    public BookingService(BookingRepository bookingRepository,
                          GuestRepository guestRepository,
                          RoomRepository roomRepository) {
        this.bookingRepository = bookingRepository;
        this.guestRepository = guestRepository;
        this.roomRepository = roomRepository;
    }

    // ✅ Create Booking with rules
    public Booking createBooking(Long guestId, List<Long> roomIds) {
        // Rule 1: A guest can book up to 5 rooms
        if (roomIds.size() > 5) {
            throw new RuntimeException("A single guest cannot book more than 5 rooms at a time.");
        }

        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new RuntimeException("Guest not found"));

        List<Room> rooms = roomRepository.findAllById(roomIds);

        if (rooms.size() != roomIds.size()) {
            throw new RuntimeException("One or more rooms not found");
        }

        for (Room room : rooms) {
            if (!room.isAvailable()) {
                throw new RuntimeException("Room " + room.getNumber() + " is already booked");
            }
        }

        // ✅ Calculate travel time based on proximity rules
        int travelTime = calculateTravelTime(rooms);

        // Mark rooms unavailable
        rooms.forEach(r -> r.setAvailable(false));
        roomRepository.saveAll(rooms);

        Booking booking = new Booking();
        booking.setGuest(guest);
        booking.setRooms(rooms);
        booking.setTotalTravelTime(travelTime);

        return bookingRepository.save(booking);
    }

    // ✅ Calculate Travel Time
    private int calculateTravelTime(List<Room> rooms) {
        if (rooms == null || rooms.isEmpty()) {
            return 0;
        }

        // Sort rooms by floor + number
        rooms.sort(Comparator.comparing(Room::getFloor).thenComparing(Room::getNumber));

        Room first = rooms.get(0);
        Room last = rooms.get(rooms.size() - 1);

        int floorDiff = Math.abs(first.getFloor() - last.getFloor());
        int horizontalDiff = Math.abs(first.getNumber() - last.getNumber());

        return (floorDiff * 2) + (horizontalDiff * 1);
    }

    // ✅ Get All Bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // ✅ Delete Booking (and free up rooms)
    public void deleteBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Free up rooms
        booking.getRooms().forEach(r -> r.setAvailable(true));
        roomRepository.saveAll(booking.getRooms());

        bookingRepository.delete(booking);
    }
}
