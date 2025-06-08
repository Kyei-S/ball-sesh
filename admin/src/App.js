import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import DashboardPage from './pages/DashboardPage';
import SessionsPage from './pages/SessionsPage';
import BookingsPage from './pages/BookingsPage';
import CheckinPage  from './pages/CheckinPage';

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <main className="flex-1 p-8 bg-surface overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/checkin" element={<CheckinPage />} />
          </Routes>
        </main>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
