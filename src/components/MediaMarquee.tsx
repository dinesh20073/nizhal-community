import { useRef, useEffect } from 'react';
import aboutVideoUrl from '../assets/about-bg.mp4';
import ctaBgUrl from '../assets/cta-bg.png';
import heroBgUrl from '../assets/hero-bg.png';
import bodyBgUrl from '../assets/body.png';
import bodyMobile2Url from '../assets/body-mobile-2.png';

export interface FrameItem {
  id: string | number;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  label?: string;
}

// 🎞️ Add or customize your photos and videos here!
export const mediaFrames: FrameItem[] = [
  {
    id: 1,
    type: 'video',
    src: aboutVideoUrl,
    alt: 'Nizhal Community Meetup',
    label: 'stories & warmth'
  },
  {
    id: 2,
    type: 'image',
    src: ctaBgUrl,
    alt: 'Night Beach Gathering',
    label: 'community circle'
  },
  {
    id: 3,
    type: 'image',
    src: heroBgUrl,
    alt: 'Connecting Moments',
    label: 'human presence'
  },
  {
    id: 4,
    type: 'video',
    src: aboutVideoUrl,
    alt: 'Quiet Space Together',
    label: 'listening space'
  },
  {
    id: 5,
    type: 'image',
    src: bodyBgUrl,
    alt: 'Serene Backdrop',
    label: 'belonging'
  },
  {
    id: 6,
    type: 'image',
    src: bodyMobile2Url,
    alt: 'Shared Conversations',
    label: 'safe & open'
  }
];

const MediaMarquee = () => {
  // Duplicate for seamless infinite marquee loop
  const displayItems = [...mediaFrames, ...mediaFrames];

  return (
    <section className="py-16 md:py-20 bg-[#f4efe8] border-y border-[#2b2622]/10 overflow-hidden relative select-none">
      {/* Subtle edge fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#f4efe8] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#f4efe8] to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
        <div className="flex gap-5 md:gap-8 items-center shrink-0 pr-5 md:pr-8">
          {displayItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative w-48 sm:w-56 md:w-64 h-64 sm:h-76 md:h-88 rounded-2xl md:rounded-3xl overflow-hidden bg-[#2b2622]/5 border border-[#2b2622]/15 shadow-sm group shrink-0 transition-transform duration-500 hover:scale-[1.03]"
            >
              {/* Media Content - Always Black and White & Full Mute */}
              {item.type === 'video' ? (
                <VideoFrame src={item.src} alt={item.alt} />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt || 'Nizhal Community Frame'}
                  className="w-full h-full object-cover grayscale contrast-120 brightness-95 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}

              {/* Minimal Translucent Grain / Tint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Frame Label / Caption */}
              {item.label && (
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Video Frame Helper Component (Ensures full mute, autoPlay, loop, slow motion)
const VideoFrame = ({ src, alt }: { src: string; alt?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
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
      aria-label={alt || 'Nizhal Video Frame'}
      className="w-full h-full object-cover grayscale contrast-120 brightness-95 transition-all duration-700 group-hover:scale-105"
    />
  );
};

export default MediaMarquee;
