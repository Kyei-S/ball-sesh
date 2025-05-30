import Header from './components/Header';
import SessionList from './components/SessionList';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

function App() {
  const [sessions, setSessions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/api/sessions')
      .then(r => r.json())
      .then(setSessions)
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar/Header */}
      <Header />

      {/* Main content area grows to fill */}
      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-flamePink mb-6">
          Choose Your Session
        </h1>

        <SessionList sessions={sessions} onSelect={setSelected} />

        {selected && (
          <BookingModal
            session={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </main>

      {/* Slim footer at bottom */}
      <Footer />
    </div>
  );
}

export default App;
