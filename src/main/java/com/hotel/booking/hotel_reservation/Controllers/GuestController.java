package com.hotel.booking.hotel_reservation.Controllers;

import com.hotel.booking.hotel_reservation.Entities.Guest;
import com.hotel.booking.hotel_reservation.Service.GuestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guests")
public class GuestController {
    private final GuestService guestService;

    public GuestController(GuestService guestService){
        this.guestService=guestService;
    }

    @GetMapping
    public List<Guest>getAllGuests(){
        return guestService.getAllGuest();
    }

    @GetMapping("/{id}")
    public Guest getGuestById(@PathVariable Long id){
        return guestService.getGuestById(id);
    }

    @PostMapping
    public Guest createGuest(@RequestBody Guest guest){
        return guestService.saveGuest(guest);
    }

    @DeleteMapping("/{id}")
    public void deleteGuest(@PathVariable Long id){
        guestService.deleteGuest(id);
    }
}
