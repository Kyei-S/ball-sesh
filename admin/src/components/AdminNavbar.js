import { NavLink } from 'react-router-dom';

export default function AdminNavbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-heatRed">Ball Sesh Admin</h1>
        <div className="space-x-4">
          <NavLink to="/sessions" className="hover:text-heatPink" activeClassName="underline">Sessions</NavLink>
          <NavLink to="/bookings" className="hover:text-heatPink" activeClassName="underline">Bookings</NavLink>
          <NavLink to="/checkin"  className="hover:text-heatPink" activeClassName="underline">Check-In</NavLink>
        </div>
      </div>
    </nav>
  );
}
