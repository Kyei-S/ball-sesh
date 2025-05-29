import { useState, useEffect } from 'react';
import SessionList from './components/SessionList';
import BookingModal from './components/BookingModal';

function App() {
  const [sessions, setSessions] = useState([]);
  const [selected, setSelected] = useState(null);

  // Load sessions once
  useEffect(() => {
    fetch('/sessions')
      .then(r => r.json())
      .then(setSessions)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold text-heatRed mb-6">
        Choose Your Session
      </h1>

      <SessionList sessions={sessions} onSelect={setSelected} />

      {selected && (
        <BookingModal
          session={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

export default App;
