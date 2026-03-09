// Home Page JavaScript

// Search movies by genre
async function searchByGenre() {
    const genre = document.getElementById('genreInput').value.trim();
    const resultsDiv = document.getElementById('searchResults');
    
    if (!genre) {
        showAlert('Please enter a genre to search', 'warning');
        return;
    }
    
    resultsDiv.innerHTML = '<div class="loading">Searching...</div>';
    
    const movies = await searchMoviesByGenre(genre);
    
    if (movies.length === 0) {
        resultsDiv.innerHTML = `
            <div class="no-data">
                <h3>No movies found</h3>
                <p>No movies found for genre "${genre}"</p>
            </div>
        `;
        return;
    }
    
    displayMovies(movies, resultsDiv);
}

function displayMovies(movies, container) {
    container.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <div class="movie-header">
                <h3>${movie.movieName}</h3>
                <span class="movie-genre">${movie.genre}</span>
            </div>
            <div class="movie-body">
                <div class="movie-info">
                    <p><strong>Show Time:</strong> <span>${formatDateTime(movie.showTime)}</span></p>
                    <p><strong>Price:</strong> <span>${formatCurrency(movie.ticketPrice)}</span></p>
                    <p><strong>Available Seats:</strong> <span>${movie.availableSeats}</span></p>
                </div>
                <div class="movie-actions">
                    <a href="movies.html" class="btn btn-primary">Book Now</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Allow search on Enter key
document.addEventListener('DOMContentLoaded', () => {
    const genreInput = document.getElementById('genreInput');
    if (genreInput) {
        genreInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchByGenre();
            }
        });
    }
});
