// Payment Page JavaScript

let currentMovie = null;
let bookingDetails = {};

document.addEventListener('DOMContentLoaded', () => {
    loadBookingSummary();
    setupPaymentForm();
});

async function loadBookingSummary() {
    const movieId = localStorage.getItem('selectedMovieId');
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats') || '[]');
    const numberOfSeats = localStorage.getItem('numberOfSeats') || 0;
    const totalPrice = localStorage.getItem('totalPrice') || 0;
    const showTime = localStorage.getItem('selectedShowTime') || 'Today, 7:00 PM';
    
    if (!movieId || selectedSeats.length === 0) {
        showAlert('No booking information found', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }
    
    currentMovie = await getMovieById(movieId);
    
    if (!currentMovie) {
        showAlert('Movie not found', 'error');
        return;
    }
    
    // Display summary
    document.getElementById('summaryMovieName').textContent = currentMovie.movieName;
    document.getElementById('summaryDate').textContent = showTime;
    document.getElementById('summarySeats').textContent = selectedSeats.join(', ');
    document.getElementById('summaryTicketPrice').textContent = currentMovie.ticketPrice;
    document.getElementById('summaryNumberOfSeats').textContent = numberOfSeats;
    
    const convenienceFee = 50;
    const finalTotal = parseFloat(totalPrice) + convenienceFee;
    
    document.getElementById('convenienceFee').textContent = convenienceFee;
    document.getElementById('finalTotal').textContent = finalTotal;
    document.getElementById('paymentTotal').textContent = finalTotal;
    
    bookingDetails = {
        movieId: currentMovie.movieId,
        movieName: currentMovie.movieName,
        seats: selectedSeats,
        numberOfSeats: parseInt(numberOfSeats),
        totalPrice: finalTotal,
        showTime: showTime
    };
}

function setupPaymentForm() {
    const form = document.getElementById('paymentForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const customerName = document.getElementById('customerName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        if (!customerName || !email || !phone) {
            showAlert('Please fill all required fields', 'warning');
            return;
        }
        
        // Show processing
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Create booking
        const bookingData = {
            customerName: customerName,
            movieId: bookingDetails.movieId,
            numberOfSeats: bookingDetails.numberOfSeats
        };
        
        const booking = await createBooking(bookingData);
        
        if (booking) {
            // Store booking info for ticket page
            localStorage.setItem('bookingId', booking.bookingId);
            localStorage.setItem('customerName', customerName);
            localStorage.setItem('customerEmail', email);
            localStorage.setItem('customerPhone', phone);
            localStorage.setItem('paymentMethod', paymentMethod);
            
            // Redirect to ticket page
            window.location.href = 'ticket.html';
        } else {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}
