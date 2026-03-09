# 🚀 Quick Start Guide - BookMyShow

## ⚡ 3-Minute Setup

### Step 1: Start MySQL
```bash
# Make sure MySQL is running on port 3306
# Database will be auto-created
```

### Step 2: Start Backend
```bash
cd backend/bookmyshow
./mvnw spring-boot:run
```
✅ Backend running on http://localhost:8080

### Step 3: Start Frontend
```bash
cd frontend
python -m http.server 3000
```
✅ Frontend running on http://localhost:3000

### Step 4: Open Browser
Navigate to: **http://localhost:3000**

---

## 🎯 First Time User Flow

1. **Browse** → Home page shows all movies
2. **Click** → Any movie card to view details
3. **Select** → A showtime and click "Book Seats"
4. **Choose** → Click seats in the seat map (grey ones)
5. **Book** → Fill your name and click "Pay"
6. **Done** → Get your e-ticket with QR code!

---

## 🛠️ Common Commands

### Backend
```bash
# Clean build
./mvnw clean install

# Run tests
./mvnw test

# Package
./mvnw package
```

### Frontend
```bash
# Python server
python -m http.server 3000

# Or with Node.js
npx http-server -p 3000 -c-1
```

---

## 📝 Configuration

### Update Database Password
File: `backend/bookmyshow/src/main/resources/application.properties`
```properties
spring.datasource.password=YOUR_PASSWORD_HERE
```

### Change Ports
Backend: Change `server.port` in application.properties
Frontend: Change port number in server command

---

## 🎨 Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | / | Browse movies, search, filter |
| Movie Detail | /movie-detail.html | View details, select showtime |
| Seat Selection | /seat-selection.html | Interactive seat booking |
| Payment | /payment.html | Enter details, pay |
| E-Ticket | /ticket.html | QR code ticket |
| My Bookings | /bookings.html | View all bookings |
| Admin | /movies.html | Manage movies |

---

## 🐛 Quick Fixes

**Backend won't start?**
- Check MySQL is running
- Verify password in application.properties

**Frontend shows errors?**
- Clear cache (Ctrl + F5)
- Check backend is running

**Can't book seats?**
- Ensure movie has available seats
- Check browser console for errors

---

## 💡 Pro Tips

1. **Add Sample Data**: Use Admin panel to add movies
2. **Test Booking**: Book a few tickets to see the flow
3. **View E-Ticket**: Check the QR code generation
4. **Cancel Booking**: Test the cancellation feature
5. **Mobile View**: Try resizing browser window

---

## 🎬 Demo Data

Add these movies via Admin panel:

1. **Avengers: Endgame**
   - Genre: Action
   - Price: ₹350
   - Seats: 100

2. **The Hangover**
   - Genre: Comedy
   - Price: ₹250
   - Seats: 80

3. **Inception**
   - Genre: Thriller
   - Price: ₹400
   - Seats: 120

---

## ✅ Success Checklist

- [ ] MySQL running
- [ ] Backend started (port 8080)
- [ ] Frontend started (port 3000)
- [ ] Can see home page
- [ ] Movies are loading
- [ ] Can click on a movie
- [ ] Seat selection works
- [ ] Booking completes
- [ ] E-ticket shows QR code

---

## 📞 Need Help?

1. Check README.md for detailed docs
2. Look at console errors (F12)
3. Verify all prerequisites are installed
4. Ensure ports are not blocked

---

**Happy Booking! 🎉**
