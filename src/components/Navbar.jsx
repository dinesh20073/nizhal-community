import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JoinModal from './JoinModal';

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} color="var(--color-charcoal)" /> : <Menu size={28} color="var(--color-charcoal)" />}
          </button>
          <Link to="/" className="logo">NIZHAL</Link>
        </div>

        <button className="join-btn-nav" onClick={() => setIsModalOpen(true)}>
          Join
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="side-menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            >
              <div className="side-menu-links">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setIsOpen(false)}>About</Link>
                <Link to="/events" className={location.pathname === '/events' ? 'active' : ''} onClick={() => setIsOpen(false)}>Events</Link>
                <button 
                  className="join-btn" 
                  onClick={() => { setIsOpen(false); setIsModalOpen(true); }}
                  style={{ textAlign: 'left', background: 'none', border: 'none', font: 'inherit', padding: 0, cursor: 'pointer' }}
                >
                  Join Community
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Navbar;
