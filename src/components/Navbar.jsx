import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">NIZHAL</Link>

      {/* Desktop Links */}
      <div className="nav-links desktop-only">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        <Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>Events</Link>
        <Link to="/community" className="join-btn">Join</Link>
      </div>

      {/* Mobile Toggle */}
      <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} color="var(--color-charcoal)" /> : <Menu size={24} color="var(--color-charcoal)" />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mobile-dropdown">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/events" onClick={() => setIsOpen(false)}>Events</Link>
          <Link to="/community" className="join-btn" onClick={() => setIsOpen(false)}>Join</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
