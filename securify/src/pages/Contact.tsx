import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="relative min-h-screen w-full bg-white pt-32 px-6 md:px-10 text-black flex flex-col items-center justify-center">
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
              <h1 className="hero-title font-medium text-6xl md:text-8xl mb-6 lowercase">
                contact
              </h1>
              <p className="text-xl text-black/80 lowercase mb-12">
                we'd love to hear from you. drop us a message.
              </p>

              <form 
                className="flex flex-col gap-6 w-full text-left" 
                onSubmit={handleSubmit}
              >
                <input 
                  type="text" 
                  required
                  placeholder="your name" 
                  className="bg-neutral-100/40 border border-black/10 rounded-2xl px-6 py-4 outline-none focus:border-black/40 transition-colors lowercase placeholder:text-black/30 text-black"
                />
                <input 
                  type="email" 
                  required
                  placeholder="your email" 
                  className="bg-neutral-100/40 border border-black/10 rounded-2xl px-6 py-4 outline-none focus:border-black/40 transition-colors lowercase placeholder:text-black/30 text-black"
                />
                <input 
                  type="tel" 
                  placeholder="your phone number" 
                  className="bg-neutral-100/40 border border-black/10 rounded-2xl px-6 py-4 outline-none focus:border-black/40 transition-colors lowercase placeholder:text-black/30 text-black"
                />
                <input 
                  type="text" 
                  required
                  placeholder="subject" 
                  className="bg-neutral-100/40 border border-black/10 rounded-2xl px-6 py-4 outline-none focus:border-black/40 transition-colors lowercase placeholder:text-black/30 text-black"
                />
                <textarea 
                  required
                  placeholder="your message" 
                  rows={5}
                  className="bg-neutral-100/40 border border-black/10 rounded-2xl px-6 py-4 outline-none focus:border-black/40 transition-colors lowercase placeholder:text-black/30 resize-none text-black"
                ></textarea>
                <button className="bg-black text-white text-lg font-medium rounded-full px-10 py-4 hover:scale-105 active:scale-95 transition-all lowercase self-center mt-2 shadow-xl shadow-black/10">
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
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <div className="h-24 w-24 bg-black/5 rounded-full flex items-center justify-center mb-8 border border-black/10">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 lowercase">
                your voice has reached us.
              </h3>
              <p className="text-black/60 text-lg leading-relaxed lowercase max-w-md">
                thank you for sharing a piece of your world with nizhal community. we will be in touch soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
