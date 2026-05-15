import { motion } from 'framer-motion';

const Events = () => {
  const instagramLinks = [
    "https://www.instagram.com/p/DVl32cQgIUO/",
    "https://www.instagram.com/reel/DWwIdBPACQC/",
    "https://www.instagram.com/p/DVl-pExEzr7/",
    "https://www.instagram.com/reel/DXrp4wBAKt7/",
    "https://www.instagram.com/reel/DXo0AIezkxv/",
    "https://www.instagram.com/reel/DXmbIQmANMO/",
    "https://www.instagram.com/reel/DXXFrAdgPvE/",
    "https://www.instagram.com/reel/DXHevLgki0u/"
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen w-full bg-white pt-32 px-6 md:px-10 text-black pb-20">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h1 className="hero-title font-medium text-6xl md:text-8xl mb-4 lowercase">
              events
            </h1>
            <p className="text-xl text-black/50 lowercase max-w-md leading-relaxed">
              latest posts and reels from nizhal community.
            </p>
          </div>
          <a 
            href="https://www.instagram.com/nizhal.community/" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-sm lowercase border border-black/10 rounded-full px-6 py-3 hover:bg-black hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            view more on instagram
          </a>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {instagramLinks.map((url, index) => {
            const cleanUrl = url.split('?')[0];
            const embedUrl = cleanUrl.endsWith('/') ? `${cleanUrl}embed` : `${cleanUrl}/embed`;

            return (
              <motion.div 
                key={index} 
                variants={itemFade} 
                className="w-full bg-neutral-100 border border-black/10 rounded-3xl overflow-hidden hover:border-black/20 transition-colors shadow-2xl shadow-white/50"
              >
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="450"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media"
                  className="bg-white object-cover w-full scale-[1.01]"
                ></iframe>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
