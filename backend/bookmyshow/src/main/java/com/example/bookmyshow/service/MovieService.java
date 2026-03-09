package com.example.bookmyshow.service;

import com.example.bookmyshow.entity.Movie;
import com.example.bookmyshow.exception.ResourceNotFoundException;
import com.example.bookmyshow.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MovieService {
    
    @Autowired
    private MovieRepository movieRepository;
    
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
    
    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
    }
    
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }
    
    public Movie updateMovie(Long id, Movie movieDetails) {
        Movie movie = getMovieById(id);
        movie.setMovieName(movieDetails.getMovieName());
        movie.setGenre(movieDetails.getGenre());
        movie.setShowTime(movieDetails.getShowTime());
        movie.setTicketPrice(movieDetails.getTicketPrice());
        movie.setAvailableSeats(movieDetails.getAvailableSeats());
        return movieRepository.save(movie);
    }
    
    public void deleteMovie(Long id) {
        Movie movie = getMovieById(id);
        movieRepository.delete(movie);
    }
    
    public List<Movie> searchMoviesByGenre(String genre) {
        return movieRepository.findByGenreContainingIgnoreCase(genre);
    }
    
    @Transactional
    public void reduceSeats(Long movieId, int seats) {
        Movie movie = getMovieById(movieId);
        movie.setAvailableSeats(movie.getAvailableSeats() - seats);
        movieRepository.save(movie);
    }
    
    @Transactional
    public void increaseSeats(Long movieId, int seats) {
        Movie movie = getMovieById(movieId);
        movie.setAvailableSeats(movie.getAvailableSeats() + seats);
        movieRepository.save(movie);
    }
}
