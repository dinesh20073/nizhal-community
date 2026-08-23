import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Local Video Assets
import activeListeningVideoUrl from '../assets/active-listening.mp4';
import safeSpacesVideoUrl from '../assets/safe-spaces.mp4';
import sharedPresenceVideoUrl from '../assets/shared-presence.mp4';
import aboutVideoUrl from '../assets/about-bg.mp4';

// Local Artwork Assets
import heroBgUrl from '../assets/hero-bg.png';
import ctaBgUrl from '../assets/cta-bg.png';
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile.png';
import bodyMobile2Url from '../assets/body-mobile-2.png';
import friendsImg from '../assets/community-friends.png';
import handsImg from '../assets/community-hands.png';

export interface PinItem {
  id: string;
  type: 'image' | 'video' | 'polaroid' | 'quote';
  src?: string;
  title: string;
  chapter: string;
  tag: string;
  aspect: string; // e.g. 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[1/1]'
  likes: number;
  note?: string;
  rotation?: string;
  tape?: boolean;
  link: string;
}

export interface EventChapter {
  id: number;
  number: string;
  title: string;
  tag: string;
  mediaType: 'video' | 'image';
  mediaSrc: string;
  coverImage: string;
  description: string;
  quote: string;
  highlights: string[];
  link: string;
}

// 7 Primary Event Chapters
const CHAPTERS: EventChapter[] = [
  {
    id: 1,
    number: "01",
    title: "Human. Stories. Connection.",
    tag: "Community Circle",
    mediaType: "video",
    mediaSrc: activeListeningVideoUrl,
    coverImage: handsImg,
    description: "An intimate circle where we sat together to share personal stories, practice active listening, and create genuine bonds without pretense.",
    quote: "“When you speak and someone truly listens, the world feels lighter.”",
    highlights: ["Safe vulnerability circle", "Deep human connection", "Heart-to-heart sharing"],
    link: "https://www.instagram.com/p/DVl32cQgIUO/"
  },
  {
    id: 2,
    number: "02",
    title: "Stones and Stories",
    tag: "Creative Keepsakes",
    mediaType: "image",
    mediaSrc: bodyBgUrl,
    coverImage: bodyBgUrl,
    description: "Gathering by the sea to paint meaningful memories onto smooth stones—turning moments into physical keepsakes.",
    quote: "“A stone carved by waves, painted with memories.”",
    highlights: ["Hand-painted stone art", "Beachside creativity", "Memory exchange"],
    link: "https://www.instagram.com/p/DVl-pExEzr7/"
  },
  {
    id: 3,
    number: "03",
    title: "Strokes and Chords",
    tag: "Art & Music",
    mediaType: "video",
    mediaSrc: sharedPresenceVideoUrl,
    coverImage: ctaBgUrl,
    description: "An open evening of acoustic guitar melodies, canvas painting, and shared artistic expression beneath the sunset.",
    quote: "“Where music paints the silence and colors sing.”",
    highlights: ["Live acoustic session", "Canvas painting", "Ambient sunset vibe"],
    link: "https://www.instagram.com/reel/DXrp4wBAKt7/"
  },
  {
    id: 4,
    number: "04",
    title: "Breathe with the Wave",
    tag: "Beach Mindfulness",
    mediaType: "video",
    mediaSrc: aboutVideoUrl,
    coverImage: heroBgUrl,
    description: "Early morning beachside breathwork. Aligning our rhythm to the gentle ocean waves and soaking in the morning breeze.",
    quote: "“Inhale peace from the ocean breeze, exhale the noise.”",
    highlights: ["Guided breathwork", "Sunrise meditation", "Ocean wave synchrony"],
    link: "https://www.instagram.com/reel/DXo0AIezkxv/"
  },
  {
    id: 5,
    number: "05",
    title: "The Colour Chase",
    tag: "Interactive Fun",
    mediaType: "image",
    mediaSrc: bodyMobile2Url,
    coverImage: bodyMobile2Url,
    description: "Playful challenges, outdoor team quests, and spontaneous laughter under the open sky to bring out our inner child.",
    quote: "“Laughter is the shortest distance between two hearts.”",
    highlights: ["Outdoor color quest", "Team bonding games", "Spontaneous laughter"],
    link: "https://www.instagram.com/reel/DXmbIQmANMO/"
  },
  {
    id: 6,
    number: "06",
    title: "Shades of Us",
    tag: "Identity & Voices",
    mediaType: "video",
    mediaSrc: safeSpacesVideoUrl,
    coverImage: friendsImg,
    description: "Reflecting on our varied personal journeys, exploring identity, and celebrating the unique perspectives we each bring.",
    quote: "“Every shade of your story deserves to be heard with warmth.”",
    highlights: ["Perspective sharing", "Identity reflections", "Inclusive open floor"],
    link: "https://www.instagram.com/reel/DXXFrAdgPvE/"
  },
  {
    id: 7,
    number: "07",
    title: "Bracelets & Besties",
    tag: "Craft & Friendship",
    mediaType: "image",
    mediaSrc: handsImg,
    coverImage: handsImg,
    description: "Weaving friendship bands, sharing colored beads, and exchanging warm handmade tokens of appreciation.",
    quote: "“Woven with threads of laughter, sealed with kindness.”",
    highlights: ["Bracelet crafting", "Note exchange", "Friendship tokens"],
    link: "https://www.instagram.com/reel/DXHevLgki0u/"
  }
];

// Rich Pinterest Scrapbook Pins (Curated photography + local videos + polaroids)
const PINTEREST_PINS: PinItem[] = [
  {
    id: 'pin-1',
    type: 'video',
    src: activeListeningVideoUrl,
    title: 'Human. Stories. Connection.',
    chapter: '#01',
    tag: 'Stories & Circle',
    aspect: 'aspect-[3/4]',
    likes: 342,
    note: 'quiet circle by the sea ♡',
    rotation: '-rotate-1',
    tape: true,
    link: 'https://www.instagram.com/p/DVl32cQgIUO/'
  },
  {
    id: 'pin-2',
    type: 'polaroid',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    title: 'Heartfelt Conversations',
    chapter: '#01',
    tag: 'Community',
    aspect: 'aspect-square',
    likes: 512,
    note: 'real stories, zero filters ✨',
    rotation: 'rotate-2',
    tape: true,
    link: 'https://www.instagram.com/p/DVl32cQgIUO/'
  },
  {
    id: 'pin-3',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    title: 'Stones and Stories',
    chapter: '#02',
    tag: 'Handmade Art',
    aspect: 'aspect-[4/5]',
    likes: 428,
    note: 'painted with ocean calm 🎨',
    rotation: '-rotate-2',
    link: 'https://www.instagram.com/p/DVl-pExEzr7/'
  },
  {
    id: 'pin-4',
    type: 'quote',
    title: 'A gentle reminder',
    chapter: '#00',
    tag: 'Thought',
    aspect: 'aspect-[4/3]',
    likes: 689,
    note: '“You are never alone in the shadow. We are here beside you.” ♡',
    rotation: 'rotate-1',
    tape: true,
    link: 'https://www.instagram.com/nizhal.community/'
  },
  {
    id: 'pin-5',
    type: 'video',
    src: sharedPresenceVideoUrl,
    title: 'Strokes and Chords',
    chapter: '#03',
    tag: 'Art & Music',
    aspect: 'aspect-[3/4]',
    likes: 719,
    note: 'sunset jamming & paints 🎸',
    rotation: 'rotate-1',
    tape: true,
    link: 'https://www.instagram.com/reel/DXrp4wBAKt7/'
  },
  {
    id: 'pin-6',
    type: 'polaroid',
    src: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
    title: 'Chords by the Waves',
    chapter: '#03',
    tag: 'Acoustic',
    aspect: 'aspect-[4/5]',
    likes: 388,
    note: 'the sound of strings & tides',
    rotation: '-rotate-1',
    tape: true,
    link: 'https://www.instagram.com/reel/DXrp4wBAKt7/'
  },
  {
    id: 'pin-7',
    type: 'video',
    src: aboutVideoUrl,
    title: 'Breathe with the Wave',
    chapter: '#04',
    tag: 'Mindfulness',
    aspect: 'aspect-[4/5]',
    likes: 820,
    note: 'early sunrise breathwork 🌊',
    rotation: '-rotate-2',
    tape: true,
    link: 'https://www.instagram.com/reel/DXo0AIezkxv/'
  },
  {
    id: 'pin-8',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    title: 'Morning Seashore Peace',
    chapter: '#04',
    tag: 'Ocean Calm',
    aspect: 'aspect-[3/4]',
    likes: 640,
    note: 'golden hour reflections ☀️',
    rotation: 'rotate-2',
    link: 'https://www.instagram.com/reel/DXo0AIezkxv/'
  },
  {
    id: 'pin-9',
    type: 'polaroid',
    src: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80',
    title: 'The Colour Chase',
    chapter: '#05',
    tag: 'Joy & Color',
    aspect: 'aspect-[4/5]',
    likes: 470,
    note: 'pure laughter & colors ✨',
    rotation: '-rotate-1',
    tape: true,
    link: 'https://www.instagram.com/reel/DXmbIQmANMO/'
  },
  {
    id: 'pin-10',
    type: 'video',
    src: safeSpacesVideoUrl,
    title: 'Shades of Us',
    chapter: '#06',
    tag: 'Identity',
    aspect: 'aspect-[3/4]',
    likes: 912,
    note: 'embracing every unique shade',
    rotation: 'rotate-1',
    tape: true,
    link: 'https://www.instagram.com/reel/DXXFrAdgPvE/'
  },
  {
    id: 'pin-11',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    title: 'Authentic Smiles',
    chapter: '#06',
    tag: 'Portraits',
    aspect: 'aspect-[3/4]',
    likes: 580,
    note: 'every smile has a story',
    rotation: '-rotate-2',
    link: 'https://www.instagram.com/reel/DXXFrAdgPvE/'
  },
  {
    id: 'pin-12',
    type: 'polaroid',
    src: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80',
    title: 'Bracelets & Besties',
    chapter: '#07',
    tag: 'Friendship',
    aspect: 'aspect-square',
    likes: 745,
    note: 'handmade friendship tokens 🧶',
    rotation: 'rotate-2',
    tape: true,
    link: 'https://www.instagram.com/reel/DXHevLgki0u/'
  },
  {
    id: 'pin-13',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80',
    title: 'Night Beach Warmth',
    chapter: '#01',
    tag: 'Campfire',
    aspect: 'aspect-[4/5]',
    likes: 830,
    note: 'under the stars beside you',
    rotation: '-rotate-1',
    link: 'https://www.instagram.com/p/DVl32cQgIUO/'
  },
  {
    id: 'pin-14',
    type: 'quote',
    title: 'Shared Presence',
    chapter: '#03',
    tag: 'Comfort',
    aspect: 'aspect-[4/3]',
    likes: 410,
    note: '“Sometimes simply sitting in quiet company is all our heart seeks.”',
    rotation: '-rotate-1',
    tape: true,
    link: 'https://www.instagram.com/nizhal.community/'
  },
  {
    id: 'pin-15',
    type: 'polaroid',
    src: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    title: 'Film Memories',
    chapter: '#05',
    tag: 'Scrapbook',
    aspect: 'aspect-[3/4]',
    likes: 605,
    note: 'capturing fleeting moments 📷',
    rotation: 'rotate-1',
    tape: true,
    link: 'https://www.instagram.com/reel/DXmbIQmANMO/'
  }
];

const MOOD_FILTERS = [
  { id: 'all', label: 'All Moods' },
  { id: 'stories', label: 'Stories & Warmth' },
  { id: 'art', label: 'Art & Music' },
  { id: 'beach', label: 'Beach & Waves' },
  { id: 'crafts', label: 'Crafts & Friendship' }
];

const Events = () => {
  const [viewMode, setViewMode] = useState<'pinterest' | 'chapters'>('pinterest');
  const [selectedMood, setSelectedMood] = useState('all');
  const [likedPins, setLikedPins] = useState<Record<string, number>>({});
  const [selectedPin, setSelectedPin] = useState<PinItem | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<EventChapter | null>(null);

  const toggleLike = (pinId: string, initialLikes: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPins(prev => {
      const current = prev[pinId] ?? initialLikes;
      const isAlreadyLiked = prev[pinId] !== undefined && prev[pinId] > initialLikes;
      return {
        ...prev,
        [pinId]: isAlreadyLiked ? initialLikes : current + 1
      };
    });
  };

  const filteredPins = PINTEREST_PINS.filter(pin => {
    if (selectedMood === 'all') return true;
    if (selectedMood === 'stories') return pin.tag.includes('Stories') || pin.tag.includes('Community') || pin.tag.includes('Thought');
    if (selectedMood === 'art') return pin.tag.includes('Art') || pin.tag.includes('Acoustic') || pin.tag.includes('Handmade');
    if (selectedMood === 'beach') return pin.tag.includes('Mindfulness') || pin.tag.includes('Ocean') || pin.tag.includes('Campfire');
    if (selectedMood === 'crafts') return pin.tag.includes('Friendship') || pin.tag.includes('Joy') || pin.tag.includes('Scrapbook');
    return true;
  });

  return (
    <div className="relative bg-[#fcfaf8] text-[#2b2622] min-h-screen overflow-x-hidden">
      {/* Background Texture Scrim */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-30">
        <picture>
          <source media="(max-width: 768px)" srcSet={bodyMobileBgUrl} />
          <img 
            src={bodyBgUrl} 
            alt="Background Texture" 
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-[#fcfaf8]/80 pointer-events-none" />
      </div>

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        
        {/* Editorial Pinterest Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          {/* Aesthetic Tape Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ede4d8] border border-[#2b2622]/15 mb-4 shadow-xs">
            <span className="text-sm">📌</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#522D21]">
              Nizhal Visual Diary & Scrapbook
            </span>
          </div>

          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-8xl mb-3 text-[#2b2622] tracking-tight">
            Moments in Motion
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#2b2622]/75 max-w-xl mx-auto leading-relaxed font-normal">
            A Pinterest-style visual moodboard of our gatherings, quiet beachside mornings, handwritten notes, and shared laughter.
          </p>

          {/* View Mode Switcher (Pinterest Board vs Chapter Guides) */}
          <div className="mt-8 inline-flex p-1.5 rounded-full bg-[#ede4d8] border border-[#2b2622]/15 shadow-inner">
            <button
              onClick={() => setViewMode('pinterest')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                viewMode === 'pinterest'
                  ? 'bg-[#522D21] text-white shadow-md'
                  : 'text-[#2b2622]/70 hover:text-[#2b2622]'
              }`}
            >
              🖼️ Pinterest Moodboard
            </button>
            <button
              onClick={() => setViewMode('chapters')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                viewMode === 'chapters'
                  ? 'bg-[#522D21] text-white shadow-md'
                  : 'text-[#2b2622]/70 hover:text-[#2b2622]'
              }`}
            >
              📖 7 Event Chapters
            </button>
          </div>
        </motion.div>

        {/* Stories / Chapter Highlight Bubble Bar */}
        <div className="mb-10 overflow-x-auto pb-3 pt-1 flex items-center justify-start md:justify-center gap-4 sm:gap-5 no-scrollbar">
          {CHAPTERS.map((chap) => (
            <button
              key={chap.id}
              onClick={() => setSelectedChapter(chap)}
              className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer focus:outline-none"
            >
              <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#8c3a3a] via-[#cda2a2] to-[#522D21] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full overflow-hidden bg-[#ede4d8] border-2 border-white">
                  <img 
                    src={chap.coverImage} 
                    alt={chap.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 bg-[#2b2622] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                  #{chap.number}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#2b2622]/80 max-w-[70px] truncate text-center group-hover:text-[#8c3a3a] transition-colors">
                {chap.title}
              </span>
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: PINTEREST MOODBOARD (MASONRY SCRAPBOOK WALL)     */}
        {/* ======================================================== */}
        {viewMode === 'pinterest' && (
          <div>
            {/* Mood Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {MOOD_FILTERS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    selectedMood === m.id
                      ? 'bg-[#522D21] text-white shadow-sm'
                      : 'bg-[#ede4d8]/90 text-[#2b2622]/70 hover:bg-[#ede4d8] border border-[#2b2622]/10'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Masonry Columns for Pinterest Feel */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {filteredPins.map((pin) => {
                const currentLikes = likedPins[pin.id] ?? pin.likes;
                const isLiked = likedPins[pin.id] !== undefined && likedPins[pin.id] > pin.likes;

                return (
                  <motion.div
                    key={pin.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setSelectedPin(pin)}
                    className={`break-inside-avoid relative group rounded-3xl p-3 sm:p-4 bg-[#ede4d8]/95 backdrop-blur-md border border-[#2b2622]/15 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                      pin.rotation || ''
                    }`}
                  >
                    {/* Decorative Washi Tape on Top */}
                    {pin.tape && (
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-100/70 border-x border-[#2b2622]/20 shadow-xs rotate-[-3deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
                    )}

                    {/* Media Container */}
                    <div className={`relative w-full rounded-2xl overflow-hidden bg-[#dfd3c3] ${pin.aspect} mb-3 shadow-inner`}>
                      {pin.type === 'video' ? (
                        <AutoPlayVideo src={pin.src!} alt={pin.title} />
                      ) : pin.type === 'quote' ? (
                        <div className="w-full h-full p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#f8ecec] to-[#ede4d8]">
                          <span className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-bold leading-relaxed">
                            {pin.note}
                          </span>
                        </div>
                      ) : (
                        <img 
                          src={pin.src} 
                          alt={pin.title} 
                          className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          loading="lazy"
                        />
                      )}

                      {/* Floating Category Tag */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-white/20">
                          {pin.tag}
                        </span>
                      </div>

                      {/* Quick Instagram Jump Button on Hover */}
                      <a
                        href={pin.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-[#fcfaf8]/90 text-[#522D21] opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-md"
                        title="View on Instagram"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                      </a>
                    </div>

                    {/* Pin Footer with Handwriting Note & Like Heart Button */}
                    <div className="flex items-center justify-between gap-2 px-1">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-bold text-[#8c3a3a]">{pin.chapter}</span>
                          <h4 className="text-xs sm:text-sm font-semibold text-[#2b2622] truncate max-w-[150px]">
                            {pin.title}
                          </h4>
                        </div>
                        {pin.note && pin.type !== 'quote' && (
                          <p className="font-['Caveat'] text-[#8c3a3a] text-base font-bold leading-none">
                            {pin.note}
                          </p>
                        )}
                      </div>

                      {/* Interactive Heart Button */}
                      <button
                        onClick={(e) => toggleLike(pin.id, pin.likes, e)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          isLiked 
                            ? 'bg-rose-100 text-rose-600 shadow-xs' 
                            : 'bg-[#fcfaf8] text-[#2b2622]/60 hover:text-rose-600 hover:bg-rose-50'
                        }`}
                      >
                        <span className="text-xs">{isLiked ? '❤️' : '🤍'}</span>
                        <span className="text-[11px]">{currentLikes}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: 7 EVENT CHAPTERS (DETAILED GUIDES)              */}
        {/* ======================================================== */}
        {viewMode === 'chapters' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CHAPTERS.map((chap, index) => (
              <motion.div
                key={chap.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setSelectedChapter(chap)}
                className="group relative bg-[#ede4d8] border border-[#2b2622]/15 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-[#522D21]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-['Caveat'] text-[#8c3a3a] text-3xl font-bold">
                      Chapter #{chap.number}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#fcfaf8] border border-[#2b2622]/10 text-[#522D21]">
                      {chap.tag}
                    </span>
                  </div>

                  {/* Media Frame */}
                  <div className="relative w-full rounded-2xl overflow-hidden bg-[#dfd3c3] aspect-video mb-5 shadow-inner">
                    {chap.mediaType === 'video' ? (
                      <AutoPlayVideo src={chap.mediaSrc} alt={chap.title} />
                    ) : (
                      <img 
                        src={chap.coverImage} 
                        alt={chap.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-medium text-[#2b2622] tracking-tight mb-2 group-hover:text-[#8c3a3a] transition-colors">
                    {chap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2b2622]/75 leading-relaxed mb-4">
                    {chap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2b2622]/10 flex items-center justify-between">
                  <span className="font-['Caveat'] text-[#8c3a3a] text-lg font-bold">
                    {chap.quote}
                  </span>
                  <a
                    href={chap.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-[#fcfaf8] text-[#522D21] hover:bg-[#FCEBED] border border-[#522D21]/20 transition-all hover:scale-110 shadow-xs"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#ede4d8] border border-[#2b2622]/15 text-center flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
          <span className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold block mb-2">
            Step into the warmth ♡
          </span>
          <h2 className="hero-title text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2b2622] mb-4">
            Join our next meetup & gathering.
          </h2>
          <p className="text-sm sm:text-base text-[#2b2622]/75 leading-relaxed mb-8 max-w-lg mx-auto font-normal">
            Whether you want to share a story, join our beach meditation, or simply enjoy silent presence with good souls, you are welcome here.
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
        </div>

      </div>

      {/* Lightbox Modal for Pin */}
      <AnimatePresence>
        {selectedPin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPin(null)}
              className="fixed inset-0 bg-[#2b2622]/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-[#fcfaf8] border border-[#2b2622]/20 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-['Caveat'] text-[#8c3a3a] text-2xl font-bold">{selectedPin.chapter}</span>
                  <h3 className="text-xl font-medium text-[#2b2622]">{selectedPin.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedPin(null)}
                  className="w-9 h-9 rounded-full bg-[#ede4d8] hover:bg-[#dfd3c3] text-[#2b2622] flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="w-full rounded-2xl overflow-hidden bg-[#dfd3c3] aspect-video mb-4 shadow-md">
                {selectedPin.type === 'video' ? (
                  <AutoPlayVideo src={selectedPin.src!} alt={selectedPin.title} />
                ) : selectedPin.type === 'quote' ? (
                  <div className="w-full h-full p-8 flex items-center justify-center bg-gradient-to-br from-[#f8ecec] to-[#ede4d8]">
                    <p className="font-['Caveat'] text-[#8c3a3a] text-3xl font-bold text-center">
                      {selectedPin.note}
                    </p>
                  </div>
                ) : (
                  <img src={selectedPin.src} alt={selectedPin.title} className="w-full h-full object-cover" />
                )}
              </div>

              {selectedPin.note && selectedPin.type !== 'quote' && (
                <p className="font-['Caveat'] text-[#8c3a3a] text-2xl font-bold text-center mb-4">
                  {selectedPin.note}
                </p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-[#2b2622]/10">
                <span className="text-xs uppercase tracking-wider text-[#2b2622]/60 font-semibold">
                  Tag: {selectedPin.tag}
                </span>
                <a
                  href={selectedPin.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 font-semibold px-5 py-2 rounded-full hover:bg-[#f6dbe0] transition-all text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <span>View Post on Instagram</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal for Chapter */}
      <AnimatePresence>
        {selectedChapter && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChapter(null)}
              className="fixed inset-0 bg-[#2b2622]/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl bg-[#fcfaf8] border border-[#2b2622]/20 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-['Caveat'] text-[#8c3a3a] text-3xl font-bold">#{selectedChapter.number}</span>
                  <div>
                    <h3 className="text-xl font-medium text-[#2b2622]">{selectedChapter.title}</h3>
                    <span className="text-[10px] font-semibold text-[#522D21] uppercase tracking-wider">{selectedChapter.tag}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedChapter(null)}
                  className="w-9 h-9 rounded-full bg-[#ede4d8] hover:bg-[#dfd3c3] text-[#2b2622] flex items-center justify-center transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="w-full rounded-2xl overflow-hidden bg-[#dfd3c3] aspect-video mb-4 shadow-md">
                {selectedChapter.mediaType === 'video' ? (
                  <AutoPlayVideo src={selectedChapter.mediaSrc} alt={selectedChapter.title} />
                ) : (
                  <img src={selectedChapter.coverImage} alt={selectedChapter.title} className="w-full h-full object-cover" />
                )}
              </div>

              <p className="font-['Caveat'] text-[#8c3a3a] text-2xl font-bold text-center mb-3">
                {selectedChapter.quote}
              </p>

              <p className="text-xs sm:text-sm text-[#2b2622]/80 leading-relaxed mb-4">
                {selectedChapter.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedChapter.highlights.map((h, i) => (
                  <span key={i} className="text-[11px] bg-[#ede4d8] px-3 py-1 rounded-full font-medium text-[#2b2622]/80">
                    ✦ {h}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-end pt-3 border-t border-[#2b2622]/10">
                <a
                  href={selectedChapter.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 font-semibold px-6 py-2.5 rounded-full hover:bg-[#f6dbe0] transition-all text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <span>Open Post on Instagram</span>
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
