package com.hotel.booking.hotel_reservation.Service;

import com.hotel.booking.hotel_reservation.Entities.Room;
import com.hotel.booking.hotel_reservation.Repositories.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final Random random = new Random();

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // ✅ Get all rooms
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // ✅ Randomly mark rooms as available/unavailable
    public List<Room> generateRandomOccupancy() {
        List<Room> rooms = roomRepository.findAll();

        for (Room room : rooms) {
            boolean isAvailable = random.nextBoolean(); // 50% chance
            room.setAvailable(isAvailable);
        }

        return roomRepository.saveAll(rooms);
    }

    // ✅ Reset all rooms to available
    public List<Room> resetAllRooms() {
        List<Room> rooms = roomRepository.findAll();

        for (Room room : rooms) {
            room.setAvailable(true);
        }

        return roomRepository.saveAll(rooms);
    }
}
