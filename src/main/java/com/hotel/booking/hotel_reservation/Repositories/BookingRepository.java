package com.hotel.booking.hotel_reservation.Repositories;

import com.hotel.booking.hotel_reservation.Entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface BookingRepository extends JpaRepository<Booking,Long> {

}
