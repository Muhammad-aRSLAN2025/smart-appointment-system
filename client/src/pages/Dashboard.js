import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch the queue from the backend
    const fetchQueue = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/appointments/all');
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to fetch queue");
      }
    };
    fetchQueue();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Live Appointment Queue</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Time Slot</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((apppt) => (
              <tr key={apppt._id}>
                <td className="py-3 px-4">{apppt.customer?.name || 'Guest'}</td>
                <td className="py-3 px-4">{apppt.serviceName}</td>
                <td className="py-3 px-4">{apppt.timeSlot}</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">
                    {apppt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;