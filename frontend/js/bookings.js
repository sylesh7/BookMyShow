// Bookings Page JavaScript

// Load all bookings on page load
document.addEventListener('DOMContentLoaded', () => {
    loadBookings();
});

// Load and display bookings
async function loadBookings() {
    const bookingsList = document.getElementById('bookingsList');
    const noBookings = document.getElementById('noBookings');
    
    bookingsList.innerHTML = '<div class="loading">Loading bookings...</div>';
    noBookings.style.display = 'none';
    
    const bookings = await getAllBookings();
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '';
        noBookings.style.display = 'block';
        return;
    }
    
    bookingsList.innerHTML = bookings.map(booking => `
        <div class="booking-card">
            <div class="booking-header">
                <h3>${booking.movieName}</h3>
                <span class="booking-id">Booking #${booking.bookingId}</span>
            </div>
            <div class="booking-details-grid">
                <div class="booking-detail-item">
                    <strong>Customer Name</strong>
                    <span>${booking.customerName}</span>
                </div>
                <div class="booking-detail-item">
                    <strong>Number of Seats</strong>
                    <span>${booking.numberOfSeats}</span>
                </div>
                <div class="booking-detail-item">
                    <strong>Total Price</strong>
                    <span>${formatCurrency(booking.totalPrice)}</span>
                </div>
                <div class="booking-detail-item">
                    <strong>Booking Date</strong>
                    <span>${formatDateTime(booking.bookingDate)}</span>
                </div>
            </div>
            <div class="booking-actions">
                <button class="btn btn-danger" onclick="confirmCancelBooking(${booking.bookingId})">
                    Cancel Booking
                </button>
            </div>
        </div>
    `).join('');
}

// Confirm and cancel booking
async function confirmCancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking? The seats will be released.')) {
        const success = await cancelBooking(bookingId);
        if (success) {
            loadBookings();
        }
    }
}
