// frontend/src/components/Header.js
import { FaBars, FaSearch } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 glass-effect">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src="/pitchandballpic.png"
              alt="Ball Sesh logo"
              className="h-10 w-auto rounded-lg"
            />
            <span className="neon-text text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pitch Play
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#sessions" className="text-text-primary hover:text-primary transition-colors">Sessions</a>
            <a href="#about" className="text-text-primary hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-text-primary hover:text-primary transition-colors">Contact</a>
            <button className="neon-button px-4 py-2 rounded-full">
              Book Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden neon-text">
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
