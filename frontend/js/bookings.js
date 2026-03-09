// Enhanced Bookings Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadBookings();
});

async function loadBookings() {
    const bookingsList = document.getElementById('bookingsList');
    const noBookings = document.getElementById('noBookings');
    
    bookingsList.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading your bookings...</p>
        </div>
    `;
    noBookings.style.display = 'none';
    
    const bookings = await getAllBookings();
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '';
        noBookings.style.display = 'block';
        return;
    }
    
    bookingsList.innerHTML = bookings.map(booking => `
        <div class="order-summary-card" style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem;">
                <div>
                    <h2 style="margin-bottom: 0.5rem;">
                        <i class="fas fa-film"></i> ${booking.movieName}
                    </h2>
                    <p style="color: var(--text-secondary);">
                        <i class="fas fa-calendar"></i> ${formatDateTime(booking.bookingDate)}
                    </p>
                </div>
                <span style="padding: 0.5rem 1rem; background: var(--gradient-primary); border-radius: 8px;">
                    ID: #${booking.bookingId}
                </span>
            </div>
            
            <div class="order-details">
                <div class="detail-row">
                    <span><i class="fas fa-user"></i> Customer Name:</span>
                    <span>${booking.customerName}</span>
                </div>
                <div class="detail-row">
                    <span><i class="fas fa-couch"></i> Number of Seats:</span>
                    <span>${booking.numberOfSeats}</span>
                </div>
                <div class="detail-row">
                    <span><i class="fas fa-ticket-alt"></i> Movie:</span>
                    <span>${booking.movieName}</span>
                </div>
                <hr>
                <div class="detail-row total">
                    <span>Total Amount Paid:</span>
                    <span class="total-amount">₹${booking.totalPrice.toFixed(2)}</span>
                </div>
            </div>
            
            <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                <button class="btn btn-secondary" onclick="viewTicket(${booking.bookingId})">
                    <i class="fas fa-ticket-alt"></i> View Ticket
                </button>
                <button class="btn btn-danger" onclick="confirmCancelBooking(${booking.bookingId})">
                    <i class="fas fa-times-circle"></i> Cancel Booking
                </button>
            </div>
        </div>
    `).join('');
}

async function confirmCancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking? The seats will be released and you will receive a refund.')) {
        const success = await cancelBooking(bookingId);
        if (success) {
            loadBookings();
        }
    }
}

function viewTicket(bookingId) {
    localStorage.setItem('bookingId', bookingId);
    window.location.href = 'ticket.html';
}
