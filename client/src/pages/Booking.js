import React, { useState } from 'react';
import axios from 'axios';

const Booking = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    date: '',
    timeSlot: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // We get the userId from localStorage (saved during login)
      const userId = localStorage.getItem('userId'); 
      
      await axios.post('http://localhost:5000/api/appointments/book', {
        ...formData,
        userId
      });
      alert("Appointment Booked!");
    } catch (err) {
      alert(err.response?.data?.msg || "Booking failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Service</label>
          <select 
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
          >
            <option value="">Select a Service</option>
            <option value="Consultation">Consultation</option>
            <option value="Haircut">Haircut</option>
            <option value="Repair">Repair</option>
          </select>
        </div>
        <input 
          type="date" 
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
        <input 
          type="time" 
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;