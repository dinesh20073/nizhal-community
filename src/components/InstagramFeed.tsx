import { motion } from 'framer-motion';

const INSTAGRAM_LINKS = [
  'https://www.instagram.com/p/DVl32cQgIUO/',
  'https://www.instagram.com/reel/DWwIdBPACQC/',
  'https://www.instagram.com/p/DVl-pExEzr7/',
  'https://www.instagram.com/reel/DXrp4wBAKt7/',
  'https://www.instagram.com/reel/DXo0AIezkxv/',
  'https://www.instagram.com/reel/DXmbIQmANMO/',
  'https://www.instagram.com/reel/DXXFrAdgPvE/',
  'https://www.instagram.com/reel/DXHevLgki0u/',
];

const InstagramFeed = () => {
  return (
    <section className="pb-32 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {INSTAGRAM_LINKS.map((link, i) => {
          // ensure the url formats correctly for embedding
          const embedUrl = link.endsWith('/') ? `${link}embed` : `${link}/embed`;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-full overflow-hidden rounded-3xl bg-neutral-900 border border-white/10"
              style={{ aspectRatio: '4/5' }}
            >
              <div className="absolute w-full h-full pointer-events-none z-10 rounded-3xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
              <iframe 
                src={embedUrl} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                allowTransparency={true} 
                allow="encrypted-media"
                className="absolute"
                style={{ 
                  top: '-54px', 
                  left: '-2px', 
                  width: 'calc(100% + 4px)', 
                  height: 'calc(100% + 56px)',
                  pointerEvents: 'auto'
                }}
              />
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-16 flex justify-center">
        <a 
          href="https://www.instagram.com/nizhal.community/" 
          target="_blank" 
          rel="noreferrer"
          className="bg-white text-black font-medium px-8 py-4 rounded-full hover:bg-neutral-200 transition-colors lowercase"
        >
          view more on instagram
        </a>
      </div>
    </section>
  );
};

export default InstagramFeed;
