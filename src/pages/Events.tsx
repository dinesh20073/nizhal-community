import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Local Video Assets
import activeListeningVideoUrl from '../assets/active-listening.mp4';
import safeSpacesVideoUrl from '../assets/safe-spaces.mp4';
import sharedPresenceVideoUrl from '../assets/shared-presence.mp4';
import aboutVideoUrl from '../assets/about-bg.mp4';

// Local Artwork Assets
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile.png';

export interface EventCard {
  id: number;
  number: string;
  title: string;
  tag: string;
  mediaType: 'video' | 'image';
  mediaSrc: string;
  description: string;
  quote: string;
  aspect: string;
  rotation?: string;
  tape?: boolean;
  link: string;
}

const EVENTS_PINS: EventCard[] = [
  {
    id: 1,
    number: "01",
    title: "Human. Stories. Connection.",
    tag: "Community Circle",
    mediaType: "video",
    mediaSrc: activeListeningVideoUrl,
    description: "An intimate circle where we sat together to share personal stories, practice active listening, and create genuine bonds without pretense.",
    quote: "“When you speak and someone truly listens, the world feels lighter.”",
    aspect: "aspect-[3/4]",
    rotation: "-rotate-1",
    tape: true,
    link: "https://www.instagram.com/p/DVl32cQgIUO/"
  },
  {
    id: 2,
    number: "02",
    title: "Stones and Stories",
    tag: "Creative Keepsakes",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    description: "Gathering by the sea to paint meaningful memories onto smooth stones—turning moments into physical keepsakes.",
    quote: "“A stone carved by waves, painted with memories.”",
    aspect: "aspect-[4/5]",
    rotation: "rotate-1",
    tape: true,
    link: "https://www.instagram.com/p/DVl-pExEzr7/"
  },
  {
    id: 3,
    number: "03",
    title: "Strokes and Chords",
    tag: "Art & Music",
    mediaType: "video",
    mediaSrc: sharedPresenceVideoUrl,
    description: "An open evening of acoustic guitar melodies, canvas painting, and shared artistic expression beneath the sunset.",
    quote: "“Where music paints the silence and colors sing.”",
    aspect: "aspect-[3/4]",
    rotation: "-rotate-2",
    tape: true,
    link: "https://www.instagram.com/reel/DXrp4wBAKt7/"
  },
  {
    id: 4,
    number: "04",
    title: "Breathe with the Wave",
    tag: "Beach Mindfulness",
    mediaType: "video",
    mediaSrc: aboutVideoUrl,
    description: "Early morning beachside breathwork. Aligning our rhythm to the gentle ocean waves and soaking in the morning breeze.",
    quote: "“Inhale peace from the ocean breeze, exhale the noise.”",
    aspect: "aspect-[4/5]",
    rotation: "rotate-2",
    tape: true,
    link: "https://www.instagram.com/reel/DXo0AIezkxv/"
  },
  {
    id: 5,
    number: "05",
    title: "The Colour Chase",
    tag: "Interactive Fun",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80",
    description: "Playful challenges, outdoor team quests, and spontaneous laughter under the open sky to bring out our inner child.",
    quote: "“Laughter is the shortest distance between two hearts.”",
    aspect: "aspect-[3/4]",
    rotation: "-rotate-1",
    tape: true,
    link: "https://www.instagram.com/reel/DXmbIQmANMO/"
  },
  {
    id: 6,
    number: "06",
    title: "Shades of Us",
    tag: "Identity & Voices",
    mediaType: "video",
    mediaSrc: safeSpacesVideoUrl,
    description: "Reflecting on our varied personal journeys, exploring identity, and celebrating the unique perspectives we each bring.",
    quote: "“Every shade of your story deserves to be heard with warmth.”",
    aspect: "aspect-[4/5]",
    rotation: "rotate-1",
    tape: true,
    link: "https://www.instagram.com/reel/DXXFrAdgPvE/"
  },
  {
    id: 7,
    number: "07",
    title: "Bracelets & Besties",
    tag: "Craft & Friendship",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80",
    description: "Weaving friendship bands, sharing colored beads, and exchanging warm handmade tokens of appreciation.",
    quote: "“Woven with threads of laughter, sealed with kindness.”",
    aspect: "aspect-square",
    rotation: "-rotate-2",
    tape: true,
    link: "https://www.instagram.com/reel/DXHevLgki0u/"
  },
  {
    id: 8,
    number: "✦",
    title: "Quiet Beachside Gatherings",
    tag: "Candid Moments",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    description: "Unfiltered conversations by the shore. Sitting beside good people who listen without judgment.",
    quote: "“You are never alone in the shadow. ♡”",
    aspect: "aspect-[4/5]",
    rotation: "rotate-1",
    tape: true,
    link: "https://www.instagram.com/nizhal.community/"
  },
  {
    id: 9,
    number: "✦",
    title: "Campfire & Warm Chai",
    tag: "Night Circles",
    mediaType: "image",
    mediaSrc: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
    description: "Evening stars, crackling wood fire, and warm tea under the night sky.",
    quote: "“Shared silence speaks louder than words.”",
    aspect: "aspect-[3/4]",
    rotation: "-rotate-1",
    tape: true,
    link: "https://www.instagram.com/nizhal.community/"
  }
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventCard | null>(null);

  return (
    <div className="relative bg-[#fcfaf8] text-[#2b2622] min-h-screen overflow-x-hidden">
      {/* Background Decorative Wallpaper */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-25">
        <picture>
          <source media="(max-width: 768px)" srcSet={bodyMobileBgUrl} />
          <img 
            src={bodyBgUrl} 
            alt="Background Artwork" 
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-[#fcfaf8]/85 pointer-events-none" />
      </div>

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        
        {/* Clean Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs uppercase tracking-widest text-[#522D21]/70 font-semibold block mb-3">
            Moments & Visual Diary
          </span>
          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-8xl mb-4 text-[#2b2622] tracking-tight">
            Our Events
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#2b2622]/75 max-w-xl mx-auto leading-relaxed font-normal">
            A scrapbook of our community gatherings, seaside breathwork, acoustic sessions, and shared memories.
          </p>
        </motion.div>

        {/* Pinterest-Style Masonry Wall */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-7 space-y-7">
          {EVENTS_PINS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => setSelectedEvent(item)}
              className={`break-inside-avoid relative group rounded-3xl p-4 sm:p-5 bg-[#ede4d8]/95 backdrop-blur-md border border-[#2b2622]/15 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                item.rotation || ''
              }`}
            >
              {/* Washi Tape Accent */}
              {item.tape && (
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-100/70 border-x border-[#2b2622]/20 shadow-xs rotate-[-2deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
              )}

              {/* Media Container */}
              <div className={`relative w-full rounded-2xl overflow-hidden bg-[#dfd3c3] ${item.aspect} mb-4 shadow-inner`}>
                {item.mediaType === 'video' ? (
                  <AutoPlayVideo src={item.mediaSrc} alt={item.title} />
                ) : (
                  <img 
                    src={item.mediaSrc} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                )}

                {/* Floating Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20">
                    {item.tag}
                  </span>
                </div>

                {/* Instagram Direct Link on Hover */}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-[#fcfaf8]/95 text-[#522D21] opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-md"
                  title="View on Instagram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              </div>

              {/* Pin Header & Title */}
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="font-['Caveat'] text-[#8c3a3a] text-2xl font-bold">
                  {item.number.startsWith('0') ? `#${item.number}` : item.number}
                </span>
                <h3 className="text-lg sm:text-xl font-medium text-[#2b2622] tracking-tight group-hover:text-[#8c3a3a] transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#2b2622]/75 leading-relaxed mb-3 font-normal">
                {item.description}
              </p>

              {/* Handwritten Quote */}
              <div className="pt-2.5 border-t border-[#2b2622]/10 flex items-center justify-between">
                <span className="font-['Caveat'] text-[#8c3a3a] text-lg font-bold">
                  {item.quote}
                </span>
                <span className="text-[11px] font-medium text-[#522D21]/70 group-hover:text-[#522D21] transition-colors">
                  View Story →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clean Bottom Community CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#ede4d8] border border-[#2b2622]/15 text-center flex flex-col items-center justify-center shadow-lg relative overflow-hidden"
        >
          <span className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold block mb-2">
            Step into the circle ♡
          </span>
          <h2 className="hero-title text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2b2622] mb-4">
            Join our upcoming events.
          </h2>
          <p className="text-sm sm:text-base text-[#2b2622]/75 leading-relaxed mb-8 max-w-lg mx-auto font-normal">
            Whether you want to share a story, join our beach meditation, or simply enjoy silent presence with warm souls, you are always welcome.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openJoinModal'))}
              className="bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 font-semibold px-8 py-3.5 rounded-full hover:bg-[#f6dbe0] hover:scale-105 transition-all shadow-md shadow-[#522D21]/10 cursor-pointer text-sm"
            >
              Become a Member
            </button>
            <a 
              href="https://chat.whatsapp.com/DjwhofsCU4M0WAXNTLBzLl" 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#fcfaf8] text-[#2b2622] border border-[#2b2622]/20 font-semibold px-8 py-3.5 rounded-full hover:bg-[#ebe3d9] transition-all text-sm cursor-pointer shadow-xs"
            >
              Join WhatsApp Group
            </a>
          </div>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-[#2b2622]/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative w-full max-w-2xl bg-[#fcfaf8] border border-[#2b2622]/20 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 p-6 sm:p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-['Caveat'] text-[#8c3a3a] text-3xl font-bold">
                    {selectedEvent.number.startsWith('0') ? `#${selectedEvent.number}` : selectedEvent.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium text-[#2b2622]">{selectedEvent.title}</h3>
                    <span className="text-[10px] font-semibold text-[#522D21] uppercase tracking-wider">{selectedEvent.tag}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="w-9 h-9 rounded-full bg-[#ede4d8] hover:bg-[#dfd3c3] text-[#2b2622] flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="w-full rounded-2xl overflow-hidden bg-[#dfd3c3] aspect-video mb-4 shadow-md">
                {selectedEvent.mediaType === 'video' ? (
                  <AutoPlayVideo src={selectedEvent.mediaSrc} alt={selectedEvent.title} />
                ) : (
                  <img src={selectedEvent.mediaSrc} alt={selectedEvent.title} className="w-full h-full object-cover" />
                )}
              </div>

              <p className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-bold text-center mb-3">
                {selectedEvent.quote}
              </p>

              <p className="text-xs sm:text-sm text-[#2b2622]/80 leading-relaxed mb-6">
                {selectedEvent.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#2b2622]/10">
                <span className="text-xs uppercase tracking-wider text-[#2b2622]/60 font-semibold">
                  Nizhal Community
                </span>
                <a
                  href={selectedEvent.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 font-semibold px-6 py-2.5 rounded-full hover:bg-[#f6dbe0] transition-all text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <span>Open on Instagram</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Video Helper for smooth loop without browser play buttons
const AutoPlayVideo = ({ src, alt }: { src: string; alt?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const vid = videoRef.current;
      vid.playbackRate = 0.6;
      vid.defaultMuted = true;
      vid.muted = true;
      const play = () => {
        vid.play().catch(() => {});
      };
      play();
      vid.addEventListener('loadeddata', play, { once: true });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      preload="auto"
      aria-label={alt || 'Pin Video'}
      className="w-full h-full object-cover pointer-events-none"
    />
  );
};

export default Events;
