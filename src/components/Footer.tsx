import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import logoUrl from '../assets/logo.jpg';
import footerBannerImg from '../assets/ChatGPT Image Aug 22, 2026, 11_02_05 AM.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative overflow-hidden mt-auto border-t border-[#2b2622]/8 text-[#2b2622] bg-[#fbf8f5]">
      {/* Background Banner with exact natural aspect ratio scaling */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img 
          src={footerBannerImg} 
          alt="Nizhal Footer Banner" 
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Main Content Layout - Perfectly Spaced Across the Canvas */}
      <div className="max-w-7xl mx-auto pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 px-3 sm:px-6 md:px-12 lg:px-16 relative z-10 flex flex-col justify-between">
        <div className="grid grid-cols-12 gap-1 sm:gap-4 items-center">
          
          {/* Left Column: Tagline */}
          <div className="col-span-5 flex flex-col items-start text-left pl-0 sm:pl-16 md:pl-28 lg:pl-32">
            <h2 className="font-['Caveat'] text-[#8c3a3a] text-lg sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight mb-1 tracking-tight">
              For the community,<br />
              by the community. <span className="inline-block text-sm sm:text-2xl lg:text-3xl font-normal">♡</span>
            </h2>
          </div>

          {/* Center Column: Nizhal Logo Seal */}
          <div className="col-span-2 flex flex-col items-center justify-center relative">
            <Link to="/" className="group flex flex-col items-center cursor-pointer">
              {/* Circular Logo Frame */}
              <div className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 sm:border-4 border-[#cda2a2] bg-[#f5e6e6]/95 p-0.5 sm:p-1 flex items-center justify-center shadow-md shadow-[#2b2622]/10 transition-transform duration-300 group-hover:scale-105 overflow-hidden backdrop-blur-sm">
                <img 
                  src={logoUrl} 
                  alt="Nizhal Community Logo" 
                  className="w-full h-full rounded-full object-cover select-none" 
                />
              </div>
            </Link>
            <span className="text-[9px] sm:text-xs text-[#2b2622]/60 lowercase mt-1 sm:mt-2 md:absolute md:-bottom-8 lg:-bottom-10 whitespace-nowrap">
              © {currentYear} nizhal
            </span>
          </div>

          {/* Right Column: Stay Connected */}
          <div className="col-span-5 flex flex-col items-end text-right pr-0 sm:pr-8 md:pr-16 lg:pr-24">
            <h3 className="font-['Caveat'] text-[#8c3a3a] text-lg sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 tracking-tight">
              Stay Connected <span className="inline-block font-normal text-sm sm:text-xl">♡</span>
            </h3>

            {/* Social Icon Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 mb-1 sm:mb-2">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/nizhal.community/" 
                target="_blank" 
                rel="noreferrer"
                className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#2b2622] text-white flex items-center justify-center hover:bg-[#522D21] transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://chat.whatsapp.com/DjwhofsCU4M0WAXNTLBzLl" 
                target="_blank" 
                rel="noreferrer"
                className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#2b2622] text-white flex items-center justify-center hover:bg-[#522D21] transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </a>

              {/* Email */}
              <a 
                href="mailto:nizhal.community@gmail.com?subject=Connecting%20with%20Nizhal%20Community" 
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:nizhal.community@gmail.com?subject=Connecting%20with%20Nizhal%20Community";
                }}
                className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#2b2622] text-white flex items-center justify-center hover:bg-[#522D21] transition-colors shadow-sm"
                aria-label="Email"
              >
                <Mail className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              </a>
            </div>

            <p className="text-[9px] sm:text-xs text-[#2b2622]/75 lowercase leading-tight max-w-[130px] sm:max-w-xs">
              follow our journey and be a part of the circle of warmth!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
