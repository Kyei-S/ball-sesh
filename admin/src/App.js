import { useState, useEffect } from 'react';

function App() {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ venue: '', time: '' });

  // Load sessions from API
  const load = () => {
    fetch('/sessions')
      .then(r => r.json())
      .then(setSessions)
      .catch(console.error);
  };

  useEffect(load, []);

  // Create a session
  const create = e => {
    e.preventDefault();
    fetch('/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSession),
    })
      .then(r => r.json())
      .then(() => {
        setNewSession({ venue: '', time: '' });
        load();
      })
      .catch(console.error);
  };

  // Cancel a session
  const cancel = id => {
    fetch(`/sessions/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' }),
    })
      .then(r => r.json())
      .then(load)
      .catch(console.error);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Admin Scheduler</h1>

      <form onSubmit={create} style={{ marginBottom: '2rem' }}>
        <div>
          <label>
            Venue<br/>
            <input
              required
              value={newSession.venue}
              onChange={e => setNewSession({ ...newSession, venue: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            Time<br/>
            <input
              type="datetime-local"
              required
              value={newSession.time}
              onChange={e => setNewSession({ ...newSession, time: e.target.value })}
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Publish</button>
      </form>

      <h2>Upcoming Sessions</h2>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>When</th><th>Venue</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(s => (
            <tr key={s._id}>
              <td>{new Date(s.time).toLocaleString()}</td>
              <td>{s.venue}</td>
              <td>{s.status}</td>
              <td>
                {s.status === 'active' && (
                  <button onClick={() => cancel(s._id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
