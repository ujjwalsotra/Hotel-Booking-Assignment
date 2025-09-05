package com.hotel.booking.hotel_reservation.DTO;

import lombok.Data;
import java.util.List;

@Data
public class BookingRequest {
    private Long guestId;
    private List<Long> roomIds;
    private int totalTravelTime;
}