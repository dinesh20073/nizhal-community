import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import aboutVideoUrl from '../assets/about-bg.mp4';

const About = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#fcfaf8] pt-32 pb-20 px-6 md:px-10 text-[#2b2622] flex flex-col justify-center overflow-hidden">
      {/* Background Video: Full Mute, Looping, Slow 0.5x */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={aboutVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        />
        {/* Subtle, reduced whitish scrim overlay for rich video presence */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcfaf8]/60 via-[#fcfaf8]/35 to-[#fcfaf8]/65 pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto my-auto w-full text-center relative z-10 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-8xl mb-8 md:mb-12 lowercase text-[#2b2622] drop-shadow-sm">
            about us
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#2b2622]/90 lowercase max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 font-normal drop-shadow-sm">
            nizhal community is a quiet space beside you. we believe in the power of genuine human connection and listening.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-[#2b2622]/75 lowercase leading-relaxed max-w-2xl mx-auto font-normal">
            in a loud, fast-paced world, finding a place to simply exist without expectations is rare. we built this community to bring people together, share stories, and foster empathy. everyone has a story worth hearing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
