import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';
import ctaBgUrl from '../assets/cta-bg.png';
import heroBgUrl from '../assets/hero-bg.png';
import bodyBgUrl from '../assets/body.png';
import activeListeningVideoUrl from '../assets/active-listening.mp4';
import safeSpacesVideoUrl from '../assets/safe-spaces.mp4';
import sharedPresenceVideoUrl from '../assets/shared-presence.mp4';

interface PostItem {
  id: number;
  type: 'video' | 'image';
  src: string;
  caption: string;
  likes: string;
  isReel?: boolean;
}

const INSTA_POSTS: PostItem[] = [
  { id: 1, type: 'video', src: activeListeningVideoUrl, caption: 'Active listening circle. Speaking without judgment 🌿', likes: '428', isReel: true },
  { id: 2, type: 'image', src: ctaBgUrl, caption: 'Night beach gathering with the circle of warmth 🌊', likes: '892' },
  { id: 3, type: 'video', src: sharedPresenceVideoUrl, caption: 'Silent presence & ambient study rooms ✨', likes: '614', isReel: true },
  { id: 4, type: 'image', src: heroBgUrl, caption: 'Listening, connecting, belonging 💫', likes: '1.1k' },
  { id: 5, type: 'video', src: safeSpacesVideoUrl, caption: 'Safe & toxic-free spaces for genuine human connection 🤝', likes: '753', isReel: true },
  { id: 6, type: 'image', src: bodyBgUrl, caption: 'Moments of belonging and shared laughter 💛', likes: '940' },
];

const HIGHLIGHTS = [
  { id: 1, title: 'Meetups', img: ctaBgUrl },
  { id: 2, title: 'Stories', img: heroBgUrl },
  { id: 3, title: 'Beach', img: bodyBgUrl },
  { id: 4, title: 'Presence', img: logoImg },
];

const ImageGallery = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 max-w-6xl mx-auto border-t border-[#2b2622]/10 bg-[#fcfaf8]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 max-w-5xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-semibold">
              live instagram feed
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-3">
            On the gram.
          </h2>
          <p className="text-lg text-[#2b2622]/60 max-w-md leading-relaxed">
            Glimpses into our community, safe spaces, and shared moments.
          </p>
        </div>
        <a 
          href="https://www.instagram.com/nizhal.community/" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 text-sm font-medium border border-[#2b2622]/15 bg-[#2b2622]/5 text-[#2b2622] rounded-full px-7 py-3.5 hover:bg-[#522D21] hover:border-[#522D21] hover:text-white transition-all cursor-pointer shadow-sm hover:scale-105"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          Follow @nizhal.community
        </a>
      </div>

      {/* Realistic Compact iPhone Showcase - Zero Inner Scroll & Full Direct Portal */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center"
      >
        <a
          href="https://www.instagram.com/nizhal.community/" 
          target="_blank" 
          rel="noreferrer"
          className="group relative block w-full max-w-[295px] sm:max-w-[325px] bg-[#121212] p-2 sm:p-2.5 rounded-[44px] sm:rounded-[50px] shadow-[0_25px_70px_rgba(43,38,34,0.35)] border-[3px] border-[#33302c] cursor-pointer hover:scale-[1.02] hover:shadow-[0_30px_90px_rgba(82,45,33,0.3)] transition-all duration-500"
        >
          {/* Outer Hardware Accents */}
          <div className="absolute -left-1 top-24 w-0.5 h-6 bg-[#33302c] rounded-l-md" />
          <div className="absolute -left-1 top-34 w-0.5 h-9 bg-[#33302c] rounded-l-md" />
          <div className="absolute -left-1 top-46 w-0.5 h-9 bg-[#33302c] rounded-l-md" />
          <div className="absolute -right-1 top-30 w-0.5 h-12 bg-[#33302c] rounded-r-md" />

          {/* iPhone Screen Container - 100% No Scroll, Complete Page View */}
          <div className="w-full bg-[#fcfaf8] text-[#1a1a1a] rounded-[36px] sm:rounded-[42px] overflow-hidden select-none relative flex flex-col font-sans">
            
            {/* Top Status Bar & Dynamic Island */}
            <div className="pt-2.5 px-4 pb-1.5 flex items-center justify-between bg-[#fcfaf8] z-30">
              <span className="text-[11px] font-semibold tracking-tight text-black">9:41</span>
              {/* Dynamic Island Notch */}
              <div className="w-20 h-4 bg-black rounded-full flex items-center justify-between px-2">
                <div className="w-2 h-2 bg-[#1a1a1a] rounded-full border border-white/10" />
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              </div>
              {/* Cellular & Battery */}
              <div className="flex items-center gap-1 text-black">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 18.25C5.97 19.98 8.28 21 10.8 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/></svg>
                <div className="w-4 h-2 border border-black rounded-xs p-0.5 flex items-center">
                  <div className="w-full h-full bg-black rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Safari Live Browser URL Bar */}
            <div className="mx-3 my-1 px-3 py-1 bg-black/5 rounded-full flex items-center justify-between text-[11px] text-[#1a1a1a]/70 group-hover:bg-black/10 transition-colors">
              <div className="flex items-center gap-1.5 truncate">
                <svg className="w-3 h-3 text-[#1a1a1a]/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span className="font-medium truncate text-[10px]">instagram.com/nizhal.community</span>
              </div>
              <svg className="w-3 h-3 text-[#1a1a1a]/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </div>

            {/* Instagram Profile Navigation Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 bg-[#fcfaf8]">
              <div className="flex items-center gap-1 font-bold text-sm tracking-tight text-[#1a1a1a]">
                <span>nizhal.community</span>
                <svg className="w-3.5 h-3.5 text-blue-500 fill-blue-500" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
              <div className="flex items-center gap-3 text-black">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
              </div>
            </div>

            {/* Profile Bio & Stats Row */}
            <div className="p-3 pb-1">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                {/* Profile Picture with Story Ring */}
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
                  <img 
                    src={logoImg} 
                    alt="Nizhal Community" 
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white" 
                  />
                </div>

                {/* Live Stats Row */}
                <div className="flex-1 flex justify-around text-center">
                  <div>
                    <span className="block font-bold text-xs sm:text-sm text-[#1a1a1a]">18</span>
                    <span className="text-[10px] text-[#1a1a1a]/60 font-medium">Posts</span>
                  </div>
                  <div>
                    <span className="block font-bold text-xs sm:text-sm text-[#1a1a1a]">2,410</span>
                    <span className="text-[10px] text-rose-600 font-semibold flex items-center justify-center gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block mr-0.5" />
                      Followers
                    </span>
                  </div>
                  <div>
                    <span className="block font-bold text-xs sm:text-sm text-[#1a1a1a]">142</span>
                    <span className="text-[10px] text-[#1a1a1a]/60 font-medium">Following</span>
                  </div>
                </div>
              </div>

              {/* Bio Details */}
              <div className="text-[11px] leading-tight mb-2.5 text-[#1a1a1a]">
                <h3 className="font-bold text-xs mb-0.5">Nizhal • Circle of Warmth</h3>
                <p className="text-[#1a1a1a]/85 font-normal">A quiet space beside you 🌿</p>
                <p className="text-[#1a1a1a]/85 font-normal">Human stories • Active listening • Safe space</p>
                <span className="text-blue-600 font-medium block mt-0.5 text-[10px]">
                  🔗 nizhal.community
                </span>
              </div>

              {/* Profile Action Buttons */}
              <div className="flex gap-1.5 mb-2.5">
                <span className="flex-1 bg-[#1a1a1a] text-white font-semibold text-[11px] py-1 rounded-md text-center group-hover:bg-black transition-colors">
                  Follow
                </span>
                <span className="flex-1 bg-[#1a1a1a]/10 text-[#1a1a1a] font-semibold text-[11px] py-1 rounded-md text-center">
                  Message
                </span>
              </div>

              {/* Story Highlights */}
              <div className="flex gap-2.5 justify-between pb-1">
                {HIGHLIGHTS.map(h => (
                  <div key={h.id} className="flex flex-col items-center gap-0.5 shrink-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 border border-black/20 group-hover:border-rose-500 transition-colors">
                      <img src={h.img} alt={h.title} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <span className="text-[9px] text-[#1a1a1a]/70 font-medium">{h.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Tab Bar */}
            <div className="flex border-t border-b border-black/10">
              <div className="flex-1 py-1 flex justify-center border-b-2 border-black">
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z"/></svg>
              </div>
              <div className="flex-1 py-1 flex justify-center text-black/40">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
              </div>
              <div className="flex-1 py-1 flex justify-center text-black/40">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
            </div>

            {/* Live Media Grid Posts */}
            <div className="grid grid-cols-3 gap-0.5 bg-black/5">
              {INSTA_POSTS.map(post => (
                <div
                  key={post.id}
                  className="relative aspect-square overflow-hidden group/post bg-black/10"
                >
                  {post.type === 'video' ? (
                    <video
                      src={post.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                      className="w-full h-full object-cover grayscale contrast-125 group-hover/post:grayscale-0 group-hover/post:scale-105 transition-all duration-500 pointer-events-none"
                    />
                  ) : (
                    <img
                      src={post.src}
                      alt={post.caption}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover/post:grayscale-0 group-hover/post:scale-105 transition-all duration-500"
                    />
                  )}

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/post:opacity-100 transition-opacity flex items-center justify-center text-white pointer-events-none">
                    <svg className="w-4 h-4 fill-white drop-shadow" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Instagram Bottom App Bar */}
            <div className="py-2 px-5 flex justify-between items-center bg-[#fcfaf8] border-t border-black/10">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <img src={logoImg} alt="Profile" className="w-4 h-4 rounded-full object-cover border border-black/30" />
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="pb-1 pt-0.5 flex justify-center bg-[#fcfaf8]">
              <div className="w-20 h-0.5 bg-black/60 rounded-full" />
            </div>
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default ImageGallery;
