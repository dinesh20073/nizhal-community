import { Link } from 'react-router-dom';
import footerFixedImgUrl from '../assets/footer-fixed.png';

const Footer = () => {
  return (
    <footer className="w-full bg-[#fdf9f7] border-t border-[#2b2622]/8 relative overflow-hidden mt-auto py-4 sm:py-6 px-3 sm:px-6 flex justify-center">
      {/* Fixed Image Container with Natural Proportions */}
      <div className="relative w-full max-w-5xl select-none">
        {/* The Exact Footer Artwork */}
        <img 
          src={footerFixedImgUrl} 
          alt="Nizhal Community Footer" 
          className="w-full h-auto object-contain block drop-shadow-sm rounded-xl"
        />

        {/* Interactive Clickable Hotspots overlaying the exact artwork */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          {/* Navigation Links */}
          <Link 
            to="/about" 
            className="absolute left-[34%] top-[17%] w-[12%] h-[9%] rounded hover:bg-[#522D21]/10 transition-colors cursor-pointer"
            aria-label="About Us"
          />
          <Link 
            to="/about" 
            className="absolute left-[34%] top-[27%] w-[12%] h-[9%] rounded hover:bg-[#522D21]/10 transition-colors cursor-pointer"
            aria-label="Our Mission"
          />
          <Link 
            to="/events" 
            className="absolute left-[34%] top-[37%] w-[12%] h-[9%] rounded hover:bg-[#522D21]/10 transition-colors cursor-pointer"
            aria-label="Events"
          />
          <a 
            href="https://www.instagram.com/nizhal.community/" 
            target="_blank" 
            rel="noreferrer"
            className="absolute left-[34%] top-[47%] w-[12%] h-[9%] rounded hover:bg-[#522D21]/10 transition-colors cursor-pointer"
            aria-label="Gallery"
          />
          <Link 
            to="/contact" 
            className="absolute left-[34%] top-[57%] w-[12%] h-[9%] rounded hover:bg-[#522D21]/10 transition-colors cursor-pointer"
            aria-label="Contact Us"
          />

          {/* Center Logo */}
          <Link 
            to="/" 
            className="absolute left-[51%] top-[16%] w-[16%] h-[50%] rounded-full hover:scale-105 transition-transform cursor-pointer"
            aria-label="Nizhal Home"
          />

          {/* Social Links */}
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/nizhal.community/" 
            target="_blank" 
            rel="noreferrer"
            className="absolute left-[75.2%] top-[31%] w-[3.5%] h-[9.5%] rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Instagram"
          />

          {/* Email */}
          <a 
            href="mailto:nizhal.community@gmail.com?subject=Connecting%20with%20Nizhal%20Community" 
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "mailto:nizhal.community@gmail.com?subject=Connecting%20with%20Nizhal%20Community";
            }}
            className="absolute left-[79.2%] top-[31%] w-[3.5%] h-[9.5%] rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Email"
          />

          {/* WhatsApp */}
          <a 
            href="https://chat.whatsapp.com/DjwhofsCU4M0WAXNTLBzLl" 
            target="_blank" 
            rel="noreferrer"
            className="absolute left-[83.2%] top-[31%] w-[3.5%] h-[9.5%] rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="WhatsApp"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
