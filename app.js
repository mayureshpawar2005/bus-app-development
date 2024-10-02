import React, { useState } from 'react';
import axios from 'axios';
import BusList from './components/BusList';
import './App.css';

function App() {
  const [search, setSearch] = useState({
    departureCity: '',
    arrivalCity: '',
    date: '',
  });

  const [buses, setBuses] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/buses', {
        params: { 
          departureCity: search.departureCity, 
          arrivalCity: search.arrivalCity, 
          date: search.date 
        }
      });
      setBuses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>Bus Booking System</h1>
      <div className="search-form">
        <input 
          type="text" 
          placeholder="Departure City" 
          value={search.departureCity} 
          onChange={e => setSearch({ ...search, departureCity: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Arrival City" 
          value={search.arrivalCity} 
          onChange={e => setSearch({ ...search, arrivalCity: e.target.value })}
        />
        <input 
          type="date" 
          value={search.date} 
          onChange={e => setSearch({ ...search, date: e.target.value })}
        />
        <button onClick={handleSearch}>Search Buses</button>
      </div>

      <BusList buses={buses} />
    </div>
  );
}

export default App;
