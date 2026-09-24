import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const JoinModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('openJoinModal', handleOpen);
    window.addEventListener('openUpcomingEventModal', handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('openJoinModal', handleOpen);
      window.removeEventListener('openUpcomingEventModal', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2b2622]/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#f7f2ea] border border-[#2b2622]/15 rounded-3xl p-7 sm:p-9 shadow-2xl my-auto overflow-hidden text-[#2b2622]"
          >
            {/* Soft Warm Gradient Background Highlight */}
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-[#8c3a3a]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-[#e4be9e]/25 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 flex items-center justify-center rounded-full bg-[#2b2622]/5 hover:bg-[#2b2622]/10 text-[#2b2622]/60 hover:text-[#2b2622] transition-colors z-20 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div className="relative z-10 text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8c3a3a]/10 text-[#8c3a3a] text-xs font-semibold uppercase tracking-wider mb-3">
                ✦ Nizhal Circles
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#2b2622] mb-1">
                Upcoming Event
              </h2>
              <p className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-bold">
                more memories in the making... ♡
              </p>
            </div>

            {/* Next Gathering Coming Soon Card */}
            <div className="relative z-10 bg-white/70 backdrop-blur-sm border border-[#2b2622]/10 rounded-2xl p-5 sm:p-6 shadow-sm mb-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FCEBED] border border-[#522D21]/15 flex items-center justify-center text-[#522D21]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                </svg>
              </div>

              <h3 className="text-xl font-medium text-[#2b2622] mb-3 tracking-tight">
                Next Gathering Coming Soon
              </h3>

              <div className="bg-[#f7f2ea]/90 border border-[#2b2622]/10 rounded-xl px-4 py-3 text-xs text-[#2b2622]/75 leading-relaxed">
                📢 Announcements, dates, and invites are dropped first in our WhatsApp circle and Instagram page.
              </div>
            </div>

            {/* Direct Connect Buttons (Big Icons) */}
            <div className="relative z-10 flex flex-col gap-3 mb-5">
              {/* WhatsApp Button */}
              <a 
                href="https://chat.whatsapp.com/DjwhofsCU4M0WAXNTLBzLl" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 bg-[#25D366]/10 hover:bg-[#25D366] text-[#1b7a3e] hover:text-white border border-[#25D366]/30 px-5 py-3.5 rounded-xl transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold text-sm">Join WhatsApp Circle</span>
                    <span className="block text-xs opacity-75">Get early invites & direct circle updates</span>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>

              {/* Instagram Button */}
              <a 
                href="https://www.instagram.com/nizhal.community/" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 bg-[#d62976]/10 hover:bg-[#d62976] text-[#a02258] hover:text-white border border-[#d62976]/30 px-5 py-3.5 rounded-xl transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#d62976] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold text-sm">Follow on Instagram</span>
                    <span className="block text-xs opacity-75">Stories, scrapbook memories & reels</span>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>

            {/* Note below big icons */}
            <div className="relative z-10 pt-4 border-t border-[#2b2622]/10 text-center">
              <p className="text-[#2b2622]/60 text-xs italic tracking-wide">
                Your presence is a gift. Step into our world whenever you're ready.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JoinModal;
