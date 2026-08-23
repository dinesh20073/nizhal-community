import { motion } from 'framer-motion';

export interface EventItem {
  id: number;
  number: string;
  title: string;
  tag: string;
  link: string;
  description: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 1,
    number: "01",
    title: "Human. Stories. Connection.",
    tag: "Community Circle",
    link: "https://www.instagram.com/p/DVl32cQgIUO/",
    description: "A heartwarming space for vulnerability, deep listening, and discovering our shared human stories."
  },
  {
    id: 2,
    number: "02",
    title: "Stones and Stories",
    tag: "Creative Keepsakes",
    link: "https://www.instagram.com/p/DVl-pExEzr7/",
    description: "Painting memories onto smooth stones, creating tangible symbols of our collective journeys."
  },
  {
    id: 3,
    number: "03",
    title: "Strokes and Chords",
    tag: "Art & Music",
    link: "https://www.instagram.com/reel/DXrp4wBAKt7/",
    description: "An evening of gentle acoustic chords, expressive paintbrush strokes, and soothing harmony."
  },
  {
    id: 4,
    number: "04",
    title: "Breathe with the Wave",
    tag: "Beach Mindfulness",
    link: "https://www.instagram.com/reel/DXo0AIezkxv/",
    description: "Seashore calm, guided group breathwork, and finding peace alongside the rhythmic ocean tides."
  },
  {
    id: 5,
    number: "05",
    title: "The Colour Chase",
    tag: "Interactive Fun",
    link: "https://www.instagram.com/reel/DXmbIQmANMO/",
    description: "Playful challenges, outdoor camaraderie, and spontaneous moments of laughter under the sky."
  },
  {
    id: 6,
    number: "06",
    title: "Shades of Us",
    tag: "Identity & Voices",
    link: "https://www.instagram.com/reel/DXXFrAdgPvE/",
    description: "Reflecting on individual journeys, embracing different viewpoints, and celebrating all our unique shades."
  },
  {
    id: 7,
    number: "07",
    title: "Bracelets & Besties",
    tag: "Craft & Friendship",
    link: "https://www.instagram.com/reel/DXHevLgki0u/",
    description: "Handcrafting woven friendship bands, sharing beads, and building enduring bonds of warmth."
  }
];

const InstagramFeed = () => {
  return (
    <section className="pb-32 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS_DATA.map((event, i) => {
          const embedUrl = event.link.endsWith('/') ? `${event.link}embed` : `${event.link}/embed`;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between bg-[#ede4d8]/90 backdrop-blur-md border border-[#2b2622]/15 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Header Info: Number & Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-['Caveat'] text-[#8c3a3a] text-2xl font-bold">
                  #{event.number}
                </span>
                <span className="text-[11px] font-medium tracking-wide uppercase px-3 py-1 rounded-full bg-[#fcfaf8] border border-[#2b2622]/10 text-[#2b2622]/70">
                  {event.tag}
                </span>
              </div>

              {/* Instagram Embedded Media Reel/Post */}
              <div 
                className="relative w-full overflow-hidden rounded-2xl bg-[#dfd3c3] border border-[#2b2622]/10 mb-5 shadow-inner"
                style={{ aspectRatio: '4/5' }}
              >
                <div className="absolute w-full h-full pointer-events-none z-10 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]" />
                <iframe 
                  src={embedUrl} 
                  title={event.title}
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  allow="encrypted-media"
                  className="absolute pointer-events-auto"
                  style={{ 
                    top: '-54px', 
                    left: '-2px', 
                    width: 'calc(100% + 4px)', 
                    height: 'calc(100% + 56px)'
                  }}
                />
              </div>

              {/* Event Content & Action Link */}
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-medium text-[#2b2622] tracking-tight mb-2 group-hover:text-[#8c3a3a] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2b2622]/70 leading-relaxed mb-5 font-normal">
                    {event.description}
                  </p>
                </div>

                <a 
                  href={event.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#fcfaf8] text-[#522D21] border border-[#522D21]/20 hover:bg-[#FCEBED] hover:border-[#522D21]/40 transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <span>View on Instagram</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Bottom Hub Invitation Button */}
      <div className="mt-20 flex flex-col items-center text-center max-w-md mx-auto">
        <h4 className="text-2xl font-['Caveat'] text-[#8c3a3a] font-bold mb-2">
          Come be a part of our next circle ♡
        </h4>
        <p className="text-xs sm:text-sm text-[#2b2622]/70 leading-relaxed mb-6">
          Follow our updates on Instagram to stay informed about upcoming meetups, outdoor walks, and private sessions.
        </p>
        <a 
          href="https://www.instagram.com/nizhal.community/" 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#FCEBED] text-[#522D21] border border-[#522D21]/20 font-semibold px-9 py-4 rounded-full hover:bg-[#f6dbe0] hover:scale-105 transition-all shadow-md shadow-[#522D21]/10 cursor-pointer text-sm"
        >
          Follow @nizhal.community
        </a>
      </div>
    </section>
  );
};

export default InstagramFeed;
