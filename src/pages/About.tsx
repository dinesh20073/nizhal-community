import { motion } from 'framer-motion';
import bodyBgUrl from '../assets/body.png';

const About = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#fcfaf8] pt-28 pb-16 px-6 md:px-12 lg:px-16 text-[#2b2622] flex flex-col justify-center overflow-hidden">
      {/* Decorative Background Artwork */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img 
          src={bodyBgUrl} 
          alt="Nizhal About Background" 
          className="w-full h-full object-cover object-center opacity-90"
        />
      </div>

      {/* Background Soft Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#ebe3d9]/30 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-8xl mb-8 lowercase tracking-tight">
            about us
          </h1>
          <div className="p-8 sm:p-12 rounded-3xl bg-[#ebe3d9]/30 border border-[#2b2622]/10 backdrop-blur-sm shadow-sm max-w-3xl mx-auto flex flex-col gap-6 text-center">
            <p className="text-lg sm:text-2xl text-[#2b2622]/90 lowercase leading-relaxed font-normal">
              nizhal community is a quiet space beside you. we believe in the power of genuine human connection and listening.
            </p>
            <div className="w-16 h-px bg-[#2b2622]/15 mx-auto" />
            <p className="text-sm sm:text-base text-[#2b2622]/70 lowercase leading-relaxed">
              in a loud, fast-paced world, finding a place to simply exist without expectations is rare. we built this community to bring people together, share stories, and foster empathy. everyone has a story worth hearing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
