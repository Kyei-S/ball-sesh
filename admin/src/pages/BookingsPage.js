import { useState, useEffect } from 'react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('/bookings')
      .then(r => r.json())
      .then(setBookings);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      <table className="w-full table-auto text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Session ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id} className="border-t">
              <td className="px-4 py-2">{b.sessionId || b.session}</td>
              <td className="px-4 py-2">{b.name}</td>
              <td className="px-4 py-2">{b.contact}</td>
              <td className="px-4 py-2">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
