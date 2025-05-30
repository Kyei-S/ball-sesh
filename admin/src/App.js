import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import SessionsPage from './pages/SessionsPage';
import BookingsPage from './pages/BookingsPage';
import CheckinPage  from './pages/CheckinPage';

function App() {
  return (
    <BrowserRouter>
      <AdminNavbar/>
      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/sessions" replace />} />
          <Route path="/sessions" element={<SessionsPage/>} />
          <Route path="/bookings" element={<BookingsPage/>} />
          <Route path="/checkin"  element={<CheckinPage/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
