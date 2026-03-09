package com.example.bookmyshow.service;

import com.example.bookmyshow.entity.Booking;
import com.example.bookmyshow.entity.Movie;
import com.example.bookmyshow.exception.InsufficientSeatsException;
import com.example.bookmyshow.exception.ResourceNotFoundException;
import com.example.bookmyshow.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private MovieService movieService;
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }
    
    @Transactional
    public Booking createBooking(String customerName, Long movieId, Integer numberOfSeats) {
        Movie movie = movieService.getMovieById(movieId);
        
        if (movie.getAvailableSeats() < numberOfSeats) {
            throw new InsufficientSeatsException("Insufficient seats available. Only " + 
                    movie.getAvailableSeats() + " seats left.");
        }
        
        Double totalPrice = movie.getTicketPrice() * numberOfSeats;
        
        Booking booking = new Booking(customerName, movieId, movie.getMovieName(), numberOfSeats, totalPrice);
        booking.setBookingDate(LocalDateTime.now());
        
        movieService.reduceSeats(movieId, numberOfSeats);
        
        return bookingRepository.save(booking);
    }
    
    @Transactional
    public void cancelBooking(Long bookingId) {
        Booking booking = getBookingById(bookingId);
        movieService.increaseSeats(booking.getMovieId(), booking.getNumberOfSeats());
        bookingRepository.delete(booking);
    }
    
    public List<Booking> getBookingsByMovieId(Long movieId) {
        return bookingRepository.findByMovieId(movieId);
    }
}
