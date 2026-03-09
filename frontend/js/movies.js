// Movies Page JavaScript

let editingMovieId = null;

// Load all movies on page load
document.addEventListener('DOMContentLoaded', () => {
    loadMovies();
    
    // Setup form submit handler
    document.getElementById('movieForm').addEventListener('submit', handleMovieFormSubmit);
    
    // Setup booking form submit handler
    document.getElementById('bookingForm').addEventListener('submit', handleBookingFormSubmit);
});

// Load movies and display them
async function loadMovies() {
    const moviesList = document.getElementById('moviesList');
    moviesList.innerHTML = '<div class="loading">Loading movies...</div>';
    
    const movies = await getAllMovies();
    
    if (movies.length === 0) {
        moviesList.innerHTML = `
            <div class="no-data">
                <h3>No movies available</h3>
                <p>Add your first movie to get started!</p>
            </div>
        `;
        return;
    }
    
    moviesList.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <div class="movie-header">
                <h3>${movie.movieName}</h3>
                <span class="movie-genre">${movie.genre}</span>
            </div>
            <div class="movie-body">
                <div class="movie-info">
                    <p><strong>Show Time:</strong> <span>${formatDateTime(movie.showTime)}</span></p>
                    <p><strong>Ticket Price:</strong> <span>${formatCurrency(movie.ticketPrice)}</span></p>
                    <p><strong>Available Seats:</strong> <span>${movie.availableSeats}</span></p>
                </div>
                <div class="movie-actions">
                    <button class="btn btn-primary" onclick="openBookingModal(${movie.movieId})">Book Tickets</button>
                    <button class="btn btn-warning" onclick="editMovie(${movie.movieId})">Edit</button>
                    <button class="btn btn-danger" onclick="confirmDeleteMovie(${movie.movieId})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show add movie form
function showAddMovieForm() {
    editingMovieId = null;
    document.getElementById('formTitle').textContent = 'Add New Movie';
    document.getElementById('movieForm').reset();
    document.getElementById('movieId').value = '';
    document.getElementById('movieFormSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hide movie form
function hideMovieForm() {
    document.getElementById('movieFormSection').style.display = 'none';
    document.getElementById('movieForm').reset();
    editingMovieId = null;
}

// Edit movie
async function editMovie(movieId) {
    const movie = await getMovieById(movieId);
    if (!movie) return;
    
    editingMovieId = movieId;
    document.getElementById('formTitle').textContent = 'Edit Movie';
    document.getElementById('movieId').value = movie.movieId;
    document.getElementById('movieName').value = movie.movieName;
    document.getElementById('genre').value = movie.genre;
    
    // Convert ISO datetime to local datetime-local format
    const showTime = new Date(movie.showTime);
    const localDateTime = new Date(showTime.getTime() - showTime.getTimezoneOffset() * 60000)
        .toISOString().slice(0, 16);
    document.getElementById('showTime').value = localDateTime;
    
    document.getElementById('ticketPrice').value = movie.ticketPrice;
    document.getElementById('availableSeats').value = movie.availableSeats;
    
    document.getElementById('movieFormSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle movie form submit
async function handleMovieFormSubmit(e) {
    e.preventDefault();
    
    const movieData = {
        movieName: document.getElementById('movieName').value,
        genre: document.getElementById('genre').value,
        showTime: document.getElementById('showTime').value,
        ticketPrice: parseFloat(document.getElementById('ticketPrice').value),
        availableSeats: parseInt(document.getElementById('availableSeats').value),
    };
    
    let success;
    if (editingMovieId) {
        success = await updateMovie(editingMovieId, movieData);
    } else {
        success = await addMovie(movieData);
    }
    
    if (success) {
        hideMovieForm();
        loadMovies();
    }
}

// Confirm and delete movie
async function confirmDeleteMovie(movieId) {
    if (confirm('Are you sure you want to delete this movie? All bookings for this movie will be affected.')) {
        const success = await deleteMovie(movieId);
        if (success) {
            loadMovies();
        }
    }
}

// Booking Modal Functions
function openBookingModal(movieId) {
    getMovieById(movieId).then(movie => {
        if (!movie) return;
        
        document.getElementById('bookingMovieId').value = movie.movieId;
        document.getElementById('bookingMovieName').textContent = movie.movieName;
        document.getElementById('bookingTicketPrice').textContent = movie.ticketPrice;
        document.getElementById('bookingAvailableSeats').textContent = movie.availableSeats;
        document.getElementById('customerName').value = '';
        document.getElementById('numberOfSeats').value = '';
        document.getElementById('totalPrice').textContent = '0';
        
        document.getElementById('bookingModal').style.display = 'block';
    });
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.getElementById('bookingForm').reset();
}

function calculateTotal() {
    const ticketPrice = parseFloat(document.getElementById('bookingTicketPrice').textContent);
    const numberOfSeats = parseInt(document.getElementById('numberOfSeats').value) || 0;
    const total = ticketPrice * numberOfSeats;
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

async function handleBookingFormSubmit(e) {
    e.preventDefault();
    
    const bookingData = {
        customerName: document.getElementById('customerName').value,
        movieId: parseInt(document.getElementById('bookingMovieId').value),
        numberOfSeats: parseInt(document.getElementById('numberOfSeats').value),
    };
    
    const success = await createBooking(bookingData);
    
    if (success) {
        closeBookingModal();
        // Reload movies to show updated seat availability
        loadMovies();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingModal();
    }
}
