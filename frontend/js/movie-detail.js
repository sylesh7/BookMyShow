// Movie Detail Page JavaScript

let currentMovie = null;

document.addEventListener('DOMContentLoaded', () => {
    loadMovieDetail();
    setupDateDisplay();
});

async function loadMovieDetail() {
    const movieId = localStorage.getItem('selectedMovieId');
    
    if (!movieId) {
        showAlert('No movie selected', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }
    
    currentMovie = await getMovieById(movieId);
    
    if (!currentMovie) {
        showAlert('Movie not found', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }
    
    displayMovieDetails();
}

function displayMovieDetails() {
    document.getElementById('movieTitle').textContent = currentMovie.movieName;
    document.getElementById('genreTag').textContent = currentMovie.genre;
    document.getElementById('movieShowTime').textContent = formatDateTime(currentMovie.showTime);
    document.getElementById('availableSeats').textContent = currentMovie.availableSeats;
    document.getElementById('ticketPrice').textContent = currentMovie.ticketPrice;
    
    // Update browser title
    document.title = `${currentMovie.movieName} - BookMyShow`;
}

function scrollToShowtimes() {
    document.getElementById('showtimesSection').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function goToSeatSelection() {
    localStorage.setItem('selectedMovieId', currentMovie.movieId);
    localStorage.setItem('selectedShowTime', 'Today, 7:00 PM');
    window.location.href = 'seat-selection.html';
}

function setupDateDisplay() {
    const today = document.getElementById('today');
    const tomorrow = document.getElementById('tomorrow');
    
    if (today) {
        const date = new Date();
        today.textContent = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    
    if (tomorrow) {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        tomorrow.textContent = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}
