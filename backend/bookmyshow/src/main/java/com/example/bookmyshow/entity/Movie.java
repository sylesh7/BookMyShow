package com.example.bookmyshow.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "movies")
public class Movie {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long movieId;
    
    @Column(nullable = false)
    private String movieName;
    
    @Column(nullable = false)
    private String genre;
    
    @Column(nullable = false)
    private LocalDateTime showTime;
    
    @Column(nullable = false)
    private Double ticketPrice;
    
    @Column(nullable = false)
    private Integer availableSeats;
    
    // Constructors
    public Movie() {}
    
    public Movie(String movieName, String genre, LocalDateTime showTime, Double ticketPrice, Integer availableSeats) {
        this.movieName = movieName;
        this.genre = genre;
        this.showTime = showTime;
        this.ticketPrice = ticketPrice;
        this.availableSeats = availableSeats;
    }
    
    // Getters and Setters
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
    
    public String getGenre() {
        return genre;
    }
    
    public void setGenre(String genre) {
        this.genre = genre;
    }
    
    public LocalDateTime getShowTime() {
        return showTime;
    }
    
    public void setShowTime(LocalDateTime showTime) {
        this.showTime = showTime;
    }
    
    public Double getTicketPrice() {
        return ticketPrice;
    }
    
    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
    
    public Integer getAvailableSeats() {
        return availableSeats;
    }
    
    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }
}
