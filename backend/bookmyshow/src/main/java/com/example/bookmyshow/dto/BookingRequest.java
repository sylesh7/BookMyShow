package com.example.bookmyshow.dto;

public class BookingRequest {
    private String customerName;
    private Long movieId;
    private Integer numberOfSeats;
    
    // Constructors
    public BookingRequest() {}
    
    public BookingRequest(String customerName, Long movieId, Integer numberOfSeats) {
        this.customerName = customerName;
        this.movieId = movieId;
        this.numberOfSeats = numberOfSeats;
    }
    
    // Getters and Setters
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
    
    public Integer getNumberOfSeats() {
        return numberOfSeats;
    }
    
    public void setNumberOfSeats(Integer numberOfSeats) {
        this.numberOfSeats = numberOfSeats;
    }
}
