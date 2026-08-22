import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialCard from '../components/SocialCard';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#fcfaf8] pt-36 pb-24 px-6 md:px-10 text-[#2b2622] flex flex-col items-center justify-center selection:bg-[#2b2622]/30">
      <div className="w-full max-w-2xl mx-auto relative min-h-[600px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center w-full"
            >
              <h1 className="hero-title font-medium text-6xl md:text-8xl mb-6 lowercase tracking-tight">
                contact us
              </h1>
              <p className="text-xl text-[#2b2622]/70 lowercase mb-8 max-w-lg">
                we'd love to hear from you. drop us a message or reach out across our community channels.
              </p>

              <div className="mb-10">
                <SocialCard />
              </div>

              <form
                className="flex flex-col gap-5 w-full text-left bg-[#f4efe8]/70 p-8 md:p-10 rounded-3xl border border-[#2b2622]/5"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="your name"
                    className="bg-[#ebe3d9]/50 border border-[#2b2622]/10 rounded-2xl px-5 py-4 outline-none focus:border-[#2b2622]/40 transition-colors lowercase placeholder:text-[#2b2622]/30 text-[#2b2622] text-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="your email"
                    className="bg-[#ebe3d9]/50 border border-[#2b2622]/10 rounded-2xl px-5 py-4 outline-none focus:border-[#2b2622]/40 transition-colors lowercase placeholder:text-[#2b2622]/30 text-[#2b2622] text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="your phone number (optional)"
                    className="bg-[#ebe3d9]/50 border border-[#2b2622]/10 rounded-2xl px-5 py-4 outline-none focus:border-[#2b2622]/40 transition-colors lowercase placeholder:text-[#2b2622]/30 text-[#2b2622] text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="subject"
                    className="bg-[#ebe3d9]/50 border border-[#2b2622]/10 rounded-2xl px-5 py-4 outline-none focus:border-[#2b2622]/40 transition-colors lowercase placeholder:text-[#2b2622]/30 text-[#2b2622] text-sm"
                  />
                </div>

                <textarea
                  required
                  placeholder="your message..."
                  rows={4}
                  className="bg-[#ebe3d9]/50 border border-[#2b2622]/10 rounded-2xl px-5 py-4 outline-none focus:border-[#2b2622]/40 transition-colors lowercase placeholder:text-[#2b2622]/30 resize-none text-[#2b2622] text-sm"
                ></textarea>

                <button
                  type="submit"
                  className="bg-[#ff5a1f] text-white text-base font-medium rounded-full px-10 py-4 hover:scale-105 active:scale-95 transition-all lowercase self-center mt-2 shadow-lg shadow-[#2b2622]/10 cursor-pointer"
                >
                  send message
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#f4efe8]/80 rounded-3xl border border-[#2b2622]/5"
            >
              <div className="h-24 w-24 bg-[#2b2622]/5 rounded-full flex items-center justify-center mb-8 border border-[#2b2622]/10">
                <svg className="w-10 h-10 text-[#ff5a1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 lowercase text-[#2b2622]">
                your voice has reached us.
              </h3>
              <p className="text-[#2b2622]/70 text-base leading-relaxed lowercase max-w-md mb-8">
                thank you for sharing a piece of your world with nizhal community. we will be in touch soon.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs uppercase tracking-widest text-[#2b2622]/60 hover:text-[#2b2622] underline cursor-pointer"
              >
                send another note
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
