import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Media Assets
import activeListeningVideoUrl from '../assets/active-listening.mp4';
import safeSpacesVideoUrl from '../assets/safe-spaces.mp4';
import sharedPresenceVideoUrl from '../assets/shared-presence.mp4';
import aboutVideoUrl from '../assets/about-bg.mp4';

import heroBgUrl from '../assets/hero-bg.png';
import ctaBgUrl from '../assets/cta-bg.png';
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile.png';
import bodyMobile2Url from '../assets/body-mobile-2.png';
import friendsImg from '../assets/community-friends.png';
import handsImg from '../assets/community-hands.png';

export interface EventDetail {
  id: number;
  number: string;
  title: string;
  tag: string;
  category: 'all' | 'stories' | 'art-music' | 'wellness' | 'interactive';
  mediaType: 'video' | 'image';
  mediaSrc: string;
  coverImage: string;
  description: string;
  quote: string;
  highlights: string[];
  instagramLink: string;
  additionalImages: string[];
}

const EVENTS_COLLECTION: EventDetail[] = [
  {
    id: 1,
    number: "01",
    title: "Human. Stories. Connection.",
    tag: "Community Gathering",
    category: "stories",
    mediaType: "video",
    mediaSrc: activeListeningVideoUrl,
    coverImage: handsImg,
    description: "Our inaugural gathering was grounded in authentic vulnerability and deep listening. We sat together without screens, sharing personal journeys and listening without judgment.",
    quote: "“When you speak and someone truly listens, the world feels lighter.”",
    highlights: ["Safe vulnerability circle", "Active listening prompts", "Deep heart-to-heart sharing"],
    instagramLink: "https://www.instagram.com/p/DVl32cQgIUO/",
    additionalImages: [handsImg, heroBgUrl, ctaBgUrl]
  },
  {
    id: 2,
    number: "02",
    title: "Stones and Stories",
    tag: "Creative Keepsakes",
    category: "interactive",
    mediaType: "image",
    mediaSrc: bodyBgUrl,
    coverImage: bodyBgUrl,
    description: "We gathered by the open sea to paint meaningful stories, symbols, and words onto smooth stones—turning individual memories into tangible treasures to take home.",
    quote: "“A stone carved by waves, painted with memories.”",
    highlights: ["Hand-painted stone art", "Memory exchange", "Outdoor seaside circle"],
    instagramLink: "https://www.instagram.com/p/DVl-pExEzr7/",
    additionalImages: [bodyBgUrl, friendsImg, bodyMobileBgUrl]
  },
  {
    id: 3,
    number: "03",
    title: "Strokes and Chords",
    tag: "Art & Music",
    category: "art-music",
    mediaType: "video",
    mediaSrc: sharedPresenceVideoUrl,
    coverImage: ctaBgUrl,
    description: "An evening filled with soothing acoustic melodies, guitar fingerpicking, and live painting. Melodies filled the air as everyone painted along to the rhythm of live music.",
    quote: "“Where music paints the silence and colors sing.”",
    highlights: ["Live acoustic session", "Freeform canvas painting", "Ambient evening vibe"],
    instagramLink: "https://www.instagram.com/reel/DXrp4wBAKt7/",
    additionalImages: [ctaBgUrl, heroBgUrl, sharedPresenceVideoUrl]
  },
  {
    id: 4,
    number: "04",
    title: "Breathe with the Wave",
    tag: "Beach Mindfulness",
    category: "wellness",
    mediaType: "video",
    mediaSrc: aboutVideoUrl,
    coverImage: heroBgUrl,
    description: "An early morning seaside breathwork circle. We synched our breaths to the ebb and flow of the ocean waves, grounding ourselves in calm presence and morning sunlight.",
    quote: "“Inhale peace from the ocean breeze, exhale the noise.”",
    highlights: ["Guided breathwork", "Sunrise meditation", "Ocean wave synchrony"],
    instagramLink: "https://www.instagram.com/reel/DXo0AIezkxv/",
    additionalImages: [heroBgUrl, aboutVideoUrl, bodyMobile2Url]
  },
  {
    id: 5,
    number: "05",
    title: "The Colour Chase",
    tag: "Interactive Fun",
    category: "interactive",
    mediaType: "image",
    mediaSrc: bodyMobile2Url,
    coverImage: bodyMobile2Url,
    description: "A spontaneous, lively outdoor scavenger adventure filled with laughter, teamwork, and playful challenges designed to break the ice and bring out childlike joy.",
    quote: "“Laughter is the shortest distance between two hearts.”",
    highlights: ["Outdoor color quest", "Team bonding games", "Spontaneous laughter"],
    instagramLink: "https://www.instagram.com/reel/DXmbIQmANMO/",
    additionalImages: [bodyMobile2Url, friendsImg, ctaBgUrl]
  },
  {
    id: 6,
    number: "06",
    title: "Shades of Us",
    tag: "Identity & Voices",
    category: "stories",
    mediaType: "video",
    mediaSrc: safeSpacesVideoUrl,
    coverImage: friendsImg,
    description: "A thoughtful evening reflecting on the multiple facets that make us human. We explored our unique perspectives, shared challenges, and embraced every color of identity.",
    quote: "“Every shade of your story deserves to be heard with warmth.”",
    highlights: ["Perspective sharing", "Identity reflections", "Inclusive open floor"],
    instagramLink: "https://www.instagram.com/reel/DXXFrAdgPvE/",
    additionalImages: [friendsImg, safeSpacesVideoUrl, heroBgUrl]
  },
  {
    id: 7,
    number: "07",
    title: "Bracelets & Besties",
    tag: "Craft & Friendship",
    category: "interactive",
    mediaType: "image",
    mediaSrc: handsImg,
    coverImage: handsImg,
    description: "We sat in an intimate circle handcrafting woven bracelets and beaded charm bands, exchanging heartfelt notes and creating lasting tokens of friendship.",
    quote: "“Woven with threads of laughter, sealed with kindness.”",
    highlights: ["Bracelet crafting", "Heartfelt note exchange", "Friendship tokens"],
    instagramLink: "https://www.instagram.com/reel/DXHevLgki0u/",
    additionalImages: [handsImg, friendsImg, bodyBgUrl]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Gatherings' },
  { id: 'stories', label: 'Stories & Connection' },
  { id: 'art-music', label: 'Art & Music' },
  { id: 'wellness', label: 'Beach & Wellness' },
  { id: 'interactive', label: 'Crafts & Play' }
];

const Events = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'stories' | 'art-music' | 'wellness' | 'interactive'>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  const filteredEvents = activeCategory === 'all' 
    ? EVENTS_COLLECTION 
    : EVENTS_COLLECTION.filter(e => e.category === activeCategory);

  return (
    <div className="relative bg-[#fcfaf8] text-[#2b2622] min-h-screen overflow-x-hidden">
      {/* Background Decorative Wallpaper */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40">
        <picture>
          <source media="(max-width: 768px)" srcSet={bodyMobileBgUrl} />
          <img 
            src={bodyBgUrl} 
            alt="Nizhal Background Artwork" 
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-[#fcfaf8]/75 pointer-events-none" />
      </div>

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ede4d8] border border-[#2b2622]/10 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#8c3a3a] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#522D21]">
              Circle of Warmth Chapters
            </span>
          </div>
          
          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-8xl mb-4 text-[#2b2622] tracking-tight">
            Events & Memories
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#2b2622]/75 max-w-2xl mx-auto leading-relaxed font-normal">
            Moments crafted with intention. From beachside breathwork to acoustic melodies and quiet storytelling circles, explore our gatherings.
          </p>
        </motion.div>

        {/* Stories / Highlight Quick Reel Pill Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 overflow-x-auto pb-4 pt-1 flex items-center justify-start md:justify-center gap-4 sm:gap-6 no-scrollbar"
        >
          {EVENTS_COLLECTION.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedEvent(item)}
              className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer focus:outline-none"
            >
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#8c3a3a] via-[#cda2a2] to-[#522D21] group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-[#ede4d8] border-2 border-white">
                  <img 
                    src={item.coverImage} 
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-[#2b2622] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                  #{item.number}
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#2b2622]/80 max-w-[76px] truncate text-center group-hover:text-[#8c3a3a] transition-colors">
                {item.title}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-all duration-200 cursor-pointer font-medium ${
                activeCategory === cat.id
                  ? 'bg-[#522D21] text-white shadow-md shadow-[#522D21]/20 scale-105'
                  : 'bg-[#ede4d8]/80 text-[#2b2622]/75 hover:bg-[#ede4d8] border border-[#2b2622]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Rich Bento Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredEvents.map((event, index) => {
            const isFeatured = index === 0 && activeCategory === 'all';

            return (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group relative bg-[#ede4d8]/90 backdrop-blur-md border border-[#2b2622]/15 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-2xl hover:border-[#522D21]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div>
                  {/* Top Bar: Event Chapter & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-bold tracking-tight">
                      Chapter #{event.number}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#fcfaf8] border border-[#2b2622]/10 text-[#522D21]">
                      {event.tag}
                    </span>
                  </div>

                  {/* Media Frame (Video or Photo with Hover Reveal) */}
                  <div className={`relative w-full rounded-2xl overflow-hidden bg-[#dfd3c3] border border-[#2b2622]/10 mb-5 shadow-inner ${
                    isFeatured ? 'aspect-video md:aspect-[21/9]' : 'aspect-square sm:aspect-[4/3]'
                  }`}>
                    {event.mediaType === 'video' ? (
                      <AutoPlayVideo src={event.mediaSrc} alt={event.title} />
                    ) : (
                      <img 
                        src={event.mediaSrc} 
                        alt={event.title}
                        className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity pointer-events-none" />
                    
                    {/* Hover Peek Badge */}
                    <div className="absolute bottom-3 right-3 bg-[#fcfaf8]/90 backdrop-blur-md border border-[#2b2622]/10 rounded-full px-3 py-1 text-[11px] font-semibold text-[#2b2622] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <span>View Story</span>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-medium text-[#2b2622] tracking-tight mb-2 group-hover:text-[#8c3a3a] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2b2622]/75 leading-relaxed mb-4 font-normal">
                    {event.description}
                  </p>
                </div>

                {/* Highlights Tags & Action */}
                <div className="pt-4 border-t border-[#2b2622]/10 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {event.highlights.slice(0, 2).map((hl, i) => (
                      <span key={i} className="text-[10px] bg-[#fcfaf8]/80 px-2.5 py-1 rounded-md text-[#2b2622]/70 font-medium">
                        ✦ {hl}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={event.instagramLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-[#fcfaf8] hover:bg-[#FCEBED] text-[#522D21] border border-[#522D21]/20 transition-all hover:scale-110 shadow-xs shrink-0"
                    title="Open on Instagram"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Community CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#ede4d8] border border-[#2b2622]/15 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-lg"
        >
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold block mb-2">
              Want to experience the circle? ♡
            </span>
            <h2 className="hero-title text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2b2622] mb-4">
              Be a part of our next chapter.
            </h2>
            <p className="text-sm sm:text-base text-[#2b2622]/75 leading-relaxed mb-8 max-w-lg mx-auto">
              Our events are intimate, safe, and warm. Membership gives you access to private beach sessions, open mic evenings, and community circles.
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
                Join WhatsApp Circle
              </a>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Interactive Event Story Lightbox Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-[#2b2622]/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-3xl bg-[#fcfaf8] border border-[#2b2622]/20 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-[#2b2622]/10 flex items-center justify-between bg-[#ede4d8]">
                <div className="flex items-center gap-3">
                  <span className="font-['Caveat'] text-[#8c3a3a] text-3xl font-bold">
                    #{selectedEvent.number}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-[#2b2622] tracking-tight">
                      {selectedEvent.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-[#522D21] uppercase tracking-wider">
                      {selectedEvent.tag}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="w-10 h-10 rounded-full bg-[#fcfaf8] hover:bg-[#dfd3c3] text-[#2b2622] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Hero Media Display in Modal */}
                <div className="w-full rounded-2xl overflow-hidden bg-[#dfd3c3] border border-[#2b2622]/10 aspect-video shadow-md relative">
                  {selectedEvent.mediaType === 'video' ? (
                    <AutoPlayVideo src={selectedEvent.mediaSrc} alt={selectedEvent.title} />
                  ) : (
                    <img 
                      src={selectedEvent.mediaSrc} 
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Quote Callout */}
                <div className="p-5 rounded-2xl bg-[#ede4d8] border border-[#2b2622]/10 text-center">
                  <p className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-bold">
                    {selectedEvent.quote}
                  </p>
                </div>

                {/* Full Description */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#2b2622]/50 font-semibold mb-2">
                    About this Gathering
                  </h4>
                  <p className="text-sm sm:text-base text-[#2b2622]/85 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#2b2622]/50 font-semibold mb-3">
                    Gathering Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedEvent.highlights.map((hl, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#ede4d8]/70 border border-[#2b2622]/10 text-xs text-[#2b2622] font-medium flex items-center gap-2">
                        <span className="text-[#8c3a3a] font-bold">✦</span>
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Media Carousel / Thumbnails */}
                {selectedEvent.additionalImages.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#2b2622]/50 font-semibold mb-3">
                      Event Gallery
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedEvent.additionalImages.map((img, idx) => (
                        <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-[#2b2622]/10 bg-[#dfd3c3]">
                          {img.endsWith('.mp4') ? (
                            <AutoPlayVideo src={img} alt="Gallery Clip" />
                          ) : (
                            <img src={img} alt="Gallery shot" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="p-5 sm:p-6 border-t border-[#2b2622]/10 bg-[#ede4d8]/50 flex items-center justify-between gap-4">
                <a 
                  href={selectedEvent.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 font-semibold py-3 px-6 rounded-full hover:bg-[#f6dbe0] transition-all flex items-center justify-center gap-2 text-sm shadow-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>View Post on Instagram</span>
                </a>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="py-3 px-6 rounded-full bg-[#fcfaf8] border border-[#2b2622]/15 text-[#2b2622] hover:bg-[#ebe3d9] text-sm font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Video Helper for flawless loop without play button overlays
const AutoPlayVideo = ({ src, alt }: { src: string; alt?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const vid = videoRef.current;
      vid.playbackRate = 0.6;
      vid.defaultMuted = true;
      vid.muted = true;
      const playPromise = () => {
        vid.play().catch(() => {});
      };
      playPromise();
      vid.addEventListener('loadeddata', playPromise, { once: true });
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
      aria-label={alt || 'Event Video'}
      className="w-full h-full object-cover pointer-events-none"
    />
  );
};

export default Events;
