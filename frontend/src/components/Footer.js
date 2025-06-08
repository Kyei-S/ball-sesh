// frontend/src/components/Footer.js
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const footerLinks = {
    'About Us': ['Our Story', 'Locations', 'Team', 'Careers'],
    'Services': ['Book a Pitch', 'Tournaments', 'Coaching', 'Private Events'],
    'Support': ['FAQs', 'Contact Us', 'Terms of Service', 'Privacy Policy']
  };

  return (
    <footer className="bg-surface mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <img src="/logo.png" alt="Logo" className="h-8 mb-4" />
            <p className="text-text-secondary mb-4">
              Your premier destination for football pitch bookings and community games.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {[FaTwitter, FaInstagram, FaFacebookF, FaYoutube].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h3 className="font-semibold text-lg mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-text-secondary hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm">
              © {new Date().getFullYear()} Pitch Play. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-text-secondary hover:text-primary text-sm">
                Terms
              </a>
              <a href="#" className="text-text-secondary hover:text-primary text-sm">
                Privacy
              </a>
              <a href="#" className="text-text-secondary hover:text-primary text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
