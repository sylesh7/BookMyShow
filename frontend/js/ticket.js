// E-Ticket Page JavaScript

let bookingInfo = null;

document.addEventListener('DOMContentLoaded', () => {
    loadTicketDetails();
});

async function loadTicketDetails() {
    const bookingId = localStorage.getItem('bookingId');
    
    if (!bookingId) {
        showAlert('No booking found', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }
    
    // Get booking details
    bookingInfo = await getBookingById(bookingId);
    
    if (!bookingInfo) {
        showAlert('Booking not found', 'error');
        return;
    }
    
    // Get additional stored data
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats') || '[]');
    const showTime = localStorage.getItem('selectedShowTime') || '';
    const customerName = localStorage.getItem('customerName') || bookingInfo.customerName;
    
    // Display ticket details
    document.getElementById('ticketBookingId').textContent = bookingInfo.bookingId;
    document.getElementById('ticketMovieName').textContent = bookingInfo.movieName;
    document.getElementById('ticketCustomerName').textContent = customerName;
    document.getElementById('ticketSeats').textContent = selectedSeats.join(', ') || 'N/A';
    document.getElementById('ticketNumberOfSeats').textContent = bookingInfo.numberOfSeats;
    document.getElementById('ticketTotal').textContent = bookingInfo.totalPrice;
    
    // Format date and time
    const bookingDate = new Date(bookingInfo.bookingDate);
    document.getElementById('ticketDate').textContent = bookingDate.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    document.getElementById('ticketTime').textContent = showTime || bookingDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Generate QR Code
    generateQRCode();
}

function generateQRCode() {
    try {
        const qrData = {
            bookingId: bookingInfo.bookingId,
            movieName: bookingInfo.movieName,
            customerName: bookingInfo.customerName,
            seats: bookingInfo.numberOfSeats,
            amount: bookingInfo.totalPrice
        };
        
        const canvas = document.getElementById('qrcode');
        QRCode.toCanvas(canvas, JSON.stringify(qrData), {
            width: 250,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, (error) => {
            if (error) {
                console.error('QR Code generation error:', error);
                showAlert('Could not generate QR code', 'warning');
            }
        });
    } catch (error) {
        console.error('QR Code error:', error);
    }
}

function downloadTicket() {
    showAlert('Download feature coming soon!', 'info');
    // In a real implementation, this would generate a PDF
}

function addToWallet() {
    showAlert('Add to Wallet feature coming soon!', 'info');
    // In a real implementation, this would add to Apple/Google Wallet
}

function shareTicket() {
    if (navigator.share) {
        navigator.share({
            title: `Booking for ${bookingInfo.movieName}`,
            text: `I booked ${bookingInfo.numberOfSeats} ticket(s) for ${bookingInfo.movieName}! Booking ID: ${bookingInfo.bookingId}`,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        showAlert('Sharing not supported on this device', 'warning');
    }
}

// Clear booking data from localStorage after a delay
setTimeout(() => {
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('numberOfSeats');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('selectedShowTime');
    localStorage.removeItem('customerEmail');
    localStorage.removeItem('customerPhone');
    localStorage.removeItem('paymentMethod');
}, 5000);
