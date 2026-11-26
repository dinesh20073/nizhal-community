import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Local Artwork Assets
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile.png';

export interface MediaSlide {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface InstagramFeedItem {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  caption: string;
  permalink: string;
  timestamp: string;
  likesCount?: number;
  commentsCount?: number;
  author?: {
    username: string;
    name: string;
    profilePictureUrl: string;
  };
  slides?: MediaSlide[];
  // Aesthetic Polaroid frame attributes (posts only)
  rotation?: string;
  widthClass?: string;
  tapePosition?: 'top' | 'top-right' | 'top-left';
}

const ROTATIONS = ['-rotate-2', 'rotate-2', '-rotate-3', 'rotate-3', '-rotate-1', 'rotate-1'];
const TAPE_POSITIONS: ('top' | 'top-right' | 'top-left')[] = ['top', 'top-right', 'top-left'];

const Events = () => {
  const [items, setItems] = useState<InstagramFeedItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Check mobile viewport for optimized fullscreen modal & video loop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch real-time Instagram posts & reels exclusively from the connected stream
  useEffect(() => {
    let isMounted = true;

    async function fetchInstagramRealtime() {
      try {
        setLoading(true);
        const res = await fetch('/api/instagram/media?limit=100', {
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (isMounted && Array.isArray(data.media) && data.media.length > 0) {
          const formatted: InstagramFeedItem[] = data.media.map((raw: any, idx: number) => ({
            id: raw.id || `ig-${idx}`,
            media_type: raw.media_type || (raw.media_url?.includes('.mp4') ? 'VIDEO' : 'IMAGE'),
            media_url: raw.media_url || raw.thumbnail_url || '',
            thumbnail_url: raw.thumbnail_url || raw.media_url || '',
            caption: raw.caption || 'moments together in our circle ♡',
            permalink: raw.permalink || 'https://www.instagram.com/nizhal.community/',
            timestamp: raw.timestamp || new Date().toISOString(),
            likesCount: raw.likesCount ?? 0,
            commentsCount: raw.commentsCount ?? 0,
            author: raw.author || {
              username: 'nizhal.community',
              name: 'Nizhal Community',
              profilePictureUrl: '',
            },
            slides: raw.slides && raw.slides.length > 0 ? raw.slides : [
              {
                type: raw.media_type === 'VIDEO' ? 'video' : 'image',
                url: raw.media_url || raw.thumbnail_url || '',
                thumbnail: raw.thumbnail_url || '',
              },
            ],
            rotation: ROTATIONS[idx % ROTATIONS.length],
            widthClass: 'w-full sm:w-80',
            tapePosition: TAPE_POSITIONS[idx % TAPE_POSITIONS.length],
          }));

          setItems(formatted);
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

  const visibleItems = items.slice(0, visibleCount);
  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  // Open modal for a specific item index
  const openModal = (idx: number) => {
    setSelectedIndex(idx);
    setActiveSlideIndex(0);
  };

  const closeModal = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedIndex(null);
    setActiveSlideIndex(0);
  }, []);

  const navigatePost = useCallback(
    (direction: 'prev' | 'next') => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (selectedIndex === null || items.length === 0) return;
      if (direction === 'prev') {
        setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
      } else {
        setSelectedIndex((selectedIndex + 1) % items.length);
      }
      setActiveSlideIndex(0);
    },
    [selectedIndex, items.length]
  );

  // Always keep sound on and autoplay reel video at full volume
  useEffect(() => {
    if (selectedIndex === null) return;
    const item = items[selectedIndex];
    if (!item) return;

    const currentSlide = item.slides?.[activeSlideIndex] || {
      type: item.media_type === 'VIDEO' ? 'video' : 'image',
      url: item.media_url,
    };

    const isVideo = currentSlide.type === 'video' || currentSlide.url?.includes('.mp4');
    if (!isVideo) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1.0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Ensure properties stay unmuted for user tap
        video.muted = false;
        video.volume = 1.0;
      });
    }
  }, [selectedIndex, activeSlideIndex, items]);

  // Keyboard navigation for modal
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigatePost('prev');
      if (e.key === 'ArrowRight') navigatePost('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeModal, navigatePost]);

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
          <p className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold mb-3">
            our little scrapbook ♡
          </p>

          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-7xl text-[#2b2622] tracking-tight mb-3">
            Gatherings & Memories
          </h1>

          <p className="font-['Caveat'] text-[#2b2622]/80 text-2xl sm:text-3xl leading-snug">
            realtime photos, video reels, and scribbled thoughts from our events.
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

        {/* Gallery Wall: Frame for Posts ONLY, Clean 9:16 for Reels */}
        <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-10 md:gap-12">
          {visibleItems.map((item, index) => {
            const isVideo = item.media_type === 'VIDEO';

            // ========================================================
            // REELS: EXACT TEMPLATE AS PROVIDED IN THE REFERENCE IMAGE
            // Clean black 9:16 card, Instagram camera glyph in top-right,
            // center video/thumbnail, and "@nizhal.community" in bottom-left.
            // ========================================================
            if (isVideo) {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openModal(index)}
                  onMouseEnter={() => {
                    if (item.media_url?.includes('.mp4')) {
                      const existing = document.querySelector(`link[href="${item.media_url}"]`);
                      if (!existing) {
                        const link = document.createElement('link');
                        link.rel = 'prefetch';
                        link.as = 'video';
                        link.href = item.media_url;
                        document.head.appendChild(link);
                      }
                    }
                  }}
                  className="w-full sm:w-72 aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative group bg-black cursor-pointer shrink-0 transition-all duration-300"
                >
                  {/* Center Video Player or Thumbnail */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                    {item.media_url?.includes('.mp4') ? (
                      <AutoPlayVideo 
                        src={item.media_url} 
                        poster={item.thumbnail_url} 
                        isModalOpen={selectedIndex !== null} 
                      />
                    ) : (
                      <img
                        src={item.thumbnail_url || item.media_url}
                        alt="Instagram Reel"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Top-Right: Clean Instagram Camera Icon */}
                  <div className="absolute top-4 right-4 z-20 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>

                  {/* Bottom-Left: Clean Handle Text */}
                  <div className="absolute bottom-4 left-4 z-20 text-white text-xs sm:text-[13px] font-semibold tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] select-none">
                    @nizhal.community
                  </div>
                </motion.div>
              );
            }

            // ========================================================
            // POSTS: INSIDE THAT SIGNATURE POLAROID FRAME WITH TAPE
            // ========================================================
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
                transition={{ duration: 0.3 }}
                onClick={() => openModal(index)}
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
                  {/* Photo Frame (4:5 Ratio) */}
                  <div className="relative w-full aspect-[4/5] bg-[#dfd3c3] overflow-hidden rounded-xs mb-3 shadow-inner">
                    <img
                      src={item.media_url}
                      alt="Nizhal Community Post"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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

        {/* Display More Button - Progressively loads more moments onto the wall */}
        {visibleCount < items.length && (
          <div className="mt-14 sm:mt-16 text-center max-w-md mx-auto">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 12, items.length))}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#8c3a3a] hover:bg-[#732f2f] text-white text-sm sm:text-base font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>Display More Moments ♡</span>
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}

        {/* Soulful Bottom Footer */}
        <div className="mt-24 sm:mt-28 text-center max-w-lg mx-auto">
          <p className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold mb-2">
            more memories in the making... ♡
          </p>
          <p className="text-xs sm:text-sm text-[#2b2622]/70 leading-relaxed font-normal">
            come sit beside us in our upcoming events.
          </p>
        </div>
      </div>

      {/* ========================================================
          CLASSIC LIGHTBOX POPUP MODAL (Same effect as original feed)
          Side-by-side media & details with carousel slides, sound & controls
          ======================================================== */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  videoRef.current.muted = false;
                  videoRef.current.volume = 1.0;
                  videoRef.current.play().catch(() => {});
                }
              }}
              onTouchStart={() => {
                if (videoRef.current) {
                  videoRef.current.muted = false;
                  videoRef.current.volume = 1.0;
                  videoRef.current.play().catch(() => {});
                }
              }}
              className="bg-black md:bg-[#1c1a18] text-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl w-auto max-w-[92vw] sm:max-w-md md:max-w-5xl h-[80vh] md:h-[90vh] max-h-[850px] flex flex-col md:flex-row relative border border-white/10"
            >
              {/* Close Button (X) */}
              <button
                onClick={closeModal}
                className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Prev / Next Post Navigation Arrows */}
              <button
                onClick={() => navigatePost('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white hidden md:flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
                aria-label="Previous post"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => navigatePost('next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white hidden md:flex items-center justify-center transition-colors border border-white/20 cursor-pointer md:right-[390px] lg:right-[430px]"
                aria-label="Next post"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* LEFT COLUMN: Media Viewport */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden h-full md:h-full select-none">
                {(() => {
                  const currentSlide = selectedItem.slides?.[activeSlideIndex] || {
                    type: selectedItem.media_type === 'VIDEO' ? 'video' : 'image',
                    url: selectedItem.media_url,
                  };

                  if (currentSlide.type === 'video' || currentSlide.url?.includes('.mp4')) {
                    return (
                      <video
                        ref={videoRef}
                        key={currentSlide.url}
                        src={currentSlide.url}
                        poster={currentSlide.thumbnail || selectedItem.thumbnail_url}
                        controls={!isMobileView}
                        autoPlay
                        loop
                        playsInline
                        muted={false}
                        preload="auto"
                        disablePictureInPicture
                        disableRemotePlayback
                        onLoadedMetadata={(e) => {
                          e.currentTarget.muted = false;
                          e.currentTarget.volume = 1.0;
                        }}
                        onPlay={(e) => {
                          e.currentTarget.muted = false;
                          e.currentTarget.volume = 1.0;
                        }}
                        className="w-full h-full object-contain max-h-full cursor-pointer"
                      />
                    );
                  }

                  return (
                    <img
                      key={currentSlide.url}
                      src={currentSlide.url}
                      alt="Nizhal Community Media"
                      className="w-full h-full object-contain max-h-full"
                    />
                  );
                })()}

                {/* Mobile subtle author watermark overlay */}
                <div className="md:hidden absolute bottom-3.5 left-4 z-20 text-white/90 text-xs font-semibold tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none">
                  @nizhal.community
                </div>

                {/* Carousel Navigation Arrows if multiple slides */}
                {selectedItem.slides && selectedItem.slides.length > 1 && (
                  <>
                    {activeSlideIndex > 0 && (
                      <button
                        onClick={() => setActiveSlideIndex((prev) => prev - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Previous slide"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>
                    )}
                    {activeSlideIndex < selectedItem.slides.length - 1 && (
                      <button
                        onClick={() => setActiveSlideIndex((prev) => prev + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Next slide"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    )}

                    {/* Dot Indicators - Always shows exactly 3 dots if more than 3 */}
                    {(() => {
                      const totalSlides = selectedItem.slides.length;
                      let visibleDotIndices: number[] = [];

                      if (totalSlides <= 3) {
                        visibleDotIndices = selectedItem.slides.map((_, i) => i);
                      } else if (activeSlideIndex === 0) {
                        visibleDotIndices = [0, 1, 2];
                      } else if (activeSlideIndex >= totalSlides - 1) {
                        visibleDotIndices = [totalSlides - 3, totalSlides - 2, totalSlides - 1];
                      } else {
                        visibleDotIndices = [activeSlideIndex - 1, activeSlideIndex, activeSlideIndex + 1];
                      }

                      return (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs">
                          {visibleDotIndices.map((dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() => setActiveSlideIndex(dotIdx)}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                dotIdx === activeSlideIndex ? 'bg-white w-4' : 'bg-white/40 w-2 hover:bg-white/70'
                              }`}
                              aria-label={`Slide ${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>

              {/* RIGHT COLUMN: Post Details & Caption Sidebar */}
              <div className="hidden md:flex w-full md:w-[380px] lg:w-[420px] bg-[#221f1c] flex-col justify-between h-full border-l border-white/10 shrink-0">
                {/* Author Header */}
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#272420]">
                  <div className="flex items-center gap-3">
                    {selectedItem.author?.profilePictureUrl ? (
                      <img
                        src={selectedItem.author.profilePictureUrl}
                        alt="Nizhal Community"
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#8c3a3a] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                        NC
                      </div>
                    )}
                    <div>
                      <a
                        href="https://www.instagram.com/nizhal.community/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-white hover:text-amber-200 transition-colors flex items-center gap-1"
                      >
                        <span>@nizhal.community</span>
                        <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </a>
                      <p className="text-[11px] text-white/50">Nizhal Community</p>
                    </div>
                  </div>

                  <a
                    href="https://www.instagram.com/nizhal.community/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#8c3a3a] hover:bg-[#732f2f] text-white text-xs font-semibold transition-colors"
                  >
                    Follow
                  </a>
                </div>

                {/* Caption Body (Scrollable) */}
                <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3 text-xs sm:text-sm text-white/90 leading-relaxed font-light select-text">
                  <div className="flex items-start gap-2.5 mb-2">
                    <span className="font-semibold text-white">@nizhal.community</span>
                    <span className="text-[11px] text-white/40">
                      {new Date(selectedItem.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="whitespace-pre-line text-white/85 leading-relaxed font-normal">
                    {selectedItem.caption}
                  </p>
                </div>

                {/* Engagement Bar & Footer Link */}
                <div className="p-4 sm:p-5 border-t border-white/10 bg-[#272420] space-y-3">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <div className="flex items-center gap-4">
                      {selectedItem.likesCount !== undefined && selectedItem.likesCount > 0 && (
                        <span className="flex items-center gap-1 text-white/90 font-medium">
                          <span className="text-red-400">♥</span> {selectedItem.likesCount} likes
                        </span>
                      )}
                      {selectedItem.commentsCount !== undefined && selectedItem.commentsCount > 0 && (
                        <span className="flex items-center gap-1 text-white/70">
                          💬 {selectedItem.commentsCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-white/40">
                      {new Date(selectedItem.timestamp).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Open Post on Instagram Button */}
                  <a
                    href={selectedItem.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors border border-white/15"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span>View on Instagram ↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Intelligent Lazy Video Player: Instant cover frame, streams video exclusively on hover and unmounts during modal view to guarantee maximum bandwidth
const AutoPlayVideo = ({ 
  src, 
  poster, 
  isModalOpen 
}: { 
  src: string; 
  poster?: string; 
  isModalOpen?: boolean; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && !isModalOpen && videoRef.current && !hasError) {
      const vid = videoRef.current;
      vid.playbackRate = 0.85;
      vid.defaultMuted = true;
      vid.muted = true;
      vid.play().catch(() => {});
    }
  }, [isHovered, isModalOpen, hasError]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full h-full relative"
    >
      {/* Instant lightweight cover image (zero network lag, renders in < 50ms) */}
      <img
        src={poster || src}
        alt="Instagram Reel thumbnail"
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* Video stream ONLY mounts on active user hover when modal is not open */}
      {isHovered && !isModalOpen && !hasError && (
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
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      )}
    </div>
  );
};

export default Events;
