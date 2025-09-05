package com.hotel.booking.hotel_reservation.Repositories;

import com.hotel.booking.hotel_reservation.Entities.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface GuestRepository extends JpaRepository<Guest,Long> {
    Guest findByEmail(String email);
}
