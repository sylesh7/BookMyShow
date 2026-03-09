# BookMyShow - Modern Movie Ticket Booking System

A full-stack, cinematic-themed web application for booking movie tickets with a stunning dark UI/UX, interactive seat selection, and real-time availability management.

## Key Features

### Modern Dark Theme Design
- **Cinematic Dark Mode**: Professional dark theme inspired by premium cinema apps
- **Smooth Animations**: Micro-interactions and fluid transitions throughout
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Gradient Accents**: Eye-catching red/pink gradients for CTAs and highlights

### Enhanced Home Page (Discovery)
- **Search Bar**: Quick movie lookup by title or genre
- **Category Tabs**: Toggle between "Now Showing" and "Coming Soon"
- **Genre Pills**: Quick filters for Action, Comedy, Drama, Thriller, etc.
- **Movie Cards**: Modern poster-style cards with play overlay effect
- **Location Picker**: Dropdown for city/location selection
- **Live Stats**: Real-time display of available movies and bookings

### Movie Detail Page
- **Visual Hero Section**: Large movie header with backdrop styling
- **Synopsis & Ratings**: Detailed movie information and user ratings
- **Interactive Showtimes**: Date selector with theatre-specific time slots
- **Real-time Availability**: Live seat count and ticket pricing
- **Smooth Navigation**: Scroll-to-section for better UX

### Interactive Seat Selection
- **Theatrical View**: Curved "Screen" indicator at the top
- **Interactive Seat Map**: 8 rows × 12 seats with click-to-select
- **Color Coding**: 
  - Grey = Available
  - Pink/Red = Your Selection
  - Dark Grey = Occupied
- **Price Tiers**: Normal vs Premium seat categories
- **Live Summary**: Bottom bar showing selected seats and total price
- **Validation**: Prevents overbooking and insufficient seat scenarios

### Booking Summary & Payment
- **Order Details**: Complete booking summary with movie poster
- **Customer Information**: Name, email, and phone collection
- **Payment Methods**: Card, UPI, and Wallet options
- **Price Breakdown**: Ticket price + convenience fee calculation
- **Secure Indicators**: Trust signals for payment security

### E-Ticket with QR Code
- **QR Code Generation**: Scannable QR code for theatre entry
- **Booking Details**: Complete ticket information
- **Download Option**: Save ticket as PDF (coming soon)
- **Add to Wallet**: One-tap integration with Apple/Google Wallet
- **Share Feature**: Share booking via native sharing

### Admin Panel
- Full CRUD operations for movies
- Add, edit, delete movie listings
- Real-time seat management

### Backend Features
- RESTful Spring Boot APIs
- MySQL database with JPA/Hibernate
- Automatic seat availability updates
- Custom exception handling
- CORS enabled for frontend integration

## Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern dark theme with gradients, flexbox, grid
- **JavaScript (ES6+)** - Async/await, Fetch API
- **Font Awesome** - Icon library
- **QRCode.js** - QR code generation

### Backend
- **Spring Boot 4.0.3** - REST API framework
- **Spring Data JPA** - Database ORM
- **MySQL 8.0+** - Relational database
- **Maven** - Build tool

## Project Structure

```
Online_ticket_booking_system/
├── frontend/
│   ├── index.html              # Home page with movie discovery
│   ├── movie-detail.html       # Movie details & showtimes
│   ├── seat-selection.html     # Interactive seat booking
│   ├── payment.html            # Booking summary & payment
│   ├── ticket.html             # E-ticket with QR code
│   ├── bookings.html           # View all bookings
│   ├── movies.html             # Admin panel
│   ├── css/
│   │   └── style.css          # Modern dark theme styles
│   └── js/
│       ├── api.js             # API calls & utility functions
│       ├── home.js            # Home page logic
│       ├── movie-detail.js    # Movie detail logic
│       ├── seat-selection.js  # Seat selection logic
│       ├── payment.js         # Payment processing
│       ├── ticket.js          # E-ticket generation
│       ├── bookings.js        # Bookings management
│       └── movies.js          # Admin operations
└── backend/bookmyshow/
    └── [Spring Boot application structure]
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
   spring.datasource.url=jdbc:mysql://localhost:3306/bookmyshow_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend/bookmyshow
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

4. The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. ight-click `index.html` and select "Open with Live Server"

3. Open `http://localhost:3000` in your browser

## User Journey

1. **Discover** - Browse movies on home page with search & filters
2. **Select** - Click movie to view details and showtimes
3. **Choose Seats** - Interactive seat selection with live availability
4. **Book** - Enter details and choose payment method
5. **Confirm** - Get e-ticket with QR code instantly

## Design Inspiration

The UI follows modern cinema app design principles:
- **Dribbble**: Premium movie booking UI trends
- **Behance**: Full UX case studies
- **Figma Community**: Modern booking app templates

### Color Palette
- Background: `#0f0f0f` (Deep Black)
- Cards: `#252525` (Dark Grey)
- Accent: `#ff3366` (Neon Pink/Red)
- Success: `#00ff88` (Neon Green)
- Text: `#ffffff` (White) / `#b3b3b3` (Grey)

##  Navigate to the backend directory:
   ```bash
   cd backend/bookmyshow
   **Option 1: Using Python**
   ```bash
   python -m http.server 3000
   ```

3. **Option 2: Using Node.js (http-server)**
   ```bash
   npx http-server -p 3000 -c-1
   ```
- Enter name, email, and phone
   - Choose payment method
   - Click "Confirm Booking"

5. **Get E-Ticket**
   - View QR code and booking details
   - Download or share ticket

### Admin Flow

1. **Add Movies**
   - Go to Movies (Admin) page
   - Enter movie details
   - Set ticket price and available seats
   - Click "Save Movie"

2. **Manage Movies**
   - View all movies in system
   - Edit or delete existing movies
   - Monitor seat availability

##
4. ption 3: VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

5. Open `http://localhost:3000` in your browser

##  Usage Guide

###stomer Flow

1. **Browse Movies**
   - Use search bar or genre filters
   - Click on any movie card

2. **View Details**
   - See movie synopsis, ratings, and showtimes
   Future Enhancemen
- Lazy loading for images (when implemented)
- Optimized seat map rendering

##  - Available Seats
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
- [ ] User authentication and authorization (JWT)
- [ ] Real payment gateway integration (Stripe/Razorpay)
- [ ] Email/SMS notifications for booking confirmations
- [ ] Movie poster image uploads
- [ ] Trailer video integration
- [ ] Dynamic seat pricing (peak/off-peak hours)
- [ ] Multi-city theatre listings
- [ ] User rendation engine based on user preferences

## Troubleshooting

### Backend eviews and ratings system
- [ ] Loyalty points and offers
- [ ] Social media login
- [ ] PWA capabilities for offline access
- [ ] RecommIssues
- **Port 8080 in use**: Change `server.port` in application.properties
- **Database connection failed**: Check MySQL service is running
- **Build errors**: Run `mvn clean install` again

### Frontend Issues
- **QR code not showing**: Ensure QRCode.js CDN is accessible
- **Styles not loading**: Clear browser cache (Ctrl+F5)
- **API errors**: Verify backend is running on port 8080
- *RS errors**: Check backend CORS configuration

### Common Problems
1. **Booking fails**: Check if sufficient seats are available
2. **Seat selection not working**: Disable browser extensions
3. **Payment redirects**: Ensure localStorage is enabled
4. **E-ticket blank**: Check console for JavaScript errors

##  Contributing
License

This project is created for educational purposes.

##t your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is created for educational purposes.

##  Developer Notes

### Code Structure
- **Modular JS**: Each page has its own JS file
- **Reusable Components**: API calls centralized in `api.js`
- **CSS Variables**: Easy theme customization
- **Semantic HTML**: Accessible markup

### Best Practices Followed
- Async/await for promises
- Error handling in all API calls
- User feedback for all actions
- Mobile-first responsive design
- Clean code with comments

##  Design Resources Used

- **Font Awesome 6.4.0** - Icons
- **QRCode.js** - QR code generation
- **Google Fonts** (implied) - Inter/Segoe UI
- **Color Hunt** - Color palette inspiration

##  Support

For issues or questions:
- Check the troubleshooting section
- Review the console for errors
- Ensure all dependencies are installed
- Verify database credentials

##  Demo Workflow

1. Start MySQL database
2. Run Spring Boot backend: `mvn spring-boot:run`
3. Start frontend server: `python -m http.server 3000`
4. Open `http://localhost:3000`
5. Browse movies → Select seats → Book tickets → Get e-ticket!
