# Online Movie Ticket Booking System

A full-stack web application for booking movie tickets with real-time seat management and automatic billing calculation.

## Features

### Backend (Spring Boot)
- ✅ RESTful API architecture
- ✅ MySQL database integration with JPA/Hibernate
- ✅ Complete CRUD operations for movies and bookings
- ✅ Real-time seat availability management
- ✅ Automatic price calculation
- ✅ Exception handling with custom error messages
- ✅ CORS enabled for frontend integration

### Frontend (HTML, CSS, JavaScript)
- ✅ Responsive design with modern UI/UX
- ✅ Three main pages: Home, Movies, Bookings
- ✅ Real-time movie search by genre
- ✅ Interactive booking modal
- ✅ Dynamic seat availability updates
- ✅ Fetch API with async/await for all operations

## Project Structure

```
Online_ticket_booking_system/
├── backend/
│   └── bookmyshow/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/example/bookmyshow/
│       │   │   │   ├── controller/
│       │   │   │   │   ├── MovieController.java
│       │   │   │   │   └── BookingController.java
│       │   │   │   ├── entity/
│       │   │   │   │   ├── Movie.java
│       │   │   │   │   └── Booking.java
│       │   │   │   ├── repository/
│       │   │   │   │   ├── MovieRepository.java
│       │   │   │   │   └── BookingRepository.java
│       │   │   │   ├── service/
│       │   │   │   │   ├── MovieService.java
│       │   │   │   │   └── BookingService.java
│       │   │   │   ├── dto/
│       │   │   │   │   └── BookingRequest.java
│       │   │   │   ├── exception/
│       │   │   │   │   ├── GlobalExceptionHandler.java
│       │   │   │   │   ├── ResourceNotFoundException.java
│       │   │   │   │   └── InsufficientSeatsException.java
│       │   │   │   └── BookmyshowApplication.java
│       │   │   └── resources/
│       │   │       └── application.properties
│       │   └── test/
│       └── pom.xml
└── frontend/
    ├── index.html
    ├── movies.html
    ├── bookings.html
    ├── css/
    │   └── style.css
    └── js/
        ├── api.js
        ├── home.js
        ├── movies.js
        └── bookings.js
```

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Modern web browser (Chrome, Firefox, Edge)

## Setup Instructions

### 1. Database Setup

1. Install MySQL and start the MySQL server
2. Create a database (it will be auto-created by Spring Boot):
   ```sql
   CREATE DATABASE bookmyshow_db;
   ```

3. Update database credentials in `backend/bookmyshow/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend/bookmyshow
   ```

2. Build the project:
   ```bash
   mvnw clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvnw spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Open `index.html` in a web browser, or use a simple HTTP server:
   
   **Option 1: Using Python**
   ```bash
   python -m http.server 3000
   ```
   Then open `http://localhost:3000`

   **Option 2: Using Node.js (http-server)**
   ```bash
   npx http-server -p 3000
   ```
   Then open `http://localhost:3000`

   **Option 3: Using Live Server (VS Code Extension)**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/{id}` - Get movie by ID
- `POST /api/movies` - Add new movie
- `PUT /api/movies/{id}` - Update movie
- `DELETE /api/movies/{id}` - Delete movie
- `GET /api/movies/search?genre={genre}` - Search movies by genre

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/{id}` - Cancel booking
- `GET /api/bookings/movie/{movieId}` - Get bookings by movie ID

## Usage Guide

### Adding a Movie
1. Navigate to the **Movies** page
2. Click **"+ Add New Movie"**
3. Fill in the movie details:
   - Movie Name
   - Genre (e.g., Action, Comedy, Drama)
   - Show Time (date and time)
   - Ticket Price
   - Available Seats
4. Click **"Save Movie"**

### Booking Tickets
1. Go to the **Movies** page
2. Find the movie you want to book
3. Click **"Book Tickets"**
4. Enter your name and number of seats
5. The total price will be calculated automatically
6. Click **"Confirm Booking"**

### Managing Bookings
1. Navigate to the **My Bookings** page
2. View all your bookings with details
3. Click **"Cancel Booking"** to cancel a booking (seats will be released)

### Searching Movies
1. On the **Home** page, enter a genre in the search box
2. Click **"Search"** or press Enter
3. View all movies matching that genre

## Technologies Used

### Backend
- Spring Boot 4.0.3
- Spring Data JPA
- MySQL Connector
- Maven

### Frontend
- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- Fetch API with async/await

## Key Features Implementation

### Seat Management
- Automatically reduces available seats when booking is created
- Automatically increases seats when booking is cancelled
- Prevents overbooking with validation

### Price Calculation
- Total price = Ticket Price × Number of Seats
- Calculated automatically in real-time

### Error Handling
- Backend: Custom exceptions with meaningful error messages
- Frontend: User-friendly alert messages for all operations

### Responsive Design
- Mobile-friendly interface
- Adapts to different screen sizes
- Modern gradient UI with smooth animations

## Future Enhancements

- User authentication and authorization
- Payment gateway integration
- Email notifications for bookings
- Admin dashboard
- Movie poster images
- Seat selection interface
- Multiple show times per movie
- Reviews and ratings

## Troubleshooting

### Backend not starting
- Check if MySQL is running
- Verify database credentials in `application.properties`
- Ensure no other application is using port 8080

### Frontend API errors
- Verify backend is running on `http://localhost:8080`
- Check browser console for CORS errors
- Ensure API endpoints are accessible

### Database connection issues
- Verify MySQL service is running
- Check username and password in `application.properties`
- Ensure database exists or auto-creation is enabled

## License

This project is created for educational purposes.

## Author

Created as part of the Online Movie Ticket Booking System project.
