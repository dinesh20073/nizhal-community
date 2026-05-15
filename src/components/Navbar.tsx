import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = ["home", "about", "events", "contact"];

  return (
    <>
      <nav className="fixed z-50 px-6 md:px-10 pt-6 top-0 left-0 right-0 flex items-center justify-between gap-4 pointer-events-auto">
        {/* Left pill */}
        <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 bg-black/20 backdrop-blur-2xl saturate-150 border border-white/10 shadow-lg shadow-black/20 rounded-full pl-3 pr-6 py-2 relative z-50 transition-all duration-300 hover:bg-black/30">
          <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Nizhal Logo" className="h-7 w-7 rounded-[25%] object-cover" />
          <span className="text-white text-sm font-medium tracking-wide lowercase">nizhal community</span>
        </Link>

        {/* Center pill (Desktop) - Apple Glass Effect */}
        <div className="hidden md:flex items-center gap-1 bg-black/20 backdrop-blur-2xl saturate-150 border border-white/10 shadow-lg shadow-black/20 rounded-full p-1 relative">
          {links.map((item) => {
            const path = item === 'home' ? '/' : `/${item}`;
            const isActive = location.pathname === path;
            return (
              <Link 
                key={item} 
                to={path} 
                className={`relative px-5 py-2 rounded-full text-sm lowercase transition-all duration-300 ease-out z-10 ${isActive ? 'text-black font-medium' : 'text-neutral-300 hover:text-white'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item}
              </Link>
            );
          })}
        </div>

        {/* Right button (Desktop) */}
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('openJoinModal'))}
          className="hidden md:block bg-white text-black text-sm font-medium rounded-full px-6 py-3 hover:scale-105 transition-transform duration-300 lowercase relative z-50 shadow-lg shadow-white/10"
        >
          join community
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-black/20 backdrop-blur-2xl saturate-150 border border-white/10 shadow-lg shadow-black/20 text-white p-3 rounded-full relative z-50 transition-all duration-300 active:scale-95"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Fullscreen Menu - Glass Effect */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/40 saturate-150 flex flex-col items-center justify-center gap-8"
          >
            {links.map((item, i) => {
              const path = item === 'home' ? '/' : `/${item}`;
              const isActive = location.pathname === path;
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link 
                    to={path} 
                    onClick={() => setIsOpen(false)}
                    className={`text-5xl font-medium tracking-tight lowercase transition-all duration-300 ${isActive ? 'text-white drop-shadow-md' : 'text-white/40 hover:text-white/80'}`}
                  >
                    {item}
                  </Link>
                </motion.div>
              );
            })}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent('openJoinModal'));
              }}
              className="mt-8 bg-white text-black text-lg font-medium rounded-full px-10 py-4 active:scale-95 transition-transform duration-300 lowercase shadow-xl shadow-white/10"
            >
              join community
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
