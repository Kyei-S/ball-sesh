// frontend/src/components/Header.js
import { FaBars } from 'react-icons/fa'; // optional hamburger

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo placeholder */}
        <div className="flex items-center space-x-2">
          <img
            src="/pitchandballpic.png"             /* drop your real logo at public/logo.png */
            alt="Ball Sesh logo"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold text-heatRed">Pitch Play</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          <a href="/" className="hover:text-heatRed">Home</a>
          <a href="/about" className="hover:text-heatRed">About</a>
          <a href="/faq" className="hover:text-heatRed">FAQ</a>
        </nav>

        {/* Mobile menu button (just visual) */}
        <button className="md:hidden text-2xl text-gray-600">
          <FaBars />
        </button>
      </div>
    </header>
  );
}
