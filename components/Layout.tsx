import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { api } from '../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isLoggedIn = api.isAuthenticated();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isAdmin ? 'bg-zinc-900 border-b border-zinc-700' : 'bg-dragon-black/95 backdrop-blur-sm border-b border-dragon-red/30'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-dragon-red rotate-45 flex items-center justify-center border-2 border-dragon-gold shadow-lg group-hover:rotate-0 transition-transform duration-300">
                <span className="text-white font-bold text-xl -rotate-45 group-hover:rotate-0 transition-transform duration-300">DF</span>
              </div>
              <span className="text-white font-bold text-2xl tracking-tighter uppercase hidden sm:block">
                Dragon<span className="text-dragon-red">Fist</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {!isAdmin && navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium uppercase tracking-widest transition-colors ${
                    location.pathname === link.path
                      ? 'text-dragon-gold bg-white/5'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAdmin && isLoggedIn && (
                <span className="text-dragon-gold font-mono text-sm border border-dragon-gold px-2 py-1 rounded">ADMIN MODE</span>
              )}

              <Link to="/admin" className="text-gray-500 hover:text-dragon-red transition-colors">
                <Shield size={18} />
              </Link>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dragon-black border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {!isAdmin && navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-dragon-red">
                Admin Portal
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-dragon-black text-gray-400 border-t border-dragon-red/50">
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-xl font-bold uppercase mb-4 tracking-wider">Dragon Fist</h3>
          <p className="mb-4 text-sm max-w-xs">Forging strength, discipline, and community through the art of combat since 1995.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-dragon-gold transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-dragon-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-dragon-gold transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold uppercase mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-dragon-red">Our Instructors</Link></li>
            <li><Link to="/events" className="hover:text-dragon-red">Schedule</Link></li>
            <li><Link to="/gallery" className="hover:text-dragon-red">Photo Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-dragon-red">Join Now</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold uppercase mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail size={16} /> info@dragonfist.edu</li>
            <li>Student Center, Room 304</li>
            <li>University Campus</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs">
        &copy; {new Date().getFullYear()} Dragon Fist Martial Arts Club. All rights reserved.
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};