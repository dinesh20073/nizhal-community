import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import logoUrl from '../assets/logo.jpg';

interface NavItem {
  name: string;
  path: string;
  hasIcon?: boolean;
}

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Media", path: "/media", hasIcon: true },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="fixed z-50 px-6 md:px-10 pt-6 top-0 left-0 right-0 flex items-center justify-between gap-4 pointer-events-auto">
        {/* Left pill */}
        <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 bg-[#fcfaf8]/90 backdrop-blur-xl border border-[#2b2622]/15 shadow-md shadow-[#403a35]/10 rounded-full pl-3 pr-6 py-2 relative z-50 transition-all duration-300 hover:bg-[#fcfaf8]">
          <img src={logoUrl} alt="Nizhal Logo" className="h-7 w-7 rounded-[25%] object-cover" />
          <span className="text-[#2b2622] text-sm font-semibold tracking-wide">Nizhal Community</span>
        </Link>

        {/* Center pill (Desktop) - Always Dead Center */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-[#fcfaf8]/90 backdrop-blur-xl border border-[#2b2622]/15 shadow-md shadow-[#403a35]/10 rounded-full p-1.5 z-40">
          {links.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-sm transition-all duration-200 ease-out z-10 font-medium ${
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
                {item.hasIcon && (
                  <Camera className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'text-[#8c3a3a] scale-110' : 'text-[#8c3a3a]/70 group-hover:scale-105'}`} />
                )}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-[#fcfaf8]/90 backdrop-blur-xl border border-[#2b2622]/15 shadow-md shadow-[#403a35]/10 text-[#2b2622] p-3 rounded-full relative z-50 transition-all duration-300 active:scale-95"
          aria-label="Toggle Navigation Menu"
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
              const isActive = location.pathname === item.path;
              return (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 text-4xl sm:text-5xl font-medium tracking-tight transition-colors duration-200 ${isActive ? 'text-[#2b2622] font-semibold' : 'text-[#2b2622]/50 hover:text-[#2b2622]'}`}
                  >
                    {item.hasIcon && (
                      <Camera className="w-8 h-8 text-[#8c3a3a]" />
                    )}
                    <span>{item.name}</span>
                  </Link>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
