import { useState, useEffect } from 'react';

function App() {
  const [sessions, setSessions] = useState([]);
  const [form, setForm] = useState({ session: '', name: '', contact: '' });
  const [result, setResult] = useState(null);

  // 1. Load available sessions on mount
  useEffect(() => {
    fetch('/sessions')
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => setSessions(data))
      .catch(err => console.error('Error fetching sessions:', err));
  }, []);

  // 2. Submit booking
  const submit = e => {
    e.preventDefault();
    setResult(null);
    fetch('/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
      .then(data => setResult({ success: true, data }))
      .catch(err => setResult({ success: false, error: err.error || err }));
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Book a Session</h1>

      <form onSubmit={submit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Session<br/>
            <select
              required
              value={form.session}
              onChange={e => setForm({ ...form, session: e.target.value })}
            >
              <option value="">-- pick one --</option>
              {sessions.map(s => (
                <option key={s._id} value={s._id}>
                  {new Date(s.time).toLocaleString()} @ {s.venue} ({s.status})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Name<br/>
            <input
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Contact<br/>
            <input
              required
              value={form.contact}
              onChange={e => setForm({ ...form, contact: e.target.value })}
            />
          </label>
        </div>

        <button type="submit">Book Now</button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f0f0' }}>
          {result.success ? (
            <>
              <h2>Booking Confirmed!</h2>
              <pre>{JSON.stringify(result.data, null, 2)}</pre>
            </>
          ) : (
            <>
              <h2 style={{ color: 'red' }}>Error</h2>
              <pre>{JSON.stringify(result.error, null, 2)}</pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
