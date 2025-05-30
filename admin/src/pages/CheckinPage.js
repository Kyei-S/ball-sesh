import { useState, useEffect } from 'react';

export default function CheckinPage() {
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    fetch('/sessions').then(r => r.json()).then(setSessions);
    fetch('/bookings').then(r => r.json()).then(setBookings);
  }, []);

  const todayList = bookings.filter(b =>
    current && (b.sessionId || b.session) === current._id
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">On-Site Check-In</h2>
      <div className="mb-4">
        <select
          onChange={e => {
            const sel = sessions.find(s => s._id === e.target.value);
            setCurrent(sel);
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- pick a session --</option>
          {sessions.map(s => (
            <option key={s._id} value={s._id}>
              {new Date(s.time).toLocaleString()} @ {s.venue}
            </option>
          ))}
        </select>
      </div>

      {current && (
        <ul className="border rounded divide-y">
          {todayList.map(b => (
            <li key={b.id} className="px-4 py-2 flex justify-between">
              <span>{b.name}</span>
              <button
                className="text-sm text-heatPink hover:underline"
                onClick={() =>
                  fetch(`/bookings/${b.id}/checkin`, { method: 'POST' })
                    .then(() => alert(`Checked in ${b.name}`))
                }
              >
                Check In
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
