import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Local Video Assets
import activeListeningVideoUrl from '../assets/active-listening.mp4';
import safeSpacesVideoUrl from '../assets/safe-spaces.mp4';
import sharedPresenceVideoUrl from '../assets/shared-presence.mp4';
import aboutVideoUrl from '../assets/about-bg.mp4';

// Local Artwork Assets
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile.png';

export interface ScrapbookItem {
  id: string;
  type: 'polaroid' | 'film' | 'note' | 'video-polaroid' | 'taped-photo';
  title: string;
  src?: string;
  handwrittenNote: string;
  rotation: string; // e.g. '-rotate-3', 'rotate-2'
  widthClass: string; // e.g. 'w-full sm:w-72', 'w-full sm:w-80'
  pinColor?: string;
  tapePosition?: 'top' | 'top-right' | 'top-left' | 'cross';
  instagramLink: string;
}

const SCRAPBOOK_MEMORIES: ScrapbookItem[] = [
  // 1. Human. Stories. Connection.
  {
    id: 'mem-1',
    type: 'video-polaroid',
    title: 'Human. Stories. Connection.',
    src: activeListeningVideoUrl,
    handwrittenNote: 'listening deeply, no rush, just warmth ♡',
    rotation: '-rotate-2',
    widthClass: 'w-full sm:w-80',
    tapePosition: 'top',
    instagramLink: 'https://www.instagram.com/p/DVl32cQgIUO/'
  },
  {
    id: 'mem-1b',
    type: 'polaroid',
    title: 'Circle by the Sea',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    handwrittenNote: 'real conversations with good souls ✨',
    rotation: 'rotate-3',
    widthClass: 'w-full sm:w-72',
    tapePosition: 'top-right',
    instagramLink: 'https://www.instagram.com/p/DVl32cQgIUO/'
  },

  // 2. Stones and Stories
  {
    id: 'mem-2',
    type: 'polaroid',
    title: 'Stones and Stories',
    src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    handwrittenNote: 'painting memories on ocean pebbles 🎨',
    rotation: '-rotate-3',
    widthClass: 'w-full sm:w-76',
    tapePosition: 'top-left',
    instagramLink: 'https://www.instagram.com/p/DVl-pExEzr7/'
  },
  {
    id: 'mem-2b',
    type: 'note',
    title: 'A quiet thought',
    handwrittenNote: '“every stone has a story carved by waves.”',
    rotation: 'rotate-2',
    widthClass: 'w-full sm:w-64',
    pinColor: '#8c3a3a',
    instagramLink: 'https://www.instagram.com/p/DVl-pExEzr7/'
  },

  // 3. Strokes and Chords
  {
    id: 'mem-3',
    type: 'video-polaroid',
    title: 'Strokes and Chords',
    src: sharedPresenceVideoUrl,
    handwrittenNote: 'acoustic strings & colors in the dusk 🎸',
    rotation: 'rotate-2',
    widthClass: 'w-full sm:w-80',
    tapePosition: 'top',
    instagramLink: 'https://www.instagram.com/reel/DXrp4wBAKt7/'
  },
  {
    id: 'mem-3b',
    type: 'polaroid',
    title: 'Sunset Chords',
    src: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
    handwrittenNote: 'guitar on the warm sand 🎶',
    rotation: '-rotate-2',
    widthClass: 'w-full sm:w-72',
    tapePosition: 'top-right',
    instagramLink: 'https://www.instagram.com/reel/DXrp4wBAKt7/'
  },

  // 4. Breathe with the Wave
  {
    id: 'mem-4',
    type: 'video-polaroid',
    title: 'Breathe with the Wave',
    src: aboutVideoUrl,
    handwrittenNote: 'early morning tide & deep breaths 🌊',
    rotation: '-rotate-3',
    widthClass: 'w-full sm:w-80',
    tapePosition: 'top',
    instagramLink: 'https://www.instagram.com/reel/DXo0AIezkxv/'
  },
  {
    id: 'mem-4b',
    type: 'polaroid',
    title: 'Seaside Peace',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    handwrittenNote: 'barefoot along the morning shoreline',
    rotation: 'rotate-1',
    widthClass: 'w-full sm:w-72',
    tapePosition: 'top-left',
    instagramLink: 'https://www.instagram.com/reel/DXo0AIezkxv/'
  },

  // 5. The Colour Chase
  {
    id: 'mem-5',
    type: 'polaroid',
    title: 'The Colour Chase',
    src: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80',
    handwrittenNote: 'unfiltered laughter & powder splashes 💛',
    rotation: 'rotate-3',
    widthClass: 'w-full sm:w-76',
    tapePosition: 'top-right',
    instagramLink: 'https://www.instagram.com/reel/DXmbIQmANMO/'
  },
  {
    id: 'mem-5b',
    type: 'polaroid',
    title: 'Running in Colors',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    handwrittenNote: 'just pure childlike joy 🌈',
    rotation: '-rotate-2',
    widthClass: 'w-full sm:w-72',
    tapePosition: 'top',
    instagramLink: 'https://www.instagram.com/reel/DXmbIQmANMO/'
  },

  // 6. Shades of Us
  {
    id: 'mem-6',
    type: 'video-polaroid',
    title: 'Shades of Us',
    src: safeSpacesVideoUrl,
    handwrittenNote: 'every shade of you belongs here 🤍',
    rotation: '-rotate-1',
    widthClass: 'w-full sm:w-80',
    tapePosition: 'top-left',
    instagramLink: 'https://www.instagram.com/reel/DXXFrAdgPvE/'
  },
  {
    id: 'mem-6b',
    type: 'polaroid',
    title: 'Warm Portraits',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    handwrittenNote: 'unapologetically ourselves',
    rotation: 'rotate-2',
    widthClass: 'w-full sm:w-72',
    tapePosition: 'top',
    instagramLink: 'https://www.instagram.com/reel/DXXFrAdgPvE/'
  },

  // 7. Bracelets & Besties
  {
    id: 'mem-7',
    type: 'polaroid',
    title: 'Bracelets & Besties',
    src: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80&q=80',
    handwrittenNote: 'woven threads of kindness & beads 🧶',
    rotation: '-rotate-3',
    widthClass: 'w-full sm:w-76',
    tapePosition: 'top-right',
    instagramLink: 'https://www.instagram.com/reel/DXHevLgki0u/'
  },
  {
    id: 'mem-7b',
    type: 'note',
    title: 'A note from us',
    handwrittenNote: '“you are never alone in the shadow. ♡”',
    rotation: 'rotate-3',
    widthClass: 'w-full sm:w-64',
    pinColor: '#522D21',
    instagramLink: 'https://www.instagram.com/nizhal.community/'
  }
];

const Events = () => {
  return (
    <div className="relative bg-[#f7f3ee] text-[#2b2622] min-h-screen overflow-x-hidden selection:bg-[#8c3a3a]/20">
      {/* Organic Warm Background Texture */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-20">
        <picture>
          <source media="(max-width: 768px)" srcSet={bodyMobileBgUrl} />
          <img 
            src={bodyBgUrl} 
            alt="Artistic Scrapbook Background" 
            className="w-full h-full object-cover"
          />
        </picture>
      </div>

      <div className="relative z-10 pt-28 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        
        {/* Artsy Handwritten Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <p className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold mb-1">
            our little scrapbook ♡
          </p>
          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-7xl text-[#2b2622] tracking-tight mb-3">
            Gatherings & Memories
          </h1>
          <p className="font-['Caveat'] text-[#2b2622]/75 text-2xl sm:text-3xl leading-snug">
            photos, video clips, and scribbled thoughts from our past circles.
          </p>
        </div>

        {/* Artsy Scattered Scrapbook Collage Wall */}
        <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-10 md:gap-12">
          {SCRAPBOOK_MEMORIES.map((item, index) => {
            const isNote = item.type === 'note';
            const isVideo = item.type === 'video-polaroid';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
                transition={{ duration: 0.3 }}
                className={`relative group shrink-0 transition-all block ${item.rotation} ${item.widthClass}`}
              >
                {/* Washi Tape / Paper Tape Accents */}
                {item.tapePosition === 'top' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-100/80 border-x border-[#2b2622]/20 shadow-xs rotate-[-2deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
                )}
                {item.tapePosition === 'top-right' && (
                  <div className="absolute -top-3 -right-3 w-16 h-6 bg-amber-100/80 border-x border-[#2b2622]/20 shadow-xs rotate-[28deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
                )}
                {item.tapePosition === 'top-left' && (
                  <div className="absolute -top-3 -left-3 w-16 h-6 bg-amber-100/80 border-x border-[#2b2622]/20 shadow-xs rotate-[-28deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
                )}

                {/* Polaroid Frame Card */}
                {!isNote ? (
                  <div className="bg-[#ffffff] p-3.5 pb-5 rounded-md shadow-xl border border-[#2b2622]/10 transition-shadow duration-300 group-hover:shadow-2xl">
                    {/* Media Frame */}
                    <div className="relative w-full aspect-[4/5] bg-[#dfd3c3] overflow-hidden rounded-xs mb-3 shadow-inner">
                      {isVideo ? (
                        <AutoPlayVideo src={item.src!} alt={item.title} />
                      ) : (
                        <img 
                          src={item.src} 
                          alt={item.title} 
                          className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Handwritten Polaroid Caption */}
                    <div className="px-1 pt-1">
                      <h3 className="text-xs uppercase tracking-wider text-[#2b2622]/60 font-semibold mb-0.5">
                        {item.title}
                      </h3>
                      <p className="font-['Caveat'] text-[#8c3a3a] text-2xl font-bold leading-tight">
                        {item.handwrittenNote}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Handwritten Sticky Note */
                  <div className="bg-[#fef9ec] p-6 rounded-md shadow-xl border border-amber-900/10 flex flex-col justify-center items-center text-center min-h-[190px]">
                    <div className="w-3 h-3 rounded-full bg-[#8c3a3a] shadow-inner mb-3" />
                    <p className="font-['Caveat'] text-[#2b2622] text-3xl font-bold leading-relaxed">
                      {item.handwrittenNote}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Aesthetic Soulful Footer Note */}
        <div className="mt-28 text-center max-w-lg mx-auto">
          <p className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold mb-2">
            more memories in the making... ♡
          </p>
          <p className="text-xs sm:text-sm text-[#2b2622]/70 leading-relaxed font-normal">
            come sit beside us in our upcoming circles.
          </p>
        </div>

      </div>
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
      aria-label={alt || 'Scrapbook Video'}
      className="w-full h-full object-cover pointer-events-none"
    />
  );
};

export default Events;
