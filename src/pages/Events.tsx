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

export interface EventMedia {
  id: string;
  type: 'image' | 'video';
  src: string;
  caption?: string;
  aspect?: string; // 'aspect-square' | 'aspect-[3/4]' | 'aspect-[4/5]' | 'aspect-video'
}

export interface EventAlbum {
  id: number;
  number: string;
  title: string;
  tag: string;
  description: string;
  quote: string;
  instagramLink: string;
  coverMedia: EventMedia;
  gallery: EventMedia[];
}

// 7 Primary Event Collections (Each event contains an array of multiple images & videos)
const EVENT_ALBUMS: EventAlbum[] = [
  {
    id: 1,
    number: "01",
    title: "Human. Stories. Connection.",
    tag: "Community Circle",
    description: "An intimate circle where we sat together to share personal stories, practice active listening, and create genuine bonds without pretense.",
    quote: "“When you speak and someone truly listens, the world feels lighter.”",
    instagramLink: "https://www.instagram.com/p/DVl32cQgIUO/",
    coverMedia: {
      id: "1-cov",
      type: "video",
      src: activeListeningVideoUrl,
      caption: "Vulnerability & listening circle by the shore",
      aspect: "aspect-[4/5]"
    },
    gallery: [
      { id: "1-1", type: "video", src: activeListeningVideoUrl, caption: "Quiet presence by the sea", aspect: "aspect-[3/4]" },
      { id: "1-2", type: "image", src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", caption: "Heartfelt conversations in a warm circle", aspect: "aspect-square" },
      { id: "1-3", type: "image", src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", caption: "Safe space without judgments", aspect: "aspect-[4/5]" },
      { id: "1-4", type: "image", src: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80", caption: "Evening beach warmth and chai", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 2,
    number: "02",
    title: "Stones and Stories",
    tag: "Creative Keepsakes",
    description: "Gathering by the sea to paint meaningful memories onto smooth stones—turning moments into physical keepsakes.",
    quote: "“A stone carved by waves, painted with memories.”",
    instagramLink: "https://www.instagram.com/p/DVl-pExEzr7/",
    coverMedia: {
      id: "2-cov",
      type: "image",
      src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      caption: "Painted stones and acrylic brushes",
      aspect: "aspect-[4/5]"
    },
    gallery: [
      { id: "2-1", type: "image", src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", caption: "Hand-painted memory stones", aspect: "aspect-[4/5]" },
      { id: "2-2", type: "image", src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80", caption: "Watercolor palette and smooth pebbles", aspect: "aspect-square" },
      { id: "2-3", type: "image", src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80", caption: "Crafting in the sand breeze", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 3,
    number: "03",
    title: "Strokes and Chords",
    tag: "Art & Music",
    description: "An open evening of acoustic guitar melodies, canvas painting, and shared artistic expression beneath the sunset.",
    quote: "“Where music paints the silence and colors sing.”",
    instagramLink: "https://www.instagram.com/reel/DXrp4wBAKt7/",
    coverMedia: {
      id: "3-cov",
      type: "video",
      src: sharedPresenceVideoUrl,
      caption: "Acoustic jamming & live brushstrokes",
      aspect: "aspect-[4/5]"
    },
    gallery: [
      { id: "3-1", type: "video", src: sharedPresenceVideoUrl, caption: "Fingerpicking acoustic chords", aspect: "aspect-[3/4]" },
      { id: "3-2", type: "image", src: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80", caption: "Guitar resting on golden sand", aspect: "aspect-[4/5]" },
      { id: "3-3", type: "image", src: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80", caption: "Playing under fairy lights", aspect: "aspect-square" },
      { id: "3-4", type: "image", src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80", caption: "Freeform colors on canvas", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 4,
    number: "04",
    title: "Breathe with the Wave",
    tag: "Beach Mindfulness",
    description: "Early morning beachside breathwork. Aligning our rhythm to the gentle ocean waves and soaking in the morning breeze.",
    quote: "“Inhale peace from the ocean breeze, exhale the noise.”",
    instagramLink: "https://www.instagram.com/reel/DXo0AIezkxv/",
    coverMedia: {
      id: "4-cov",
      type: "video",
      src: aboutVideoUrl,
      caption: "Morning ocean tide breathwork",
      aspect: "aspect-[4/5]"
    },
    gallery: [
      { id: "4-1", type: "video", src: aboutVideoUrl, caption: "Ebb and flow of the tide", aspect: "aspect-[3/4]" },
      { id: "4-2", type: "image", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", caption: "Morning golden shoreline", aspect: "aspect-[4/5]" },
      { id: "4-3", type: "image", src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80", caption: "Outdoor meditation circle", aspect: "aspect-square" },
      { id: "4-4", type: "image", src: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80", caption: "Barefoot by the water edge", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 5,
    number: "05",
    title: "The Colour Chase",
    tag: "Interactive Fun",
    description: "Playful challenges, outdoor team quests, and spontaneous laughter under the open sky to bring out our inner child.",
    quote: "“Laughter is the shortest distance between two hearts.”",
    instagramLink: "https://www.instagram.com/reel/DXmbIQmANMO/",
    coverMedia: {
      id: "5-cov",
      type: "image",
      src: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80",
      caption: "Vibrant color powder explosion and joy",
      aspect: "aspect-[4/5]"
    },
    gallery: [
      { id: "5-1", type: "image", src: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80", caption: "Color splashes under the sun", aspect: "aspect-[4/5]" },
      { id: "5-2", type: "image", src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80", caption: "Team laughter and outdoor games", aspect: "aspect-square" },
      { id: "5-3", type: "image", src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80", caption: "Candid film polaroids", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 6,
    number: "06",
    title: "Shades of Us",
    tag: "Identity & Voices",
    description: "Reflecting on our varied personal journeys, exploring identity, and celebrating the unique perspectives we each bring.",
    quote: "“Every shade of your story deserves to be heard with warmth.”",
    instagramLink: "https://www.instagram.com/reel/DXXFrAdgPvE/",
    coverMedia: {
      id: "6-cov",
      type: "video",
      src: safeSpacesVideoUrl,
      caption: "Shared identity and diverse perspectives",
      aspect: "aspect-[4/5]"
    },
    gallery: [
      { id: "6-1", type: "video", src: safeSpacesVideoUrl, caption: "Open discussion floor", aspect: "aspect-[3/4]" },
      { id: "6-2", type: "image", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", caption: "Natural portrait in warm light", aspect: "aspect-[4/5]" },
      { id: "6-3", type: "image", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80", caption: "Authentic smiles and listening", aspect: "aspect-square" },
      { id: "6-4", type: "image", src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80", caption: "Sunset silhouettes", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: 7,
    number: "07",
    title: "Bracelets & Besties",
    tag: "Craft & Friendship",
    description: "Weaving friendship bands, sharing colored beads, and exchanging warm handmade tokens of appreciation.",
    quote: "“Woven with threads of laughter, sealed with kindness.”",
    instagramLink: "https://www.instagram.com/reel/DXHevLgki0u/",
    coverMedia: {
      id: "7-cov",
      type: "image",
      src: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80",
      caption: "Handmade woven friendship bands",
      aspect: "aspect-[4/5]"
    },
    gallery: [
      { id: "7-1", type: "image", src: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80", caption: "Matching friendship bands", aspect: "aspect-[4/5]" },
      { id: "7-2", type: "image", src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80", caption: "Beading threads and charms", aspect: "aspect-square" },
      { id: "7-3", type: "image", src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", caption: "Friends laughing together", aspect: "aspect-[3/4]" }
    ]
  }
];

const Events = () => {
  const [activeAlbum, setActiveAlbum] = useState<EventAlbum | null>(null);
  const [activeMediaPreview, setActiveMediaPreview] = useState<EventMedia | null>(null);

  return (
    <div className="relative bg-[#fcfaf8] text-[#2b2622] min-h-screen overflow-x-hidden">
      {/* Background Decorative Artwork */}
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
        
        {/* Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ede4d8] border border-[#2b2622]/10 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#8c3a3a] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#522D21]">
              Photo & Video Scrapbook
            </span>
          </div>

          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-8xl mb-4 text-[#2b2622] tracking-tight">
            Our Events
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#2b2622]/75 max-w-xl mx-auto leading-relaxed font-normal">
            Click into any event chapter to explore its full album of photos, video clips, and memories.
          </p>
        </motion.div>

        {/* Pinterest-Style Multi-Media Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {EVENT_ALBUMS.map((album, index) => {
            const totalMediaCount = album.gallery.length;

            return (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                onClick={() => setActiveAlbum(album)}
                className="group relative rounded-3xl p-5 bg-[#ede4d8]/95 backdrop-blur-md border border-[#2b2622]/15 shadow-md hover:shadow-2xl hover:border-[#522D21]/40 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Washi Tape Accent */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-100/70 border-x border-[#2b2622]/20 shadow-xs rotate-[-2deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />

                <div>
                  {/* Top Bar: Chapter & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-['Caveat'] text-[#8c3a3a] text-3xl font-bold">
                      Chapter #{album.number}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#fcfaf8] border border-[#2b2622]/10 text-[#522D21]">
                      {album.tag}
                    </span>
                  </div>

                  {/* Main Cover Media */}
                  <div className="relative w-full rounded-2xl overflow-hidden bg-[#dfd3c3] aspect-[4/3] mb-3 shadow-inner">
                    {album.coverMedia.type === 'video' ? (
                      <AutoPlayVideo src={album.coverMedia.src} alt={album.title} />
                    ) : (
                      <img 
                        src={album.coverMedia.src} 
                        alt={album.title} 
                        className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        loading="lazy"
                      />
                    )}

                    {/* Album Media Count Badge */}
                    <div className="absolute bottom-3 right-3 bg-[#fcfaf8]/95 backdrop-blur-md border border-[#2b2622]/15 rounded-full px-3 py-1 text-[11px] font-semibold text-[#522D21] flex items-center gap-1.5 shadow-sm">
                      <span>📸 {totalMediaCount} Media Items</span>
                    </div>
                  </div>

                  {/* Polaroid Mini Preview Strip */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {album.gallery.slice(0, 3).map((item, idx) => (
                      <div 
                        key={item.id} 
                        className="relative aspect-square rounded-xl overflow-hidden bg-[#dfd3c3] border border-[#2b2622]/10 shadow-xs"
                      >
                        {item.type === 'video' ? (
                          <AutoPlayVideo src={item.src} alt={item.caption || "Clip"} />
                        ) : (
                          <img 
                            src={item.src} 
                            alt={item.caption || "Snapshot"} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                          />
                        )}
                        {idx === 2 && totalMediaCount > 3 && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white font-bold text-xs">
                            +{totalMediaCount - 2}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-medium text-[#2b2622] tracking-tight mb-1.5 group-hover:text-[#8c3a3a] transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2b2622]/75 leading-relaxed mb-3 line-clamp-2">
                    {album.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#2b2622]/10 flex items-center justify-between mt-auto">
                  <span className="font-['Caveat'] text-[#8c3a3a] text-lg font-bold truncate max-w-[200px]">
                    {album.quote}
                  </span>
                  <button className="text-xs font-semibold text-[#522D21] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Album</span>
                    <span>→</span>
                  </button>
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

      {/* Full Event Multi-Media Album Modal */}
      <AnimatePresence>
        {activeAlbum && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveAlbum(null)}
              className="fixed inset-0 bg-[#2b2622]/70 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="relative w-full max-w-4xl bg-[#fcfaf8] border border-[#2b2622]/20 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Header */}
              <div className="p-5 sm:p-6 border-b border-[#2b2622]/10 flex items-center justify-between bg-[#ede4d8]">
                <div className="flex items-center gap-3">
                  <span className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold">
                    #{activeAlbum.number}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-[#2b2622] tracking-tight">
                      {activeAlbum.title}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#522D21] uppercase tracking-wider">
                      {activeAlbum.tag} • {activeAlbum.gallery.length} Photos & Clips
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveAlbum(null)}
                  className="w-10 h-10 rounded-full bg-[#fcfaf8] hover:bg-[#dfd3c3] text-[#2b2622] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Modal Body (Scrollable Multi-Media Wall) */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Quote Callout */}
                <div className="p-4 rounded-2xl bg-[#ede4d8] border border-[#2b2622]/10 text-center">
                  <p className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-bold">
                    {activeAlbum.quote}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#2b2622]/85 leading-relaxed">
                  {activeAlbum.description}
                </p>

                {/* Multi-Media Pinterest Masonry Gallery for this Event */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#2b2622]/50 font-semibold mb-4">
                    Event Photo & Video Gallery ({activeAlbum.gallery.length} items)
                  </h4>
                  <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                    {activeAlbum.gallery.map((media) => (
                      <div 
                        key={media.id}
                        onClick={() => setActiveMediaPreview(media)}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-[#dfd3c3] border border-[#2b2622]/10 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                      >
                        <div className={`w-full ${media.aspect || 'aspect-[4/5]'}`}>
                          {media.type === 'video' ? (
                            <AutoPlayVideo src={media.src} alt={media.caption || "Event Clip"} />
                          ) : (
                            <img 
                              src={media.src} 
                              alt={media.caption || "Event Photo"} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                          )}
                        </div>

                        {/* Caption Overlay */}
                        {media.caption && (
                          <div className="p-2.5 bg-[#fcfaf8] border-t border-[#2b2622]/10 text-[11px] font-medium text-[#2b2622]/80">
                            {media.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-5 border-t border-[#2b2622]/10 bg-[#ede4d8]/50 flex items-center justify-between gap-4">
                <a 
                  href={activeAlbum.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 font-semibold py-3 px-6 rounded-full hover:bg-[#f6dbe0] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>View Post on Instagram</span>
                </a>
                <button 
                  onClick={() => setActiveAlbum(null)}
                  className="py-3 px-6 rounded-full bg-[#fcfaf8] border border-[#2b2622]/15 text-[#2b2622] hover:bg-[#ebe3d9] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full-Screen Individual Media Lightbox */}
      <AnimatePresence>
        {activeMediaPreview && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMediaPreview(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl z-10 bg-black flex flex-col items-center justify-center"
            >
              <button 
                onClick={() => setActiveMediaPreview(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
              {activeMediaPreview.type === 'video' ? (
                <video 
                  src={activeMediaPreview.src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  controls 
                  className="max-h-[80vh] w-auto object-contain"
                />
              ) : (
                <img 
                  src={activeMediaPreview.src} 
                  alt={activeMediaPreview.caption || "Preview"} 
                  className="max-h-[80vh] w-auto object-contain"
                />
              )}
              {activeMediaPreview.caption && (
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-center text-sm font-medium">
                  {activeMediaPreview.caption}
                </div>
              )}
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
      aria-label={alt || 'Event Video'}
      className="w-full h-full object-cover pointer-events-none"
    />
  );
};

export default Events;
