import { Link } from 'react-router-dom';
import { Heart, Users, Calendar, Image as ImageIcon, Mail } from 'lucide-react';
import logoUrl from '../assets/logo.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#fcfaf8] border-t border-[#2b2622]/8 text-[#2b2622] relative overflow-hidden mt-auto pt-16 pb-10 px-6 md:px-12 lg:px-20">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Community Message & Hand Illustration */}
        <div className="md:col-span-4 flex flex-col items-start text-left">
          <h2 className="font-['Caveat'] text-[#8c3a3a] text-4xl sm:text-5xl font-bold leading-none mb-3 tracking-tight">
            For the community,<br />
            by the community. <span className="inline-block text-3xl font-normal">♡</span>
          </h2>
          <p className="text-sm text-[#2b2622]/70 lowercase leading-relaxed max-w-sm mb-6">
            together we create a circle of warmth, kindness, and belonging.
          </p>

          {/* Diverse Hands Reaching Up Illustration */}
          <div className="w-full max-w-[280px] h-20 relative flex items-end">
            <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible" fill="none">
              {/* Little floating hearts and botanical accents */}
              <circle cx="35" cy="40" r="3" fill="#e29b9b" />
              <path d="M75 25 C75 20, 85 20, 85 28 C85 36, 75 42, 75 42 C75 42, 65 36, 65 28 C65 20, 75 20, 75 25 Z" fill="#d97a7a" transform="scale(0.5) translate(60, 10)" />
              <path d="M190 20 C190 15, 200 15, 200 23 C200 31, 190 37, 190 37 C190 37, 180 31, 180 23 C180 15, 190 15, 190 20 Z" fill="#d97a7a" transform="scale(0.5) translate(220, 5)" />
              <circle cx="260" cy="50" r="3.5" fill="#e29b9b" />
              <circle cx="280" cy="35" r="2.5" fill="#c47c7c" />

              {/* Hand 1 (Warm tan) */}
              <g transform="translate(30, 45)">
                <path d="M10 70 L10 25 C10 20 18 20 18 25 L18 15 C18 10 26 10 26 15 L26 20 C26 15 34 15 34 20 L34 25 C34 20 42 20 42 25 L42 70 Z" fill="#c49a75" />
                <path d="M8 40 C4 35 2 30 0 35 C-2 40 5 50 10 55" stroke="#c49a75" strokeWidth="6" strokeLinecap="round" />
                {/* Heart on palm */}
                <path d="M26 42 C26 38, 31 38, 31 43 C31 47, 26 51, 26 51 C26 51, 21 47, 21 43 C21 38, 26 38, 26 42 Z" fill="#8c3a3a" />
              </g>

              {/* Hand 2 (Deep brown) */}
              <g transform="translate(75, 25)">
                <path d="M10 90 L10 25 C10 20 18 20 18 25 L18 15 C18 10 26 10 26 15 L26 20 C26 15 34 15 34 20 L34 25 C34 20 42 20 42 25 L42 90 Z" fill="#6e4f3a" />
                <path d="M8 45 C4 40 2 35 0 40 C-2 45 5 55 10 60" stroke="#6e4f3a" strokeWidth="6" strokeLinecap="round" />
                <path d="M26 45 C26 41, 31 41, 31 46 C31 50, 26 54, 26 54 C26 54, 21 50, 21 46 C21 41, 26 41, 26 45 Z" fill="#d97a7a" />
              </g>

              {/* Hand 3 (Fair/Peach) */}
              <g transform="translate(125, 48)">
                <path d="M10 65 L10 22 C10 18 17 18 17 22 L17 12 C17 8 24 8 24 12 L24 17 C24 13 31 13 31 17 L31 22 C31 18 38 18 38 22 L38 65 Z" fill="#dfbe9f" />
                <path d="M8 35 C4 30 2 25 0 30 C-2 35 5 45 10 50" stroke="#dfbe9f" strokeWidth="5" strokeLinecap="round" />
                <path d="M24 38 C24 35, 28 35, 28 39 C28 43, 24 46, 24 46 C24 46, 20 43, 20 39 C20 35, 24 35, 24 38 Z" fill="#8c3a3a" />
              </g>

              {/* Hand 4 (Warm almond) */}
              <g transform="translate(165, 30)">
                <path d="M10 85 L10 25 C10 20 18 20 18 25 L18 15 C18 10 26 10 26 15 L26 20 C26 15 34 15 34 20 L34 25 C34 20 42 20 42 25 L42 85 Z" fill="#a87957" />
                <path d="M8 45 C4 40 2 35 0 40 C-2 45 5 55 10 60" stroke="#a87957" strokeWidth="6" strokeLinecap="round" />
                <path d="M26 45 C26 41, 31 41, 31 46 C31 50, 26 54, 26 54 C26 54, 21 50, 21 46 C21 41, 26 41, 26 45 Z" fill="#d97a7a" />
              </g>

              {/* Hand 5 (Soft terracotta) */}
              <g transform="translate(210, 42)">
                <path d="M10 75 L10 25 C10 20 18 20 18 25 L18 15 C18 10 26 10 26 15 L26 20 C26 15 34 15 34 20 L34 25 C34 20 42 20 42 25 L42 75 Z" fill="#cfa584" />
                <path d="M8 40 C4 35 2 30 0 35 C-2 40 5 50 10 55" stroke="#cfa584" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M26 40 C26 36, 31 36, 31 41 C31 45, 26 49, 26 49 C26 49, 21 45, 21 41 C21 36, 26 36, 26 40 Z" fill="#8c3a3a" />
              </g>

              {/* Botanical leaves accent */}
              <path d="M260 105 Q275 80 270 65 Q285 85 285 105" fill="#a4b39b" opacity="0.8" />
              <path d="M15 105 Q5 85 15 70 Q20 90 25 105" fill="#a4b39b" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Middle Column 1: Navigation Links with Icons */}
        <div className="md:col-span-3 md:border-l md:border-[#2b2622]/10 md:pl-8 lg:pl-10 flex flex-col justify-center space-y-4 text-left">
          <Link 
            to="/about" 
            className="flex items-center gap-3.5 text-sm text-[#2b2622]/80 hover:text-[#522D21] transition-colors group lowercase"
          >
            <Heart className="w-4 h-4 text-[#8c3a3a] group-hover:scale-110 transition-transform" />
            <span>about us</span>
          </Link>

          <Link 
            to="/about" 
            className="flex items-center gap-3.5 text-sm text-[#2b2622]/80 hover:text-[#522D21] transition-colors group lowercase"
          >
            <Users className="w-4 h-4 text-[#8c3a3a] group-hover:scale-110 transition-transform" />
            <span>our mission</span>
          </Link>

          <Link 
            to="/events" 
            className="flex items-center gap-3.5 text-sm text-[#2b2622]/80 hover:text-[#522D21] transition-colors group lowercase"
          >
            <Calendar className="w-4 h-4 text-[#8c3a3a] group-hover:scale-110 transition-transform" />
            <span>events</span>
          </Link>

          <a 
            href="https://www.instagram.com/nizhal.community/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3.5 text-sm text-[#2b2622]/80 hover:text-[#522D21] transition-colors group lowercase"
          >
            <ImageIcon className="w-4 h-4 text-[#8c3a3a] group-hover:scale-110 transition-transform" />
            <span>gallery</span>
          </a>

          <Link 
            to="/contact" 
            className="flex items-center gap-3.5 text-sm text-[#2b2622]/80 hover:text-[#522D21] transition-colors group lowercase"
          >
            <Mail className="w-4 h-4 text-[#8c3a3a] group-hover:scale-110 transition-transform" />
            <span>contact us</span>
          </Link>
        </div>

        {/* Middle Column 2: Nizhal Community Logo Image */}
        <div className="md:col-span-2 flex flex-col items-center justify-center">
          <Link to="/" className="group flex flex-col items-center cursor-pointer">
            {/* Circular Logo Frame */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#cda2a2] bg-[#f5e6e6]/60 p-1 flex items-center justify-center shadow-md shadow-[#2b2622]/5 transition-transform duration-300 group-hover:scale-105 overflow-hidden">
              <img 
                src={logoUrl} 
                alt="Nizhal Community Logo" 
                className="w-full h-full rounded-full object-cover select-none" 
              />
            </div>

            {/* Decorative Ribbon Loop Underneath with Warmth Text */}
            <div className="flex flex-col items-center -mt-1">
              <svg width="36" height="16" viewBox="0 0 36 16" fill="none">
                <path d="M10 0 Q18 14 26 0 Q22 18 14 16 Q10 12 10 0" fill="#cda2a2" opacity="0.8" />
                <path d="M14 2 Q18 16 22 2" stroke="#7a3535" strokeWidth="1.2" fill="none" />
              </svg>
              <span className="font-['Caveat'] text-[#7a3535] text-sm sm:text-base font-semibold tracking-wide lowercase group-hover:text-[#522D21] transition-colors -mt-1">
                circle of warmth
              </span>
            </div>
          </Link>
        </div>

        {/* Right Column: Stay Connected & Social Links */}
        <div className="md:col-span-3 md:border-l md:border-[#2b2622]/10 md:pl-8 lg:pl-10 flex flex-col items-start text-left">
          <h3 className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Stay Connected <span className="inline-block font-normal">♡</span>
          </h3>

          {/* Social Icon Pills */}
          <div className="flex items-center gap-3 mb-4">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/nizhal.community/" 
              target="_blank" 
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#2b2622] text-white flex items-center justify-center hover:bg-[#522D21] transition-colors shadow-sm"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://chat.whatsapp.com/DjwhofsCU4M0WAXNTLBzLl" 
              target="_blank" 
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#2b2622] text-white flex items-center justify-center hover:bg-[#522D21] transition-colors shadow-sm"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
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
              className="w-8 h-8 rounded-full bg-[#2b2622] text-white flex items-center justify-center hover:bg-[#522D21] transition-colors shadow-sm"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-[#2b2622]/70 lowercase leading-relaxed max-w-xs">
            follow our journey and be a part of the circle of warmth!
          </p>
        </div>
      </div>

      {/* Dotted Connecting Thread with Floating Loop & Community Illustration */}
      <div className="w-full relative my-8 min-h-[70px] flex items-center">
        {/* Continuous Dotted Connecting Path */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full pointer-events-none overflow-hidden h-16 flex items-center">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path 
              d="M 0 30 Q 300 20 570 30 C 585 20, 595 10, 600 20 C 605 10, 615 20, 630 30 Q 900 40 1200 25" 
              fill="none" 
              stroke="#d8a4a4" 
              strokeWidth="1.5" 
              strokeDasharray="4 4" 
            />
            {/* Heart loop in center */}
            <path 
              d="M600 28 C600 22, 608 18, 614 24 C620 30, 600 40, 600 40 C600 40, 580 30, 586 24 C592 18, 600 22, 600 28 Z" 
              fill="none" 
              stroke="#d8a4a4" 
              strokeWidth="1.5" 
              strokeDasharray="3 3"
            />
          </svg>
        </div>

        {/* Right-aligned Community Friends Illustration */}
        <div className="ml-auto relative z-10 pr-4 sm:pr-8 pointer-events-none">
          <svg viewBox="0 0 160 80" className="w-32 sm:w-40 h-auto overflow-visible" fill="none">
            {/* Floating heart above heads */}
            <path d="M80 12 C80 6, 88 6, 88 13 C88 20, 80 25, 80 25 C80 25, 72 20, 72 13 C72 6, 80 6, 80 12 Z" fill="#d97a7a" />

            {/* Friend 1 (Left - Woman with dark hair & rose top) */}
            <circle cx="50" cy="38" r="10" fill="#dfbe9f" />
            <path d="M40 38 Q50 24 60 38 Q56 46 40 44 Z" fill="#362923" />
            <path d="M38 75 C38 52 62 52 62 75 Z" fill="#cf8d8d" />

            {/* Friend 2 (Center - Sage green top) */}
            <circle cx="80" cy="36" r="9" fill="#cfa584" />
            <path d="M72 35 Q80 24 88 35 Q86 44 72 42 Z" fill="#4a3b32" />
            <path d="M68 75 C68 50 92 50 92 75 Z" fill="#8f9f87" />

            {/* Friend 3 (Right - Warm sand top) */}
            <circle cx="110" cy="34" r="10" fill="#c49a75" />
            <path d="M100 32 Q110 20 120 32 Q118 42 100 40 Z" fill="#2b2622" />
            <path d="M98 75 C98 48 122 48 122 75 Z" fill="#cfad8d" />

            {/* Intertwined arms / warmth */}
            <path d="M50 56 Q80 60 110 56" stroke="#c49a75" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Bottom Sub-footer Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-[#2b2622]/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#2b2622]/50 lowercase">
        <span>
          © {currentYear} nizhal – circle of warmth. all rights reserved.
        </span>
        <div className="flex items-center gap-1.5 text-[#2b2622]/60">
          <span>made with</span>
          <span className="text-[#8c3a3a] text-sm">♥</span>
          <span>by our community</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
