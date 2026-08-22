import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import logoUrl from '../assets/logo.jpg';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = ["home", "about", "events", "contact"];

  return (
    <>
      <nav className="fixed z-50 px-6 md:px-10 pt-6 top-0 left-0 right-0 flex items-center justify-between gap-4 pointer-events-auto">
        {/* Left pill */}
        <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 bg-[#fcfaf8]/90 backdrop-blur-xl border border-[#2b2622]/15 shadow-md shadow-[#403a35]/10 rounded-full pl-3 pr-6 py-2 relative z-50 transition-all duration-300 hover:bg-[#fcfaf8]">
          <img src={logoUrl} alt="Nizhal Logo" className="h-7 w-7 rounded-[25%] object-cover" />
          <span className="text-[#2b2622] text-sm font-semibold tracking-wide lowercase">nizhal community</span>
        </Link>

        {/* Center pill (Desktop) - High Visibility Glass Effect */}
        <div className="hidden md:flex items-center gap-1 bg-[#fcfaf8]/90 backdrop-blur-xl border border-[#2b2622]/15 shadow-md shadow-[#403a35]/10 rounded-full p-1.5 relative">
          {links.map((item) => {
            const path = item === 'home' ? '/' : `/${item}`;
            const isActive = location.pathname === path;
            return (
              <Link
                key={item}
                to={path}
                className={`relative px-5 py-2 rounded-full text-sm lowercase transition-all duration-200 ease-out z-10 font-medium ${
                  isActive 
                    ? 'text-[#2b2622] font-semibold' 
                    : 'text-[#2b2622]/75 hover:text-[#2b2622] hover:bg-[#2b2622]/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-[#ebe3d9] rounded-full -z-10 shadow-sm border border-[#2b2622]/5"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
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
          className="hidden md:block bg-[#FCEBED] text-[#522D21] border border-[#522D21]/20 text-sm font-semibold rounded-full px-6 py-3 hover:scale-105 hover:bg-[#f6dbe0] transition-all duration-300 lowercase relative z-50 shadow-md shadow-[#522D21]/10 cursor-pointer"
        >
          join community
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-[#fcfaf8]/90 backdrop-blur-xl border border-[#2b2622]/15 shadow-md shadow-[#403a35]/10 text-[#2b2622] p-3 rounded-full relative z-50 transition-all duration-300 active:scale-95"
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#fcfaf8]/80 backdrop-blur-2xl saturate-150 flex flex-col items-center justify-center gap-8"
          >
            {links.map((item) => {
              const path = item === 'home' ? '/' : `/${item}`;
              const isActive = location.pathname === path;
              return (
                <div key={item}>
                  <Link
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`text-5xl font-medium tracking-tight lowercase transition-colors duration-200 ${isActive ? 'text-[#2b2622] font-semibold' : 'text-[#2b2622]/50 hover:text-[#2b2622]'}`}
                  >
                    {item}
                  </Link>
                </div>
              );
            })}
            <button
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent('openJoinModal'));
              }}
              className="mt-8 bg-[#FCEBED] text-[#522D21] border border-[#522D21]/20 text-lg font-semibold rounded-full px-10 py-4 hover:bg-[#f6dbe0] transition-colors duration-200 lowercase shadow-lg shadow-[#522D21]/10 cursor-pointer"
            >
              join community
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
