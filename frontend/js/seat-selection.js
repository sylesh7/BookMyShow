// Seat Selection Page JavaScript

let currentMovie = null;
let selectedSeats = [];
const totalRows = 8;
const seatsPerRow = 12;

document.addEventListener('DOMContentLoaded', () => {
    loadMovieInfo();
    generateSeats();
});

async function loadMovieInfo() {
    const movieId = localStorage.getItem('selectedMovieId');
    const showTime = localStorage.getItem('selectedShowTime') || 'Today, 7:00 PM';
    
    if (!movieId) {
        showAlert('No movie selected', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }
    
    currentMovie = await getMovieById(movieId);
    
    if (!currentMovie) {
        showAlert('Movie not found', 'error');
        return;
    }
    
    document.getElementById('selectedMovie').textContent = currentMovie.movieName;
    document.getElementById('selectedShowtime').textContent = showTime;
    document.getElementById('normalPrice').textContent = currentMovie.ticketPrice;
    document.getElementById('premiumPrice').textContent = currentMovie.ticketPrice * 1.4;
}

function generateSeats() {
    const seatMap = document.getElementById('seatMap');
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    let html = '';
    
    rows.forEach((row, rowIndex) => {
        html += `<div class="seat-row">`;
        html += `<span style="margin-right: 20px; color: var(--text-muted); width: 30px;">${row}</span>`;
        
        for (let i = 1; i <= seatsPerRow; i++) {
            const seatNumber = `${row}${i}`;
            // Randomly occupy some seats for demo
            const isOccupied = Math.random() < 0.3;
            const occupiedClass = isOccupied ? 'occupied' : '';
            
            html += `
                <div class="seat ${occupiedClass}" 
                     data-seat="${seatNumber}" 
                     data-row="${row}"
                     onclick="toggleSeat(this, '${seatNumber}')">
                    ${i}
                </div>
            `;
        }
        
        html += `</div>`;
    });
    
    seatMap.innerHTML = html;
}

function toggleSeat(element, seatNumber) {
    if (element.classList.contains('occupied')) {
        return;
    }
    
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== seatNumber);
    } else {
        element.classList.add('selected');
        selectedSeats.push(seatNumber);
    }
    
    updateSummary();
}

function updateSummary() {
    const count = selectedSeats.length;
    const price = currentMovie.ticketPrice;
    const total = count * price;
    
    document.getElementById('selectedSeatsCount').textContent = 
        count === 0 ? '0 Seats Selected' : `${count} Seat${count > 1 ? 's' : ''} Selected`;
    
    document.getElementById('selectedSeatNumbers').textContent = 
        count === 0 ? '-' : selectedSeats.join(', ');
    
    document.getElementById('totalPrice').textContent = total;
    
    const proceedBtn = document.getElementById('proceedBtn');
    proceedBtn.disabled = count === 0;
}

function proceedToPayment() {
    if (selectedSeats.length === 0) {
        showAlert('Please select at least one seat', 'warning');
        return;
    }
    
    if (selectedSeats.length > currentMovie.availableSeats) {
        showAlert('Not enough seats available', 'error');
        return;
    }
    
    // Store booking information
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('numberOfSeats', selectedSeats.length);
    localStorage.setItem('totalPrice', selectedSeats.length * currentMovie.ticketPrice);
    
    window.location.href = 'payment.html';
}
