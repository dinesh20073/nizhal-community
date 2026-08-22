import { motion } from 'framer-motion';
import SocialCard from '../components/SocialCard';

const VALUES = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    title: 'active listening',
    desc: 'spaces where you are heard completely, without judgment, unwanted advice, or distraction.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'genuine warmth',
    desc: 'a gentle environment where every individual is treated with kindness, empathy, and respect.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'safe & moderated',
    desc: 'carefully curated circles ensuring privacy, emotional safety, and a toxic-free sanctuary.'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'organic community',
    desc: 'no follower games or algorithm feeds—just real human beings meeting online and offline.'
  }
];

const About = () => {
  return (
    <div className="bg-[#fcfaf8] text-[#2b2622] selection:bg-[#2b2622]/30 min-h-screen">
      {/* Header Section */}
      <section className="relative pt-36 pb-20 px-6 md:px-10 max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-title font-medium text-6xl md:text-8xl mb-8 lowercase tracking-tight"
        >
          about us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl text-[#2b2622]/90 lowercase font-normal leading-snug max-w-3xl mx-auto mb-6"
        >
          nizhal community is a quiet space beside you—built for real conversations and shared presence.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-[#2b2622]/60 lowercase leading-relaxed max-w-2xl mx-auto"
        >
          in a fast, crowded world where everyone is broadcasting, we created nizhal to be a shade ("நிழல்") where you can pause, breathe, and simply be yourself without the need to perform.
        </motion.p>
      </section>

      {/* Story & Philosophy Section */}
      <section className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#f4efe8] p-8 md:p-14 rounded-3xl border border-[#2b2622]/5">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#ff5a1f] font-semibold mb-3 block">our essence</span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight lowercase mb-6">
              why we started nizhal
            </h2>
            <p className="text-base text-[#2b2622]/70 lowercase leading-relaxed mb-4">
              modern life has made us hyper-connected yet deeply isolated. we realized that what people crave most isn't more content, but authentic human connection—spaces where stories are shared without judgment.
            </p>
            <p className="text-base text-[#2b2622]/70 lowercase leading-relaxed">
              whether it is an intimate listening circle, a quiet ambient co-working space, or an open community gathering, nizhal is designed as a sanctuary of warmth.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#ebe3d9]/60 p-6 rounded-2xl border border-[#2b2622]/10">
              <span className="text-2xl font-medium text-[#2b2622] block mb-1">500+</span>
              <span className="text-sm text-[#2b2622]/60 lowercase">members bonded through open circles</span>
            </div>
            <div className="bg-[#ebe3d9]/60 p-6 rounded-2xl border border-[#2b2622]/10">
              <span className="text-2xl font-medium text-[#2b2622] block mb-1">10k+</span>
              <span className="text-sm text-[#2b2622]/60 lowercase">heartfelt minutes of active listening</span>
            </div>
            <div className="bg-[#ebe3d9]/60 p-6 rounded-2xl border border-[#2b2622]/10">
              <span className="text-2xl font-medium text-[#2b2622] block mb-1">50+</span>
              <span className="text-sm text-[#2b2622]/60 lowercase">gatherings and community events hosted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#ff5a1f] font-semibold mb-3 block">what guides us</span>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight lowercase">
            our core values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUES.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#ebe3d9]/40 border border-[#2b2622]/10 p-8 rounded-3xl hover:bg-[#ebe3d9] transition-colors"
            >
              <div className="h-12 w-12 rounded-2xl bg-[#2b2622]/5 flex items-center justify-center mb-6 border border-[#2b2622]/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-medium mb-2 lowercase">{item.title}</h3>
              <p className="text-sm text-[#2b2622]/70 lowercase leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join & CTA */}
      <section className="py-24 px-6 md:px-10 text-center flex flex-col items-center justify-center border-t border-[#2b2622]/5 bg-gradient-to-t from-[#f4efe8] to-[#fcfaf8]">
        <h2 className="hero-title text-5xl md:text-7xl font-medium lowercase mb-6">
          be part of our story
        </h2>
        <p className="text-lg text-[#2b2622]/60 lowercase max-w-lg mb-10">
          your perspective and presence are always welcome. join our community circles today.
        </p>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('openJoinModal'))}
          className="bg-[#ff5a1f] text-white text-base font-medium rounded-full px-8 py-4 hover:scale-105 transition-transform lowercase shadow-lg shadow-[#2b2622]/10 mb-8"
        >
          become a member
        </button>
        <SocialCard />
      </section>
    </div>
  );
};

export default About;
