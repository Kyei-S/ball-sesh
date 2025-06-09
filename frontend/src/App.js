import Header from './components/Header';
import SessionList from './components/SessionList';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import Hero from './components/Hero';
import { useState, useEffect } from 'react';
import { FaFutbol, FaUsers, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

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
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-base via-surface to-base">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FaFutbol, title: 'Premium Facilities', desc: 'State-of-the-art pitches' },
              { icon: FaUsers, title: 'Community Games', desc: 'Join local players' },
              { icon: FaCalendar, title: 'Easy Booking', desc: 'Book in few clicks' },
              { icon: FaMapMarkerAlt, title: 'Multiple Locations', desc: 'Venues near you' }
            ].map(({ icon: Icon, title, desc }) => (
              <div className="group cursor-pointer glass-effect p-6 rounded-xl text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,225,255,0.15)]">
                <Icon className="w-12 h-12 mx-auto text-gradient-start mb-4 transform transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">{title}</h3>
                <p className="text-text-secondary group-hover:text-white transition-colors">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Sessions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent mb-2">Available Sessions</h2>
              <p className="text-text-secondary">Find and book your perfect match</p>
            </div>
            <div className="flex gap-4">
              <select className="glass-effect px-4 py-2 rounded-lg">
                <option>All Locations</option>
                {/* Add location options */}
              </select>
              <select className="glass-effect px-4 py-2 rounded-lg">
                <option>All Types</option>
                {/* Add game type options */}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sessions.map(session => (
              <div 
                key={session._id}
                onClick={() => setSelected(session)}
                className="group cursor-pointer glass-effect rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,225,255,0.15)]"
              >
                <div className="h-48 bg-gray-800 relative overflow-hidden">
                  <img 
                    src="/pitch-placeholder.jpg" 
                    alt="Venue"
                    className="w-full h-full object-cover transform transition-transform group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-lg font-semibold text-white">{session.venue}</p>
                    <p className="text-sm text-white/80">{new Date(session.time).toLocaleString()}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gradient-start font-semibold">£{session.price}</span>
                    <span className="px-3 py-1 rounded-full bg-gradient-start/10 text-gradient-start text-sm">
                      {session.status}
                    </span>
                  </div>
                  <p className="mt-2 text-text-secondary group-hover:text-white transition-colors">
                    Click to book this session
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-20 bg-gradient-to-br from-base via-surface to-base">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gradient mb-12 text-center">Our Premium Venues</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div className="group cursor-pointer glass-effect rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={`/venue-${i}.jpg`}
                    alt="Venue"
                    className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base to-transparent opacity-60" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-xl font-semibold text-white mb-2">{`Venue Name ${i}`}</h3>
                    <p className="text-white/80">Location details</p>
                    <span className="mt-4 inline-block text-gradient-start">
                      Explore available sessions →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent mb-12">
            What Players Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-effect p-6 rounded-xl border border-primary/20 hover:border-secondary/20 transition-colors">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gradient-start">
                  <img 
                    src={`/avatar-${i}.jpg`} 
                    alt="Player"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-text-secondary mb-4">
                  "Amazing facilities and great community of players!"
                </p>
                <p className="font-semibold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
                  Player Name
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <BookingModal session={selected} onClose={() => setSelected(null)} />
      )}
      
      <Footer />
    </div>
  );
}

export default App;
