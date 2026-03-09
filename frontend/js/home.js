// Enhanced Home Page JavaScript

let allMovies = [];
let filteredMovies = [];
let currentCategory = 'now-showing';
let currentGenre = 'all';

// Load movies on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAllMovies();
    setupQuickSearch();
    setupDateDisplay();
    loadStats();
});

// Load all movies
async function loadAllMovies() {
    const moviesGrid = document.getElementById('moviesGrid');
    moviesGrid.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Loading amazing movies...</p></div>';
    
    allMovies = await getAllMovies();
    filteredMovies = allMovies;
    
    if (allMovies.length === 0) {
        moviesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <i class="fas fa-film" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3>No movies available yet</h3>
                <p>Check back soon for the latest releases!</p>
            </div>
        `;
        return;
    }
    
    displayMovies(allMovies);
}

// Display movies
function displayMovies(movies) {
    const moviesGrid = document.getElementById('moviesGrid');
    
    if (movies.length === 0) {
        moviesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <i class="fas fa-search" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3>No movies found</h3>
                <p>Try a different search or filter</p>
            </div>
        `;
        return;
    }
    
    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie-card-modern" onclick="viewMovieDetail(${movie.movieId})">
            <div class="movie-poster-modern">
                <i class="fas fa-film"></i>
                <div class="play-overlay">
                    <div class="play-btn">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            </div>
            <div class="movie-info-modern">
                <h3 class="movie-name">${movie.movieName}</h3>
                <span class="movie-genre-badge">${movie.genre}</span>
                <div class="movie-meta-modern">
                    <p><i class="far fa-clock"></i> ${formatDateTime(movie.showTime)}</p>
                    <p><i class="fas fa-couch"></i> ${movie.availableSeats} seats available</p>
                    <p><i class="fas fa-ticket-alt"></i> ₹${movie.ticketPrice}</p>
                </div>
                <div class="movie-actions-modern">
                    <button class="btn btn-primary btn-block" onclick="event.stopPropagation(); viewMovieDetail(${movie.movieId})">
                        <i class="fas fa-ticket-alt"></i> Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// View movie detail
function viewMovieDetail(movieId) {
    localStorage.setItem('selectedMovieId', movieId);
    window.location.href = 'movie-detail.html';
}

// Switch category
function switchCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    const title = category === 'now-showing' ? 'Now Showing' : 'Coming Soon';
    document.querySelector('.section-title').innerHTML = `
        <i class="fas fa-film"></i> ${title}
    `;
    
    applyFilters();
}

// Filter by genre
function filterByGenre(genre) {
    currentGenre = genre;
    document.querySelectorAll('.genre-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    document.querySelector(`[data-genre="${genre.toLowerCase()}"]`).classList.add('active');
    
    applyFilters();
}

// Apply all filters
function applyFilters() {
    let filtered = allMovies;
    
    if (currentGenre !== 'all') {
        filtered = filtered.filter(m => 
            m.genre.toLowerCase().includes(currentGenre.toLowerCase())
        );
    }
    
    displayMovies(filtered);
}

// Quick search
function setupQuickSearch() {
    const searchInput = document.getElementById('quickSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.trim() === '') {
                displayMovies(allMovies);
                return;
            }
            
            const results = allMovies.filter(movie => 
                movie.movieName.toLowerCase().includes(query) ||
                movie.genre.toLowerCase().includes(query)
            );
            displayMovies(results);
        });
    }
}

// Scroll to movies section
function scrollToMovies() {
    document.getElementById('moviesSection').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Setup date display
function setupDateDisplay() {
    const today = document.getElementById('today');
    const tomorrow = document.getElementById('tomorrow');
    
    if (today) {
        const date = new Date();
        today.textContent = date.getDate();
    }
    
    if (tomorrow) {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        tomorrow.textContent = date.getDate();
    }
}

// Load stats
async function loadStats() {
    try {
        const movies = await getAllMovies();
        const bookings = await getAllBookings();
        
        document.getElementById('totalMovies').textContent = movies.length;
        document.getElementById('totalBookings').textContent = bookings.length;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}
