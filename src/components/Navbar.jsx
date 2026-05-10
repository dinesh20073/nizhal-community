import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <Link to="/" className="logo">NIZHAL</Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/community" className={location.pathname === '/community' ? 'active' : ''}>Community</Link>
          <Link to="/stories" className={location.pathname === '/stories' ? 'active' : ''}>Stories</Link>
          <Link to="/community#join" className="join-btn">Join</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} color="var(--color-charcoal)" /> : <Menu size={24} color="var(--color-charcoal)" />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="mobile-dropdown">
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/community" onClick={() => setIsOpen(false)}>Community</Link>
          <Link to="/stories" onClick={() => setIsOpen(false)}>Stories</Link>
          <Link to="/community#join" className="join-btn" onClick={() => setIsOpen(false)}>Join</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
