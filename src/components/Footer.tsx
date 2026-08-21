import { motion } from 'framer-motion';
import logoUrl from '../assets/logo.png';
import SocialCard from './SocialCard';

const Footer = () => {
  return (
    <footer className="w-full bg-[#fcfaf8] border-t border-[#2b2622]/10 pt-7 pb-4 px-6 md:px-12 lg:px-16 text-[#2b2622] relative overflow-hidden z-10 mt-auto select-none">
      
      {/* 3-Section Main Row */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center pb-4">
        
        {/* Left Column: Headline with Script & Subtitle */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <div className="flex items-center gap-1.5">
            <h3 className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight tracking-wide">
              For the community, <br className="hidden sm:inline" />by the community.
            </h3>
            <span className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-normal self-start mt-0.5">
              ♡
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-[#4a3f35]/80 font-normal leading-relaxed mt-1.5 max-w-sm">
            Together we create a circle of warmth, kindness, and belonging.
          </p>
        </motion.div>

        {/* Center Column: Clean Big Nizhal Logo */}
        <div className="md:col-span-2 flex items-center justify-center relative py-1">
          {/* Clean Big Circular Logo */}
          <img 
            src={logoUrl} 
            alt="Nizhal: Circle of Warmth" 
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain select-none"
          />
        </div>

        {/* Right Column: Stay Connected with Script Title & Socials */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right relative"
        >
          <div className="flex items-center gap-1.5">
            <h3 className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl lg:text-[30px] font-bold leading-tight tracking-wide">
              Stay Connected
            </h3>
            <span className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-normal self-center">
              ♡
            </span>
          </div>

          {/* Social Icons */}
          <div className="my-1.5">
            <SocialCard />
          </div>

          <p className="text-xs sm:text-[13px] text-[#4a3f35]/80 font-normal leading-relaxed max-w-xs">
            Follow our journey and be a part of the circle of warmth!
          </p>
        </motion.div>

      </div>

      {/* Bottom Bar: Centered Copyright Text */}
      <div className="max-w-7xl mx-auto pt-3 border-t border-[#2b2622]/5 flex items-center justify-center text-center text-[12px] text-[#2b2622]/60 font-normal lowercase tracking-wide">
        <p>
          © 2026 nizhal : circle of warmth
        </p>
      </div>

    </footer>
  );
};

export default Footer;



