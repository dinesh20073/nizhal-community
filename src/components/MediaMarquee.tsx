import { useState, useRef, useEffect } from 'react';
import aboutVideoUrl from '../assets/about-bg.mp4';
import ctaBgUrl from '../assets/cta-bg.png';
import heroBgUrl from '../assets/hero-bg.png';
import bodyBgUrl from '../assets/body.png';
import bodyMobile2Url from '../assets/body-mobile-2.png';
import activeListeningVideoUrl from '../assets/active-listening.mp4';

export interface FrameItem {
  id: string | number;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt?: string;
  label?: string;
  tilt?: string;
  permalink?: string;
}

const TILTS = ['-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-1', '-rotate-2'];

// Static fallback items to ensure instant rendering with zero layout shift
export const fallbackFrames: FrameItem[] = [
  {
    id: 1,
    type: 'video',
    src: aboutVideoUrl,
    alt: 'Nizhal Community Meetup',
    label: 'Stories & Warmth',
    tilt: '-rotate-2',
  },
  {
    id: 2,
    type: 'image',
    src: ctaBgUrl,
    alt: 'Night Beach Gathering',
    label: 'Community Events',
    tilt: 'rotate-3',
  },
  {
    id: 3,
    type: 'video',
    src: activeListeningVideoUrl,
    alt: 'Active Listening Gathering',
    label: 'Listening Spaces',
    tilt: '-rotate-1',
  },
  {
    id: 4,
    type: 'image',
    src: heroBgUrl,
    alt: 'Connecting Moments',
    label: 'Human Presence',
    tilt: 'rotate-2',
  },
  {
    id: 5,
    type: 'video',
    src: aboutVideoUrl,
    alt: 'Quiet Space Together',
    label: 'Quiet Moments',
    tilt: '-rotate-3',
  },
  {
    id: 6,
    type: 'image',
    src: bodyBgUrl,
    alt: 'Serene Backdrop',
    label: 'Belonging',
    tilt: 'rotate-1',
  },
  {
    id: 7,
    type: 'image',
    src: bodyMobile2Url,
    alt: 'Shared Conversations',
    label: 'Safe & Open',
    tilt: '-rotate-2',
  },
];

const MediaMarquee = () => {
  const [frames, setFrames] = useState<FrameItem[]>(fallbackFrames);

  // Fetch real Instagram posts & reels from the connected feed stream
  useEffect(() => {
    let isMounted = true;

    async function fetchMarqueeFeed() {
      try {
        const res = await fetch('/api/instagram/media?limit=16');
        if (!res.ok) return;
        const data = await res.json();

        if (isMounted && Array.isArray(data.media) && data.media.length > 0) {
          const liveFrames: FrameItem[] = data.media.map((p: any, idx: number) => {
            const isVideo = p.media_type === 'VIDEO';
            const mediaSrc = isVideo
              ? p.media_url || p.thumbnail_url
              : p.media_url || p.thumbnail_url;
            const posterSrc = p.thumbnail_url || p.media_url;

            // Extract a clean, brief snippet from caption for the label
            const firstLine = (p.caption || '')
              .split('\n')[0]
              .replace(/^[#\s]+/, '')
              .trim();
            const labelText =
              firstLine && firstLine.length > 0 && firstLine.length <= 26
                ? firstLine
                : '@nizhal.community';

            return {
              id: p.id || `feed-${idx}`,
              type: isVideo && mediaSrc?.includes('.mp4') ? 'video' : 'image',
              src: mediaSrc,
              poster: posterSrc,
              alt: p.caption || 'Nizhal Community Memory',
              label: labelText,
              tilt: TILTS[idx % TILTS.length],
              permalink: p.permalink || 'https://www.instagram.com/nizhal.community/',
            };
          });

          if (liveFrames.length > 0) {
            setFrames(liveFrames);
          }
        }
      } catch (err) {
        console.warn('Could not load live marquee images:', err);
      }
    }

    fetchMarqueeFeed();

    return () => {
      isMounted = false;
    };
  }, []);

  // Duplicate for seamless infinite overlapping marquee loop
  const displayItems = [...frames, ...frames];

  return (
    <div className="w-full bg-[#fcfaf8] overflow-hidden select-none py-6 sm:py-8 relative">
      {/* Soft gradient edge fade overlays matching page background */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-r from-[#fcfaf8] via-[#fcfaf8]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-l from-[#fcfaf8] via-[#fcfaf8]/80 to-transparent z-20 pointer-events-none" />

      {/* Infinite Overlapping Marquee Reel */}
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex -space-x-12 sm:-space-x-16 md:-space-x-24 items-center shrink-0 pr-14 md:pr-24">
          {displayItems.map((item, index) => {
            const zIndex = 10 + (index % frames.length);

            return (
              <div
                key={`${item.id}-${index}`}
                style={{ zIndex }}
                className={`relative w-52 sm:w-64 md:w-72 h-68 sm:h-80 md:h-88 rounded-2xl md:rounded-3xl overflow-hidden border-4 md:border-[5px] border-[#fcfaf8] shadow-xl shrink-0 block bg-[#dfd3c3] select-none ${
                  item.tilt || 'rotate-0'
                }`}
              >
                {/* Media Content - Vibrant natural colors */}
                {item.type === 'video' ? (
                  <VideoFrame src={item.src} alt={item.alt} poster={item.poster} />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt || 'Nizhal Community Frame'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}

                {/* Subtle bottom edge scrim for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

                {/* Frame Label Badge */}
                {item.label && (
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] sm:text-xs font-mono tracking-wider text-white/95 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md truncate max-w-[85%]">
                      {item.label}
                    </span>
                    {item.type === 'video' && (
                      <span className="text-white/90 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-sm flex items-center justify-center">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Video Frame Helper Component (Muted preview for background performance)
const VideoFrame = ({ src, alt, poster }: { src: string; alt?: string; poster?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const vid = videoRef.current;
      vid.playbackRate = 0.8;
      vid.defaultMuted = true;
      vid.muted = true;
      const attemptPlay = () => {
        vid.play().catch(() => {});
      };
      attemptPlay();
      vid.addEventListener('loadeddata', attemptPlay, { once: true });
    }
  }, [src]);

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
      disablePictureInPicture
      disableRemotePlayback
      preload="none"
      aria-label={alt || 'Nizhal Video Frame'}
      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 pointer-events-none"
    />
  );
};

export default MediaMarquee;
