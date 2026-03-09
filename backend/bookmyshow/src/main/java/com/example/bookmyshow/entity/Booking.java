package com.example.bookmyshow.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    
    @Column(nullable = false)
    private String customerName;
    
    @Column(nullable = false)
    private Long movieId;
    
    @Column(nullable = false)
    private String movieName;
    
    @Column(nullable = false)
    private Integer numberOfSeats;
    
    @Column(nullable = false)
    private Double totalPrice;
    
    @Column(nullable = false)
    private LocalDateTime bookingDate;
    
    // Constructors
    public Booking() {}
    
    public Booking(String customerName, Long movieId, String movieName, Integer numberOfSeats, Double totalPrice) {
        this.customerName = customerName;
        this.movieId = movieId;
        this.movieName = movieName;
        this.numberOfSeats = numberOfSeats;
        this.totalPrice = totalPrice;
        this.bookingDate = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getBookingId() {
        return bookingId;
    }
    
    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }
    
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public Long getMovieId() {
        return movieId;
    }
    
    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }
    
    public String getMovieName() {
        return movieName;
    }
    
    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }
    
    public Integer getNumberOfSeats() {
        return numberOfSeats;
    }
    
    public void setNumberOfSeats(Integer numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }
    
    public Double getTotalPrice() {
        return totalPrice;
    }
    
    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
    
    public LocalDateTime getBookingDate() {
        return bookingDate;
    }
    
    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }
}
