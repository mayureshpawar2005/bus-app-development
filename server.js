

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Bus model
const Bus = require('./models/Bus');
const Booking = require('./models/Booking');

// Routes
app.get('/api/buses', async (req, res) => {
  const { departureCity, arrivalCity, date, seatType, isAC, departureSlot } = req.query;
  
  // Fetch buses based on filters
  const buses = await Bus.find({
    departureCity,
    arrivalCity,
    date,
    seatType,
    isAC: isAC === 'true',
    departureSlot
  });
  res.json(buses);
});

app.get('/api/buses/:busId', async (req, res) => {
  const bus = await Bus.findById(req.params.busId);
  res.json(bus);
});

app.post('/api/bookings', async (req, res) => {
  const { busId, seats, passengerDetails } = req.body;
  
  const booking = new Booking({
    busId,
    seats,
    passengerDetails,
  });
  
  await booking.save();
  
  res.json({ message: "Booking successful", booking });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));