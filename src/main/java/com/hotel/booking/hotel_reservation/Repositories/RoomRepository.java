package com.hotel.booking.hotel_reservation.Repositories;

import com.hotel.booking.hotel_reservation.Entities.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface RoomRepository  extends JpaRepository<Room,Long> {
    List<Room> findByAvailableTrue();  // all available rooms
    List<Room> findByFloorAndAvailableTrue(int floor); // available rooms on given floor
    Room findByNumber(int number); // find by room number
}
