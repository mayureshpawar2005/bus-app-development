import React from 'react';

function BusList({ buses }) {
  return (
    <div className="bus-list">
      {buses.map(bus => (
        <div key={bus._id} className="bus-item">
          <h3>{bus.name}</h3>
          <p>From: {bus.departureCity} - To: {bus.arrivalCity}</p>
          <p>Departure: {bus.departureSlot}</p>
          <p>Seats Available: {bus.availableSeats}</p>
          <p>Price: ${bus.price}</p>
          <button>Book Now</button>
        </div>
      ))}
    </div>
  );
}

export default BusList;

