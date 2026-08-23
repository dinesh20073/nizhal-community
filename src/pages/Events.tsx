import { motion } from 'framer-motion';
import InstagramFeed from '../components/InstagramFeed';
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile.png';

const Events = () => {
  return (
    <div className="relative bg-[#fcfaf8] text-[#2b2622] min-h-screen overflow-hidden">
      {/* Decorative Background Artwork - Responsive for Desktop & Mobile */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet={bodyMobileBgUrl} />
          <img 
            src={bodyBgUrl} 
            alt="Nizhal Events Background" 
            className="w-full h-full object-fill opacity-90"
          />
        </picture>
      </div>

      <section className="relative w-full pt-32 px-6 md:px-10 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mt-12 md:mt-16 mb-12 text-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#2b2622]/50 font-medium block mb-3">
            Moments & Gatherings
          </span>
          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-8xl mb-6 text-[#2b2622]">
            Our Events
          </h1>
          <p className="text-base sm:text-lg text-[#2b2622]/70 max-w-xl mx-auto leading-relaxed">
            Stories, acoustic melodies, mindful waves, and shared presence. Explore our past community chapters below.
          </p>
          <div className="h-px w-32 bg-[#2b2622]/15 mx-auto mt-8"></div>
        </motion.div>
      </section>

      <div className="relative z-10">
        <InstagramFeed />
      </div>
    </div>
  );
};

export default Events;

