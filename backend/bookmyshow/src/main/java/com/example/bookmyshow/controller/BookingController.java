package com.example.bookmyshow.controller;

import com.example.bookmyshow.dto.BookingRequest;
import com.example.bookmyshow.entity.Booking;
import com.example.bookmyshow.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }
    
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(
                request.getCustomerName(),
                request.getMovieId(),
                request.getNumberOfSeats()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Booking>> getBookingsByMovieId(@PathVariable Long movieId) {
        return ResponseEntity.ok(bookingService.getBookingsByMovieId(movieId));
    }
}
