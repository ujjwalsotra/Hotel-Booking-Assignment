package com.hotel.booking.hotel_reservation.Controllers;

import com.hotel.booking.hotel_reservation.Entities.Room;
import com.hotel.booking.hotel_reservation.Service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // ✅ Get all rooms
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    // ✅ Random Occupancy
    @PostMapping("/random-occupancy")
    public ResponseEntity<List<Room>> randomOccupancy() {
        return ResponseEntity.ok(roomService.generateRandomOccupancy());
    }

    // ✅ Reset Rooms
    @PostMapping("/reset")
    public ResponseEntity<List<Room>> resetRooms() {
        return ResponseEntity.ok(roomService.resetAllRooms());
    }
}
