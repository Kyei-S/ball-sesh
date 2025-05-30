// frontend/src/components/Footer.js
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-xs">
      {/* Top grid: Quick Links spans two cols, then Contact & Follow */}
      <div className="container mx-auto px-6 pt-2 grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Quick Links (two internal columns) */}
        <div className="md:col-span-2 grid grid-cols-2 gap-2">
          <div>
            <h3 className="text-white font-semibold mb-1">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
            </ul>
          </div>
          <div>
            <h3 className="invisible"> </h3> {/* keep alignment */}
            <ul className="space-y-1">
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-white font-semibold mb-1">Contact Us</h3>
          <p>Email: <a href="mailto:info@ballsesh.com" className="hover:text-white">info@ballsesh.com</a></p>
          <p>Phone: <a href="tel:+441234567890" className="hover:text-white">+44 1234 567890</a></p>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-white font-semibold mb-1">Follow Us</h3>
          <div className="flex space-x-3 text-base">
            <a href="https://facebook.com"   target="_blank" rel="noopener" className="hover:text-white"><FaFacebookF/></a>
            <a href="https://twitter.com"    target="_blank" rel="noopener" className="hover:text-white"><FaTwitter/></a>
            <a href="https://instagram.com"  target="_blank" rel="noopener" className="hover:text-white"><FaInstagram/></a>
          </div>
        </div>
      </div>

      {/* Bottom bar: tiny padding */}
      <div className="border-t border-gray-800 py-1 text-center">
        &copy; {new Date().getFullYear()} Ball Sesh. All rights reserved.
      </div>
    </footer>
  );
}
