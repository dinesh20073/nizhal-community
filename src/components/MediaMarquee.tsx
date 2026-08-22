import { useRef, useEffect } from 'react';
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
  alt?: string;
  label?: string;
  tilt?: string;
}

// 🎞️ Add or customize your photos and videos here!
export const mediaFrames: FrameItem[] = [
  {
    id: 1,
    type: 'video',
    src: aboutVideoUrl,
    alt: 'Nizhal Community Meetup',
    label: 'stories & warmth',
    tilt: '-rotate-2'
  },
  {
    id: 2,
    type: 'image',
    src: ctaBgUrl,
    alt: 'Night Beach Gathering',
    label: 'community circle',
    tilt: 'rotate-3'
  },
  {
    id: 3,
    type: 'video',
    src: activeListeningVideoUrl,
    alt: 'Active Listening Gathering',
    label: 'listening spaces',
    tilt: '-rotate-1'
  },
  {
    id: 4,
    type: 'image',
    src: heroBgUrl,
    alt: 'Connecting Moments',
    label: 'human presence',
    tilt: 'rotate-2'
  },
  {
    id: 5,
    type: 'video',
    src: aboutVideoUrl,
    alt: 'Quiet Space Together',
    label: 'quiet moments',
    tilt: '-rotate-3'
  },
  {
    id: 6,
    type: 'image',
    src: bodyBgUrl,
    alt: 'Serene Backdrop',
    label: 'belonging',
    tilt: 'rotate-1'
  },
  {
    id: 7,
    type: 'image',
    src: bodyMobile2Url,
    alt: 'Shared Conversations',
    label: 'safe & open',
    tilt: '-rotate-2'
  }
];

const MediaMarquee = () => {
  // Duplicate for seamless infinite overlapping marquee loop
  const displayItems = [...mediaFrames, ...mediaFrames];

  return (
    <div className="w-full bg-[#fcfaf8] overflow-hidden select-none py-6 sm:py-8 relative">
      {/* Soft gradient edge fade overlays matching page background */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-r from-[#fcfaf8] via-[#fcfaf8]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-36 bg-gradient-to-l from-[#fcfaf8] via-[#fcfaf8]/80 to-transparent z-20 pointer-events-none" />

      {/* Infinite Overlapping Marquee Reel */}
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        <div className="flex -space-x-12 sm:-space-x-16 md:-space-x-24 items-center shrink-0 pr-14 md:pr-24">
          {displayItems.map((item, index) => {
            const zIndex = 10 + (index % mediaFrames.length);

            return (
              <div
                key={`${item.id}-${index}`}
                style={{ zIndex }}
                className={`relative w-52 sm:w-64 md:w-72 h-68 sm:h-80 md:h-88 rounded-2xl md:rounded-3xl overflow-hidden border-4 md:border-[5px] border-[#fcfaf8] group shrink-0 transition-all duration-500 ease-out hover:!z-50 hover:scale-105 hover:-translate-y-2 hover:rotate-0 cursor-pointer ${
                  item.tilt || 'rotate-0'
                }`}
              >
                {/* Media Content - Black and White Default & Full Mute */}
                {item.type === 'video' ? (
                  <VideoFrame src={item.src} alt={item.alt} />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt || 'Nizhal Community Frame'}
                    className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                )}

                {/* Subtle soft edge scrim only */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent group-hover:from-transparent transition-colors duration-500 pointer-events-none" />

                {/* Frame Label / Caption Badge */}
                {item.label && (
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/95 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
                      {item.label}
                    </span>
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

// Video Frame Helper Component (Ensures full mute, autoPlay, loop, slow motion, hover reveal, no controls/play buttons)
const VideoFrame = ({ src, alt }: { src: string; alt?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

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
      aria-label={alt || 'Nizhal Video Frame'}
      className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
    />
  );
};

export default MediaMarquee;
