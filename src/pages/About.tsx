import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile.png';
import aboutVideoUrl from '../assets/about-bg.mp4';

const About = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const vid = videoRef.current;
      vid.playbackRate = 0.5;
      vid.defaultMuted = true;
      vid.muted = true;
      const attemptPlay = () => {
        vid.play().catch(() => {});
      };
      attemptPlay();
      vid.addEventListener('loadeddata', attemptPlay, { once: true });
    }
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#fcfaf8] pt-32 pb-20 px-6 md:px-10 text-[#2b2622] flex flex-col justify-center overflow-hidden">
      {/* Lighter, Warm & Clean Background with Signature Artwork + Subtle Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        {/* Layer 1: Crisp Warm Signature Artwork */}
        <picture className="absolute inset-0 w-full h-full">
          <source media="(max-width: 768px)" srcSet={bodyMobileBgUrl} />
          <img 
            src={bodyBgUrl} 
            alt="Nizhal About Background Artwork" 
            className="w-full h-full object-cover md:object-fill opacity-90 brightness-105"
          />
        </picture>

        {/* Layer 2: Subtle Ambient Video Motion */}
        <video
          ref={videoRef}
          src={aboutVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-25 brightness-115 contrast-95 mix-blend-multiply pointer-events-none"
        />

        {/* Layer 3: Ultra-light Soft Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcfaf8]/50 via-transparent to-[#fcfaf8]/50 pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto my-auto w-full text-center relative z-10 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-8xl mb-8 md:mb-12 text-[#2b2622] drop-shadow-sm">
            About Us
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#2b2622]/90 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 font-normal drop-shadow-sm">
            Nizhal Community is a quiet space beside you. We believe in the power of genuine human connection and listening.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-[#2b2622]/75 leading-relaxed max-w-2xl mx-auto font-normal">
            In a loud, fast-paced world, finding a place to simply exist without expectations is rare. We built this community to bring people together, share stories, and foster empathy. Everyone has a story worth hearing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
