import { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import heroBgUrl from './assets/hero-bg.png';
import ctaBgUrl from './assets/cta-bg.png';
import activeListeningVideoUrl from './assets/active-listening.mp4';
import safeSpacesVideoUrl from './assets/safe-spaces.mp4';
import sharedPresenceVideoUrl from './assets/shared-presence.mp4';
import MediaMarquee from './components/MediaMarquee';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  const sharedPresenceRef = useRef<HTMLVideoElement>(null);
  const safeSpacesRef = useRef<HTMLVideoElement>(null);
  const activeListeningRef = useRef<HTMLVideoElement>(null);

  const pillar1ContainerRef = useRef<HTMLDivElement>(null);
  const pillar2ContainerRef = useRef<HTMLDivElement>(null);
  const pillar3ContainerRef = useRef<HTMLDivElement>(null);

  // Mobile scroll detection: Only active on mobile devices (< 768px)
  const isPillar1InView = useInView(pillar1ContainerRef, { margin: "-25% 0px -25% 0px" });
  const isPillar2InView = useInView(pillar2ContainerRef, { margin: "-25% 0px -25% 0px" });
  const isPillar3InView = useInView(pillar3ContainerRef, { margin: "-25% 0px -25% 0px" });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const playSafe = (vid: HTMLVideoElement | null, rate: number) => {
      if (!vid) return;
      vid.playbackRate = rate;
      vid.muted = true;
      vid.play().catch(() => {});
    };

    playSafe(sharedPresenceRef.current, 0.55);
    playSafe(safeSpacesRef.current, 0.6);
    playSafe(activeListeningRef.current, 0.7);
  }, []);

  return (
    <div className="w-full bg-[#fcfaf8] text-[#2b2622] selection:bg-[#2b2622]/30">
      {/* 1. Hero Section with Background Image and the 3 Words Alone */}
      <section className="relative h-screen w-full overflow-hidden bg-[#fcfaf8] flex items-center justify-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={heroBgUrl}
            alt="Nizhal Community Circle of Warmth"
            className="w-full h-full object-cover select-none"
          />
          {/* Subtle natural vignette to make white words pop */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        {/* Foreground 3 Words Alone in White */}
        <div className="relative h-full w-full pointer-events-none z-10">
          <h1 className="hero-title absolute text-white font-medium text-[11vw] md:text-[8.5vw] left-6 md:left-14 top-[15%] select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            Listen
          </h1>
          <h1 className="hero-title absolute text-white font-medium text-[11vw] md:text-[8.5vw] right-6 md:right-14 top-[15%] select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            Connect
          </h1>
          <h1 className="hero-title absolute text-white font-medium text-[11vw] md:text-[8.5vw] left-1/2 -translate-x-1/2 bottom-[10%] select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] text-center whitespace-nowrap">
            Belong
          </h1>
        </div>
      </section>

      {/* 2. Core Pillars & Embedded Frame Reel */}
      <section className="w-full border-b border-[#2b2622]/10 bg-[#fcfaf8]">
        {/* Title Heading - Centered */}
        <div className="px-6 md:px-14 pt-20 pb-8 max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-[#2b2622]/40 font-medium block mb-4">
            Our Core Pillars
          </span>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
            A different kind of network.
          </h2>
        </div>

        {/* Media Marquee Scroll - Fully visible cards with zero clipping */}
        <div className="w-full relative z-20 overflow-visible">
          <MediaMarquee />
        </div>

        {/* Subtitle / Paragraph description placed below the carousel - Centered */}
        <div className="px-6 md:px-14 pt-8 pb-16 max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-[#2b2622]/60 leading-relaxed">
            We strip away the noise of modern social platforms. Here, you won't find algorithms or endless scrolls—just genuine spaces designed for human connection.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-[#2b2622]/10 relative z-10">
          {/* Pillar 1: Active Listening (Left - Mobile: Scroll to Color | PC: Hover to Color) */}
          <div 
            ref={pillar1ContainerRef}
            className="relative p-8 md:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-[#2b2622]/10 flex flex-col justify-end group overflow-hidden select-none min-h-[380px] md:min-h-[440px] cursor-pointer"
          >
            {/* Full-Box Background Video */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
              <video
                ref={activeListeningRef}
                src={activeListeningVideoUrl}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                preload="auto"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isMobile && isPillar1InView 
                    ? 'grayscale-0 scale-105 brightness-100' 
                    : 'grayscale contrast-125 brightness-75 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:scale-105'
                }`}
              />
              {/* Soft Scrim for effortless text readability in both B&W and Color mode */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 transition-opacity duration-500 group-hover:from-black/75 group-hover:via-black/20 group-hover:to-transparent" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 text-white">
              <h3 className="text-2xl md:text-3xl font-medium mb-3 text-white tracking-tight">
                Active Listening
              </h3>
              <p className="text-white/85 leading-relaxed text-sm md:text-base max-w-sm font-normal">
                Speak without fear of judgment. Our community is built on the foundation of hearing each other out, deeply and respectfully.
              </p>
            </div>
          </div>

          {/* Pillar 2: Safe Spaces (Middle - Mobile: Scroll to Color | PC: Hover to Color) */}
          <div 
            ref={pillar2ContainerRef}
            className="relative p-8 md:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-[#2b2622]/10 flex flex-col justify-end group overflow-hidden select-none min-h-[380px] md:min-h-[440px] cursor-pointer"
          >
            {/* Full-Box Background Video */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
              <video
                ref={safeSpacesRef}
                src={safeSpacesVideoUrl}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                preload="auto"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isMobile && isPillar2InView 
                    ? 'grayscale-0 scale-105 brightness-100' 
                    : 'grayscale contrast-125 brightness-75 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:scale-105'
                }`}
              />
              {/* Soft Scrim for effortless text readability in both B&W and Color mode */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 transition-opacity duration-500 group-hover:from-black/75 group-hover:via-black/20 group-hover:to-transparent" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 text-white">
              <h3 className="text-2xl md:text-3xl font-medium mb-3 text-white tracking-tight">
                Safe Spaces
              </h3>
              <p className="text-white/85 leading-relaxed text-sm md:text-base max-w-sm font-normal">
                Every interaction is moderated to ensure a toxic-free environment. You have full control over who you connect with.
              </p>
            </div>
          </div>

          {/* Pillar 3: Shared Presence (Right - Mobile: Scroll to Color | PC: Hover to Color) */}
          <div 
            ref={pillar3ContainerRef}
            className="relative p-8 md:p-12 lg:p-14 flex flex-col justify-end group overflow-hidden select-none min-h-[380px] md:min-h-[440px] cursor-pointer"
          >
            {/* Full-Box Background Video */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
              <video
                ref={sharedPresenceRef}
                src={sharedPresenceVideoUrl}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                preload="auto"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isMobile && isPillar3InView 
                    ? 'grayscale-0 scale-105 brightness-100' 
                    : 'grayscale contrast-125 brightness-75 md:group-hover:grayscale-0 md:group-hover:brightness-100 md:group-hover:scale-105'
                }`}
              />
              {/* Soft Scrim for effortless text readability in both B&W and Color mode */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 transition-opacity duration-500 group-hover:from-black/75 group-hover:via-black/20 group-hover:to-transparent" />
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 text-white">
              <h3 className="text-2xl md:text-3xl font-medium mb-3 text-white tracking-tight">
                Shared Presence
              </h3>
              <p className="text-white/85 leading-relaxed text-sm md:text-base max-w-sm font-normal">
                Join silent reading rooms, ambient study sessions, or open mic nights. Sometimes simply being together is enough.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="relative py-36 md:py-44 px-6 md:px-10 text-center flex flex-col items-center justify-center border-t border-[#2b2622]/5 overflow-hidden bg-[#fcfaf8]">
        {/* Background Image: Black & White Translucent (High Visibility) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <img 
            src={ctaBgUrl} 
            alt="Nizhal Community Gathering" 
            className="w-full h-full object-cover grayscale contrast-125 brightness-95 opacity-65"
          />
          {/* Subtle soft scrim overlay to keep text effortlessly readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fcfaf8]/75 via-[#fcfaf8]/40 to-[#fcfaf8]/80 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center -mt-6 md:-mt-10">
          <h2 className="hero-title text-6xl md:text-8xl font-medium mb-6 text-[#2b2622] drop-shadow-sm">
            Your story matters.
          </h2>
          <p className="text-xl md:text-2xl text-[#2b2622]/90 max-w-xl mb-16 md:mb-20 leading-relaxed font-normal drop-shadow-sm">
            Step into a world where connection is intentional and every voice is valued.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openJoinModal'))}
            className="bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 text-lg font-semibold rounded-full px-10 py-5 hover:scale-105 hover:bg-[#f6dbe0] transition-all shadow-xl shadow-[#522D21]/15 cursor-pointer mt-2"
          >
            Become a Member
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
