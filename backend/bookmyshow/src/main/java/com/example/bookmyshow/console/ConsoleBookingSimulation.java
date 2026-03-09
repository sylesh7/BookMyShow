package com.example.bookmyshow.console;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Console-based Movie Ticket Booking System Simulation
 * Uses Core Java Collections (ArrayList, HashMap)
 */
public class ConsoleBookingSimulation {
    
    // Collections to store data
    private static List<Movie> movies = new ArrayList<>();
    private static List<Booking> bookings = new ArrayList<>();
    private static long movieIdCounter = 1;
    private static long bookingIdCounter = 1;
    private static Scanner scanner = new Scanner(System.in);
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
    
    public static void main(String[] args) {
        System.out.println("===========================================");
        System.out.println("   MOVIE TICKET BOOKING SYSTEM - CONSOLE  ");
        System.out.println("===========================================\n");
        
        // Pre-populate with sample data
        initializeSampleData();
        
        while (true) {
            displayMenu();
            int choice = getIntInput("Enter your choice: ");
            
            switch (choice) {
                case 1:
                    addMovie();
                    break;
                case 2:
                    viewAllMovies();
                    break;
                case 3:
                    updateMovie();
                    break;
                case 4:
                    deleteMovie();
                    break;
                case 5:
                    searchMoviesByGenre();
                    break;
                case 6:
                    bookTicket();
                    break;
                case 7:
                    viewAllBookings();
                    break;
                case 8:
                    cancelBooking();
                    break;
                case 9:
                    System.out.println("\nThank you for using Movie Ticket Booking System!");
                    scanner.close();
                    System.exit(0);
                default:
                    System.out.println("Invalid choice! Please try again.\n");
            }
        }
    }
    
    private static void displayMenu() {
        System.out.println("\n========== MAIN MENU ==========");
        System.out.println("1. Add New Movie");
        System.out.println("2. View All Movies");
        System.out.println("3. Update Movie");
        System.out.println("4. Delete Movie");
        System.out.println("5. Search Movies by Genre");
        System.out.println("6. Book Ticket");
        System.out.println("7. View All Bookings");
        System.out.println("8. Cancel Booking");
        System.out.println("9. Exit");
        System.out.println("================================");
    }
    
    private static void initializeSampleData() {
        movies.add(new Movie(movieIdCounter++, "Avengers: Endgame", "Action", 
                LocalDateTime.now().plusDays(1), 250.0, 100));
        movies.add(new Movie(movieIdCounter++, "The Hangover", "Comedy", 
                LocalDateTime.now().plusDays(2), 200.0, 80));
        movies.add(new Movie(movieIdCounter++, "Inception", "Thriller", 
                LocalDateTime.now().plusDays(3), 300.0, 120));
        System.out.println("Sample movies loaded successfully!\n");
    }
    
    private static void addMovie() {
        System.out.println("\n========== ADD NEW MOVIE ==========");
        System.out.print("Enter Movie Name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter Genre: ");
        String genre = scanner.nextLine();
        
        System.out.print("Enter Show Time (dd-MM-yyyy HH:mm): ");
        String showTimeStr = scanner.nextLine();
        LocalDateTime showTime = LocalDateTime.parse(showTimeStr, formatter);
        
        double price = getDoubleInput("Enter Ticket Price: ");
        int seats = getIntInput("Enter Available Seats: ");
        
        Movie movie = new Movie(movieIdCounter++, name, genre, showTime, price, seats);
        movies.add(movie);
        
        System.out.println("\n✓ Movie added successfully!");
        System.out.println("Movie ID: " + movie.getMovieId());
    }
    
    private static void viewAllMovies() {
        System.out.println("\n========== ALL MOVIES ==========");
        
        if (movies.isEmpty()) {
            System.out.println("No movies available.");
            return;
        }
        
        for (Movie movie : movies) {
            displayMovie(movie);
            System.out.println("-----------------------------------");
        }
    }
    
    private static void displayMovie(Movie movie) {
        System.out.println("Movie ID: " + movie.getMovieId());
        System.out.println("Name: " + movie.getMovieName());
        System.out.println("Genre: " + movie.getGenre());
        System.out.println("Show Time: " + movie.getShowTime().format(formatter));
        System.out.println("Ticket Price: ₹" + movie.getTicketPrice());
        System.out.println("Available Seats: " + movie.getAvailableSeats());
    }
    
    private static void updateMovie() {
        System.out.println("\n========== UPDATE MOVIE ==========");
        viewAllMovies();
        
        long movieId = getLongInput("Enter Movie ID to update: ");
        Movie movie = findMovieById(movieId);
        
        if (movie == null) {
            System.out.println("Movie not found!");
            return;
        }
        
        System.out.println("\nCurrent Details:");
        displayMovie(movie);
        
        System.out.print("\nEnter new Movie Name (or press Enter to keep current): ");
        String name = scanner.nextLine();
        if (!name.isEmpty()) movie.setMovieName(name);
        
        System.out.print("Enter new Genre (or press Enter to keep current): ");
        String genre = scanner.nextLine();
        if (!genre.isEmpty()) movie.setGenre(genre);
        
        System.out.print("Enter new Show Time (dd-MM-yyyy HH:mm) (or press Enter to keep current): ");
        String showTimeStr = scanner.nextLine();
        if (!showTimeStr.isEmpty()) {
            movie.setShowTime(LocalDateTime.parse(showTimeStr, formatter));
        }
        
        System.out.print("Enter new Ticket Price (or -1 to keep current): ");
        double price = getDoubleInput("");
        if (price != -1) movie.setTicketPrice(price);
        
        System.out.print("Enter new Available Seats (or -1 to keep current): ");
        int seats = getIntInput("");
        if (seats != -1) movie.setAvailableSeats(seats);
        
        System.out.println("\n✓ Movie updated successfully!");
    }
    
    private static void deleteMovie() {
        System.out.println("\n========== DELETE MOVIE ==========");
        viewAllMovies();
        
        long movieId = getLongInput("Enter Movie ID to delete: ");
        Movie movie = findMovieById(movieId);
        
        if (movie == null) {
            System.out.println("Movie not found!");
            return;
        }
        
        System.out.print("Are you sure you want to delete '" + movie.getMovieName() + "'? (yes/no): ");
        String confirm = scanner.nextLine();
        
        if (confirm.equalsIgnoreCase("yes")) {
            movies.remove(movie);
            System.out.println("\n✓ Movie deleted successfully!");
        } else {
            System.out.println("Deletion cancelled.");
        }
    }
    
    private static void searchMoviesByGenre() {
        System.out.println("\n========== SEARCH BY GENRE ==========");
        System.out.print("Enter Genre: ");
        String genre = scanner.nextLine();
        
        List<Movie> results = movies.stream()
                .filter(m -> m.getGenre().equalsIgnoreCase(genre))
                .collect(Collectors.toList());
        
        if (results.isEmpty()) {
            System.out.println("No movies found for genre: " + genre);
            return;
        }
        
        System.out.println("\nFound " + results.size() + " movie(s):");
        for (Movie movie : results) {
            displayMovie(movie);
            System.out.println("-----------------------------------");
        }
    }
    
    private static void bookTicket() {
        System.out.println("\n========== BOOK TICKET ==========");
        viewAllMovies();
        
        long movieId = getLongInput("Enter Movie ID to book: ");
        Movie movie = findMovieById(movieId);
        
        if (movie == null) {
            System.out.println("Movie not found!");
            return;
        }
        
        System.out.print("Enter Customer Name: ");
        String customerName = scanner.nextLine();
        
        int numberOfSeats = getIntInput("Enter Number of Seats: ");
        
        if (movie.getAvailableSeats() < numberOfSeats) {
            System.out.println("\n✗ Insufficient seats available!");
            System.out.println("Available seats: " + movie.getAvailableSeats());
            System.out.println("Requested seats: " + numberOfSeats);
            return;
        }
        
        double totalPrice = movie.getTicketPrice() * numberOfSeats;
        
        Booking booking = new Booking(bookingIdCounter++, customerName, movieId, 
                movie.getMovieName(), numberOfSeats, totalPrice, LocalDateTime.now());
        bookings.add(booking);
        
        // Reduce available seats
        movie.setAvailableSeats(movie.getAvailableSeats() - numberOfSeats);
        
        System.out.println("\n✓ Booking successful!");
        System.out.println("Booking ID: " + booking.getBookingId());
        System.out.println("Total Price: ₹" + totalPrice);
        System.out.println("Remaining Seats: " + movie.getAvailableSeats());
    }
    
    private static void viewAllBookings() {
        System.out.println("\n========== ALL BOOKINGS ==========");
        
        if (bookings.isEmpty()) {
            System.out.println("No bookings found.");
            return;
        }
        
        for (Booking booking : bookings) {
            displayBooking(booking);
            System.out.println("-----------------------------------");
        }
    }
    
    private static void displayBooking(Booking booking) {
        System.out.println("Booking ID: " + booking.getBookingId());
        System.out.println("Customer Name: " + booking.getCustomerName());
        System.out.println("Movie: " + booking.getMovieName());
        System.out.println("Number of Seats: " + booking.getNumberOfSeats());
        System.out.println("Total Price: ₹" + booking.getTotalPrice());
        System.out.println("Booking Date: " + booking.getBookingDate().format(formatter));
    }
    
    private static void cancelBooking() {
        System.out.println("\n========== CANCEL BOOKING ==========");
        viewAllBookings();
        
        long bookingId = getLongInput("Enter Booking ID to cancel: ");
        Booking booking = findBookingById(bookingId);
        
        if (booking == null) {
            System.out.println("Booking not found!");
            return;
        }
        
        System.out.print("Are you sure you want to cancel this booking? (yes/no): ");
        String confirm = scanner.nextLine();
        
        if (confirm.equalsIgnoreCase("yes")) {
            // Release seats back to movie
            Movie movie = findMovieById(booking.getMovieId());
            if (movie != null) {
                movie.setAvailableSeats(movie.getAvailableSeats() + booking.getNumberOfSeats());
            }
            
            bookings.remove(booking);
            System.out.println("\n✓ Booking cancelled successfully!");
            System.out.println("Seats released: " + booking.getNumberOfSeats());
        } else {
            System.out.println("Cancellation aborted.");
        }
    }
    
    private static Movie findMovieById(long id) {
        return movies.stream()
                .filter(m -> m.getMovieId() == id)
                .findFirst()
                .orElse(null);
    }
    
    private static Booking findBookingById(long id) {
        return bookings.stream()
                .filter(b -> b.getBookingId() == id)
                .findFirst()
                .orElse(null);
    }
    
    private static int getIntInput(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextInt()) {
            System.out.print("Invalid input. " + prompt);
            scanner.next();
        }
        int value = scanner.nextInt();
        scanner.nextLine(); // consume newline
        return value;
    }
    
    private static long getLongInput(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextLong()) {
            System.out.print("Invalid input. " + prompt);
            scanner.next();
        }
        long value = scanner.nextLong();
        scanner.nextLine(); // consume newline
        return value;
    }
    
    private static double getDoubleInput(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextDouble()) {
            System.out.print("Invalid input. " + prompt);
            scanner.next();
        }
        double value = scanner.nextDouble();
        scanner.nextLine(); // consume newline
        return value;
    }
    
    // Inner classes for Movie and Booking
    static class Movie {
        private long movieId;
        private String movieName;
        private String genre;
        private LocalDateTime showTime;
        private double ticketPrice;
        private int availableSeats;
        
        public Movie(long movieId, String movieName, String genre, LocalDateTime showTime, 
                     double ticketPrice, int availableSeats) {
            this.movieId = movieId;
            this.movieName = movieName;
            this.genre = genre;
            this.showTime = showTime;
            this.ticketPrice = ticketPrice;
            this.availableSeats = availableSeats;
        }
        
        // Getters and Setters
        public long getMovieId() { return movieId; }
        public String getMovieName() { return movieName; }
        public void setMovieName(String movieName) { this.movieName = movieName; }
        public String getGenre() { return genre; }
        public void setGenre(String genre) { this.genre = genre; }
        public LocalDateTime getShowTime() { return showTime; }
        public void setShowTime(LocalDateTime showTime) { this.showTime = showTime; }
        public double getTicketPrice() { return ticketPrice; }
        public void setTicketPrice(double ticketPrice) { this.ticketPrice = ticketPrice; }
        public int getAvailableSeats() { return availableSeats; }
        public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
    }
    
    static class Booking {
        private long bookingId;
        private String customerName;
        private long movieId;
        private String movieName;
        private int numberOfSeats;
        private double totalPrice;
        private LocalDateTime bookingDate;
        
        public Booking(long bookingId, String customerName, long movieId, String movieName, 
                      int numberOfSeats, double totalPrice, LocalDateTime bookingDate) {
            this.bookingId = bookingId;
            this.customerName = customerName;
            this.movieId = movieId;
            this.movieName = movieName;
            this.numberOfSeats = numberOfSeats;
            this.totalPrice = totalPrice;
            this.bookingDate = bookingDate;
        }
        
        // Getters
        public long getBookingId() { return bookingId; }
        public String getCustomerName() { return customerName; }
        public long getMovieId() { return movieId; }
        public String getMovieName() { return movieName; }
        public int getNumberOfSeats() { return numberOfSeats; }
        public double getTotalPrice() { return totalPrice; }
        public LocalDateTime getBookingDate() { return bookingDate; }
    }
}
