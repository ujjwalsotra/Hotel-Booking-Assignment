package com.hotel.booking.hotel_reservation;

import com.hotel.booking.hotel_reservation.Entities.Room;
import com.hotel.booking.hotel_reservation.Repositories.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final RoomRepository roomRepository;

    public DataInitializer(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    @Override
    public void run(String... args){
        if(roomRepository.count() == 0){
            for(int floor= 1;floor<=9;floor++){
                for(int room = 1; room<=10;room++)
                {
                    Room r = new Room();
                    r.setNumber(floor*100+room);
                    r.setFloor(floor);
                    r.setAvailable(true);
                    roomRepository.save(r);
                }
            }
            for (int room = 1; room <= 7; room++) {
                Room r = new Room();
                r.setNumber(1000 + room); // e.g. 1001–1007
                r.setFloor(10);
                r.setAvailable(true);
                roomRepository.save(r);
            }
            System.out.println("Hotel initialized with 97 rooms");
        } else {
            System.out.println("Rooms already exist, skipping initialization");
        }
    }
}
