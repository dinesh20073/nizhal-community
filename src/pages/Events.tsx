import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Local Video Assets (Preserved original community videos)
import activeListeningVideoUrl from '../assets/active-listening.mp4';
import safeSpacesVideoUrl from '../assets/safe-spaces.mp4';
import sharedPresenceVideoUrl from '../assets/shared-presence.mp4';
import aboutVideoUrl from '../assets/about-bg.mp4';

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

// Original community videos preserved as in the page template
const COMMUNITY_VIDEOS: InstagramFeedItem[] = [
  {
    id: 'comm-vid-1',
    media_type: 'VIDEO',
    media_url: activeListeningVideoUrl,
    caption: 'Human. Stories. Connection. — listening deeply, no rush, just warmth ♡',
    permalink: 'https://www.instagram.com/p/DVl32cQgIUO/',
    timestamp: '2026-11-20T14:30:00+0000',
    rotation: '-rotate-2',
    widthClass: 'w-full sm:w-80',
    tapePosition: 'top',
  },
  {
    id: 'comm-vid-2',
    media_type: 'VIDEO',
    media_url: sharedPresenceVideoUrl,
    caption: 'Strokes and Chords — acoustic strings & watercolor shades under dusk sky 🎸',
    permalink: 'https://www.instagram.com/reel/DXrp4wBAKt7/',
    timestamp: '2026-11-18T16:00:00+0000',
    rotation: 'rotate-2',
    widthClass: 'w-full sm:w-80',
    tapePosition: 'top-right',
  },
  {
    id: 'comm-vid-3',
    media_type: 'VIDEO',
    media_url: aboutVideoUrl,
    caption: 'Breathe with the Wave — early morning tide & deep breaths by the shoreline 🌊',
    permalink: 'https://www.instagram.com/reel/DXo0AIezkxv/',
    timestamp: '2026-11-12T06:30:00+0000',
    rotation: '-rotate-3',
    widthClass: 'w-full sm:w-80',
    tapePosition: 'top',
  },
  {
    id: 'comm-vid-4',
    media_type: 'VIDEO',
    media_url: safeSpacesVideoUrl,
    caption: 'Safe Spaces & Open Hearts — unapologetically ourselves, held in trust ✨',
    permalink: 'https://www.instagram.com/reel/DXXFrAdgPvE/',
    timestamp: '2026-11-04T15:45:00+0000',
    rotation: 'rotate-3',
    widthClass: 'w-full sm:w-80',
    tapePosition: 'top-left',
  },
];

const Events = () => {
  const [items, setItems] = useState<InstagramFeedItem[]>(COMMUNITY_VIDEOS);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<InstagramFeedItem | null>(null);
  const [isLiveFeed, setIsLiveFeed] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Fetch real-time Instagram photos from the stream (only photos change)
  useEffect(() => {
    let isMounted = true;

    async function fetchInstagramRealtime() {
      try {
        setLoading(true);
        const res = await fetch('/api/instagram/media?limit=40', {
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (isMounted && Array.isArray(data.media)) {
          // Filter ONLY photos and carousel albums from the feed stream
          const rawPhotos = data.media.filter(
            (m: any) => m.media_type === 'IMAGE' || m.media_type === 'CAROUSEL_ALBUM'
          );

          const formattedPhotos: InstagramFeedItem[] = rawPhotos.map((raw: any, idx: number) => ({
            id: raw.id || `ig-photo-${idx}`,
            media_type: raw.media_type || 'IMAGE',
            media_url: raw.media_url || raw.thumbnail_url || '',
            thumbnail_url: raw.thumbnail_url || raw.media_url || '',
            caption: raw.caption || 'moments together in our circle ♡',
            permalink: raw.permalink || 'https://www.instagram.com/nizhal.community/',
            timestamp: raw.timestamp || new Date().toISOString(),
            rotation: ROTATIONS[(idx + 1) % ROTATIONS.length],
            widthClass: 'w-full sm:w-80',
            tapePosition: TAPE_POSITIONS[idx % TAPE_POSITIONS.length],
          }));

          // Interleave the preserved community videos with the dynamic live photos
          const combined: InstagramFeedItem[] = [];
          const vids = [...COMMUNITY_VIDEOS];
          const photos = [...formattedPhotos];

          let vIdx = 0;
          let pIdx = 0;

          // Seamless artistic collage layout (e.g. video, 2-3 photos, video, 2-3 photos...)
          while (vIdx < vids.length || pIdx < photos.length) {
            if (vIdx < vids.length) {
              combined.push(vids[vIdx++]);
            }
            if (pIdx < photos.length) {
              combined.push(photos[pIdx++]);
            }
            if (pIdx < photos.length) {
              combined.push(photos[pIdx++]);
            }
          }

          setItems(combined.length > 0 ? combined : COMMUNITY_VIDEOS);
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
          <p className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold mb-1">
            our little scrapbook ♡
          </p>

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

        {/* Gallery Collage Wall - All Items in the Signature Polaroid Frame Template */}
        <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-10 md:gap-12">
          {items.map((item, index) => {
            const isVideo = item.media_type === 'VIDEO';

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
                  {/* Photo / Video Frame */}
                  <div className="relative w-full aspect-[4/5] bg-[#dfd3c3] overflow-hidden rounded-xs mb-3 shadow-inner">
                    {isVideo ? (
                      <AutoPlayVideo src={item.media_url} poster={item.thumbnail_url} />
                    ) : (
                      <img
                        src={item.media_url}
                        alt="Nizhal Community Post"
                        className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                        loading="lazy"
                      />
                    )}

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

        {/* Display More Button & Elfsight Instagram Feed */}
        <div className="mt-14 sm:mt-16 text-center max-w-6xl mx-auto">
          {!showMore ? (
            <button
              onClick={() => {
                setShowMore(true);
                setTimeout(() => {
                  window.dispatchEvent(new Event('resize'));
                }, 100);
              }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#8c3a3a] hover:bg-[#732f2f] text-white text-sm sm:text-base font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>Display More Moments ♡</span>
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between mb-6 px-2">
                <p className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-bold">
                  all community moments & reels ♡
                </p>
                <button
                  onClick={() => setShowMore(false)}
                  className="text-xs text-[#2b2622]/60 hover:text-[#8c3a3a] underline cursor-pointer"
                >
                  collapse
                </button>
              </div>

              {/* Elfsight Instagram Feed | Untitled Instagram Feed */}
              <div
                className="elfsight-app-9582f15f-fa64-4a65-b20d-4533e7869f05"
                data-elfsight-app-lazy
              />
            </div>
          )}
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full max-h-[92vh] flex flex-col relative border border-[#2b2622]/15"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#2b2622]/10 bg-[#fbf9f6]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#8c3a3a] text-white flex items-center justify-center text-xs font-bold">
                    NC
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#2b2622]">@nizhal.community</p>
                    <p className="text-[10px] text-[#2b2622]/60">
                      {new Date(selectedItem.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedItem.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#8c3a3a] font-medium hover:underline px-2 py-1 rounded-md hover:bg-[#8c3a3a]/10 transition-colors"
                  >
                    Open Instagram ↗
                  </a>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-8 h-8 rounded-full bg-[#2b2622]/5 hover:bg-[#2b2622]/10 text-[#2b2622] flex items-center justify-center transition-colors"
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
                  className="w-full h-full border-0 min-h-[500px]"
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
const AutoPlayVideo = ({ src, poster }: { src: string; poster?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current && !hasError) {
      const vid = videoRef.current;
      vid.playbackRate = 0.75;
      vid.defaultMuted = true;
      vid.muted = true;
      const play = () => {
        vid.play().catch(() => {});
      };
      play();
      vid.addEventListener('loadeddata', play, { once: true });
    }
  }, [src, hasError]);

  if (hasError && poster) {
    return (
      <img
        src={poster}
        alt="Instagram Reel thumbnail"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      controls={false}
      onError={() => setHasError(true)}
      disablePictureInPicture
      disableRemotePlayback
      preload="metadata"
      className="w-full h-full object-cover pointer-events-none"
    />
  );
};

export default Events;
