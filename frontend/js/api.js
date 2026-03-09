// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

// API Endpoints
const ENDPOINTS = {
    MOVIES: `${API_BASE_URL}/movies`,
    BOOKINGS: `${API_BASE_URL}/bookings`,
};

// Helper function to show alert messages
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Movie API Functions
async function getAllMovies() {
    try {
        const response = await fetch(ENDPOINTS.MOVIES);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        showAlert('Error loading movies. Please try again.', 'error');
        return [];
    }
}

async function getMovieById(id) {
    try {
        const response = await fetch(`${ENDPOINTS.MOVIES}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie:', error);
        showAlert('Error loading movie details. Please try again.', 'error');
        return null;
    }
}

async function addMovie(movieData) {
    try {
        const response = await fetch(ENDPOINTS.MOVIES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieData),
        });
        
        if (!response.ok) {
            throw new Error('Failed to add movie');
        }
        
        const movie = await response.json();
        showAlert('Movie added successfully!', 'success');
        return movie;
    } catch (error) {
        console.error('Error adding movie:', error);
        showAlert('Error adding movie. Please try again.', 'error');
        return null;
    }
}

async function updateMovie(id, movieData) {
    try {
        const response = await fetch(`${ENDPOINTS.MOVIES}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieData),
        });
        
        if (!response.ok) {
            throw new Error('Failed to update movie');
        }
        
        const movie = await response.json();
        showAlert('Movie updated successfully!', 'success');
        return movie;
    } catch (error) {
        console.error('Error updating movie:', error);
        showAlert('Error updating movie. Please try again.', 'error');
        return null;
    }
}

async function deleteMovie(id) {
    try {
        const response = await fetch(`${ENDPOINTS.MOVIES}/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete movie');
        }
        
        showAlert('Movie deleted successfully!', 'success');
        return true;
    } catch (error) {
        console.error('Error deleting movie:', error);
        showAlert('Error deleting movie. Please try again.', 'error');
        return false;
    }
}

async function searchMoviesByGenre(genre) {
    try {
        const response = await fetch(`${ENDPOINTS.MOVIES}/search?genre=${encodeURIComponent(genre)}`);
        if (!response.ok) {
            throw new Error('Failed to search movies');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching movies:', error);
        showAlert('Error searching movies. Please try again.', 'error');
        return [];
    }
}

// Booking API Functions
async function getAllBookings() {
    try {
        const response = await fetch(ENDPOINTS.BOOKINGS);
        if (!response.ok) {
            throw new Error('Failed to fetch bookings');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching bookings:', error);
        showAlert('Error loading bookings. Please try again.', 'error');
        return [];
    }
}

async function getBookingById(id) {
    try {
        const response = await fetch(`${ENDPOINTS.BOOKINGS}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch booking');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching booking:', error);
        showAlert('Error loading booking details. Please try again.', 'error');
        return null;
    }
}

async function createBooking(bookingData) {
    try {
        const response = await fetch(ENDPOINTS.BOOKINGS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create booking');
        }
        
        const booking = await response.json();
        showAlert('Booking created successfully!', 'success');
        return booking;
    } catch (error) {
        console.error('Error creating booking:', error);
        showAlert(error.message || 'Error creating booking. Please try again.', 'error');
        return null;
    }
}

async function cancelBooking(id) {
    try {
        const response = await fetch(`${ENDPOINTS.BOOKINGS}/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Failed to cancel booking');
        }
        
        showAlert('Booking cancelled successfully!', 'success');
        return true;
    } catch (error) {
        console.error('Error cancelling booking:', error);
        showAlert('Error cancelling booking. Please try again.', 'error');
        return false;
    }
}

async function getBookingsByMovieId(movieId) {
    try {
        const response = await fetch(`${ENDPOINTS.BOOKINGS}/movie/${movieId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch bookings');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
}

// Utility Functions
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatCurrency(amount) {
    return `₹${parseFloat(amount).toFixed(2)}`;
}
