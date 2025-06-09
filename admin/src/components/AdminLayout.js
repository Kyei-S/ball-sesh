import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCalendar, FaUsers, FaCheckCircle, FaCog } from 'react-icons/fa';

const menuItems = [
  { path: '/', icon: FaHome, label: 'Dashboard' },
  { path: '/sessions', icon: FaCalendar, label: 'Sessions' },
  { path: '/bookings', icon: FaUsers, label: 'Bookings' },
  { path: '/checkin', icon: FaCheckCircle, label: 'Check-in' },
];

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-base">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-surface transition-all duration-300 border-r border-white/10`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {!collapsed && <span className="neon-text text-xl font-bold">Admin Panel</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="neon-button p-2 rounded">
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {menuItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-2 p-3 rounded-lg mb-2 transition-all
                ${location.pathname === path 
                  ? 'bg-primary/20 text-primary' 
                  : 'text-text-secondary hover:bg-white/5'}`}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* Settings */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <button className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors">
            <FaCog className="h-5 w-5" />
            {!collapsed && <span>Settings</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
