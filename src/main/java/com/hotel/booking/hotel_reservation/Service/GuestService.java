package com.hotel.booking.hotel_reservation.Service;

import com.hotel.booking.hotel_reservation.Entities.Guest;
import com.hotel.booking.hotel_reservation.Repositories.GuestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestService {
    private final GuestRepository guestRepository;

    public GuestService(GuestRepository guestRepository){
        this.guestRepository = guestRepository;
    }

    public List<Guest> getAllGuest(){
        return guestRepository.findAll();
    }

    public Guest getGuestById(Long id){
        return guestRepository.findById(id).orElse(null);
    }

    public Guest saveGuest(Guest guest){
        return guestRepository.save(guest);
    }

    public void deleteGuest(Long id){
        guestRepository.deleteById(id);
    }
}
