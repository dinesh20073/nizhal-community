import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Local Artwork Assets
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile.png';

export interface InstagramFeedItem {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  caption: string;
  permalink: string;
  timestamp: string;
  // Aesthetic Polaroid frame attributes
  rotation?: string;
  widthClass?: string;
  tapePosition?: 'top' | 'top-right' | 'top-left';
}

const ROTATIONS = ['-rotate-2', 'rotate-2', '-rotate-3', 'rotate-3', '-rotate-1', 'rotate-1'];
const TAPE_POSITIONS: ('top' | 'top-right' | 'top-left')[] = ['top', 'top-right', 'top-left'];

const Events = () => {
  const [items, setItems] = useState<InstagramFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<InstagramFeedItem | null>(null);
  const [isLiveFeed, setIsLiveFeed] = useState(false);

  // Fetch real-time Instagram posts automatically
  useEffect(() => {
    let isMounted = true;

    async function fetchInstagramRealtime() {
      try {
        setLoading(true);
        const res = await fetch('/api/instagram/media?limit=24', {
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (isMounted && Array.isArray(data.media)) {
          const formatted: InstagramFeedItem[] = data.media.map((raw: any, idx: number) => ({
            id: raw.id || `ig-${idx}`,
            media_type: raw.media_type || (raw.url?.endsWith('.mp4') ? 'VIDEO' : 'IMAGE'),
            media_url: raw.media_url || raw.url || '',
            thumbnail_url: raw.thumbnail_url || raw.media_url || raw.url || '',
            caption: raw.caption || raw.handwrittenNote || raw.description || 'moments together in our circle ♡',
            permalink: raw.permalink || raw.instagramLink || 'https://www.instagram.com/nizhal.community/',
            timestamp: raw.timestamp || new Date().toISOString(),
            rotation: ROTATIONS[idx % ROTATIONS.length],
            widthClass: 'w-full sm:w-80',
            tapePosition: TAPE_POSITIONS[idx % TAPE_POSITIONS.length],
          }));

          setItems(formatted);
          setIsLiveFeed(Boolean(data.configured && !data.isFallback));
        }
      } catch (err) {
        console.warn('Could not fetch real-time Instagram feed:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchInstagramRealtime();

    // Auto sync live in background every 5 minutes
    const interval = setInterval(fetchInstagramRealtime, 5 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative bg-[#f7f3ee] text-[#2b2622] min-h-screen overflow-x-hidden selection:bg-[#8c3a3a]/20">
      {/* Organic Warm Background Texture */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-20">
        <picture>
          <source media="(max-width: 768px)" srcSet={bodyMobileBgUrl} />
          <img src={bodyBgUrl} alt="Artistic Scrapbook Background" className="w-full h-full object-cover" />
        </picture>
      </div>

      <div className="relative z-10 pt-28 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          {/* Instagram Handle Badge */}
          <a
            href="https://www.instagram.com/nizhal.community/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8c3a3a]/10 hover:bg-[#8c3a3a]/15 text-[#8c3a3a] text-xs font-semibold uppercase tracking-wider mb-3 transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span>@nizhal.community</span>
            {isLiveFeed && (
              <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded-full lowercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                live
              </span>
            )}
          </a>

          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-7xl text-[#2b2622] tracking-tight mb-3">
            Gatherings & Memories
          </h1>

          <p className="font-['Caveat'] text-[#2b2622]/80 text-2xl sm:text-3xl leading-snug">
            realtime photos, video reels, and scribbled thoughts from our community circles.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading && items.length === 0 && (
          <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-10 md:gap-12 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-full sm:w-80 bg-white/70 p-4 rounded-md shadow-md border border-[#2b2622]/10">
                <div className="w-full aspect-[4/5] bg-[#dfd3c3]/50 rounded-xs mb-3" />
                <div className="h-4 bg-[#dfd3c3]/40 rounded-sm w-3/4 mb-2" />
                <div className="h-4 bg-[#dfd3c3]/30 rounded-sm w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State when no posts yet */}
        {!loading && items.length === 0 && (
          <div className="text-center py-16 max-w-md mx-auto">
            <p className="font-['Caveat'] text-[#8c3a3a] text-3xl font-bold mb-2">
              our circle memories are syncing ♡
            </p>
            <p className="text-sm text-[#2b2622]/60 mb-6">
              explore our latest community moments directly on Instagram.
            </p>
            <a
              href="https://www.instagram.com/nizhal.community/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8c3a3a] text-white text-xs font-semibold hover:bg-[#722e2e] transition-colors shadow-sm"
            >
              <span>Visit @nizhal.community on Instagram ↗</span>
            </a>
          </div>
        )}

        {/* Gallery Collage Wall - All Memories as Default */}
        <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-10 md:gap-12">
          {items.map((item, index) => {
            const isVideo = item.media_type === 'VIDEO';

            // ========================================================
            // REELS: Displayed SEPARATE WITHOUT THE POLAROID FRAME
            // Clean 9:16 vertical video card with dark gradient & badge
            // ========================================================
            if (isVideo) {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedItem(item)}
                  className="w-full sm:w-72 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl relative group bg-neutral-900 border border-[#2b2622]/15 cursor-pointer shrink-0"
                >
                  {/* Background Video Player or Thumbnail */}
                  <div className="absolute inset-0 w-full h-full">
                    {item.media_url?.endsWith('.mp4') ? (
                      <AutoPlayVideo src={item.media_url} />
                    ) : (
                      <img
                        src={item.thumbnail_url || item.media_url}
                        alt="Instagram Reel"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Dark Vignette Gradients for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

                  {/* Top Reel Badge */}
                  <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
                    <svg className="w-3 h-3 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                    </svg>
                    <span>Reel ✦</span>
                  </div>

                  {/* Top-Right Instagram Logo Icon */}
                  <a
                    href={item.permalink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white hover:bg-black/70 transition-colors border border-white/10"
                    title="Open on Instagram"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>

                  {/* Floating Center Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/30 scale-90 group-hover:scale-100 transition-transform">
                      <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Caption & Audio Note */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                    <p className="text-xs line-clamp-3 leading-relaxed text-white/90 font-light mb-2">
                      {item.caption}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-white/60 pt-2 border-t border-white/10">
                      <span className="flex items-center gap-1 text-white/80">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                        <span>Original audio</span>
                      </span>
                      <span className="text-amber-300 font-medium group-hover:underline">Play Reel ▷</span>
                    </div>
                  </div>
                </motion.div>
              );
            }

            // ========================================================
            // IMAGES & CAROUSELS: INSIDE THAT POLAROID FRAME WITH TAPE
            // Signature aesthetic Polaroid card with handwritten font
            // ========================================================
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedItem(item)}
                className={`relative group shrink-0 transition-all cursor-pointer ${item.rotation || '-rotate-1'} ${item.widthClass || 'w-full sm:w-80'}`}
              >
                {/* Washi Paper Tape Accents */}
                {item.tapePosition === 'top' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-100/80 border-x border-[#2b2622]/20 shadow-xs rotate-[-2deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
                )}
                {item.tapePosition === 'top-right' && (
                  <div className="absolute -top-3 -right-3 w-16 h-6 bg-amber-100/80 border-x border-[#2b2622]/20 shadow-xs rotate-[28deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
                )}
                {item.tapePosition === 'top-left' && (
                  <div className="absolute -top-3 -left-3 w-16 h-6 bg-amber-100/80 border-x border-[#2b2622]/20 shadow-xs rotate-[-28deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
                )}

                {/* Polaroid Frame Container */}
                <div className="bg-[#ffffff] p-3.5 pb-5 rounded-md shadow-xl border border-[#2b2622]/10 transition-shadow duration-300 group-hover:shadow-2xl">
                  {/* Photo Frame */}
                  <div className="relative w-full aspect-[4/5] bg-[#dfd3c3] overflow-hidden rounded-xs mb-3 shadow-inner">
                    <img
                      src={item.media_url}
                      alt="Nizhal Community Post"
                      className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />

                    {/* Carousel Indicator Badge */}
                    {item.media_type === 'CAROUSEL_ALBUM' && (
                      <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white p-1.5 rounded-full text-[10px]" title="Multiple photos">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <line x1="9" x2="15" y1="3" y2="3" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Handwritten Polaroid Caption */}
                  <div className="px-1 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-[#2b2622]/50 font-medium mb-1">
                      <span>@nizhal.community</span>
                      <a
                        href={item.permalink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#8c3a3a] hover:underline"
                      >
                        view post ↗
                      </a>
                    </div>
                    <p className="font-['Caveat'] text-[#8c3a3a] text-2xl font-bold leading-tight line-clamp-2">
                      {item.caption.split('\n')[0] || 'moments together ♡'}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Soulful Bottom Footer */}
        <div className="mt-28 text-center max-w-lg mx-auto">
          <p className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold mb-2">
            more memories in the making... ♡
          </p>
          <p className="text-xs sm:text-sm text-[#2b2622]/70 leading-relaxed font-normal">
            come sit beside us in our upcoming circles.
          </p>
        </div>
      </div>

      {/* Interactive Modal View: Plays directly inside the Instagram Embed view itself */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#ffffff] rounded-2xl overflow-hidden max-w-[460px] w-full max-h-[92vh] h-[640px] sm:h-[680px] flex flex-col shadow-2xl border border-[#2b2622]/20"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#2b2622]/10 bg-[#fcfaf8] shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-[#8c3a3a] flex items-center justify-center text-white">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-[#2b2622]">@nizhal.community</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#8c3a3a]/10 text-[#8c3a3a]">
                    {selectedItem.media_type === 'VIDEO' ? 'Reel' : 'Post'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedItem.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-[#8c3a3a] hover:underline font-medium"
                    title="Open on Instagram"
                  >
                    Open on Instagram ↗
                  </a>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-[#2b2622]/50 hover:text-[#2b2622] p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Live Playable Instagram Embed Iframe */}
              <div className="relative w-full flex-1 bg-[#f9f9f9] overflow-hidden">
                <iframe
                  src={`${selectedItem.permalink.replace(/\/+$/, '')}/embed/`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Instagram Embed Player"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Video Player Component for autoplay muted video loops
const AutoPlayVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const vid = videoRef.current;
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
      className="w-full h-full object-cover"
    />
  );
};

export default Events;
