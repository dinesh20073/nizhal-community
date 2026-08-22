import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bodyBgUrl from '../assets/body.png';

const topics = [
  "general inquiry",
  "volunteer",
  "collaborate"
];

const Contact = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (selectedTopic === 'collaborate') {
      // Allow letters, numbers, spaces, and common org chars
      const cleaned = val.replace(/[^a-zA-Z0-9\s&.,'-]/g, '');
      setFormData((prev) => ({ ...prev, name: cleaned }));
    } else {
      // Letters, spaces, and hyphens/apostrophes only for person name
      const cleaned = val.replace(/[^a-zA-Z\s'-]/g, '');
      setFormData((prev) => ({ ...prev, name: cleaned }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Digits only, max 10 digits
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: digitsOnly }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit WhatsApp number.");
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="relative min-h-screen w-full bg-[#fcfaf8] pt-28 pb-16 px-6 md:px-12 lg:px-16 text-[#2b2622] flex flex-col justify-center overflow-hidden">
      {/* Decorative Background Artwork */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img 
          src={bodyBgUrl} 
          alt="Nizhal Contact Background" 
          className="w-full h-full object-fill opacity-95"
        />
      </div>

      {/* Background Soft Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#ebe3d9]/30 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#2b2622] lowercase mb-3">
            get in touch
          </h1>
          <p className="text-sm sm:text-base text-[#2b2622]/70 lowercase leading-relaxed">
            we’d love to hear from you. drop us a message, share your thoughts, or connect directly with our community.
          </p>
        </motion.div>

        {/* 2-Column Equal Size Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Direct Community Channels */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4 h-full"
          >
            {/* Instagram Card */}
            <a 
              href="https://www.instagram.com/nizhal.community/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#ebe3d9]/30 border border-[#2b2622]/10 hover:border-[#d62976]/40 hover:bg-[#ebe3d9]/50 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-full bg-[#2b2622] text-white flex items-center justify-center group-hover:bg-[#d62976] transition-colors duration-300 shadow-sm shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-[#2b2622]/50 lowercase">follow our journey</span>
                <span className="text-base font-medium text-[#2b2622] lowercase group-hover:text-[#d62976] transition-colors">@nizhal.community</span>
              </div>
            </a>

            {/* WhatsApp Community Card */}
            <a 
              href="https://chat.whatsapp.com/DjwhofsCU4M0WAXNTLBzLl" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#ebe3d9]/30 border border-[#2b2622]/10 hover:border-[#25D366]/40 hover:bg-[#ebe3d9]/50 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-full bg-[#2b2622] text-white flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300 shadow-sm shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-[#2b2622]/50 lowercase">whatsapp group</span>
                <span className="text-base font-medium text-[#2b2622] lowercase group-hover:text-[#25D366] transition-colors">join nizhal circle</span>
              </div>
            </a>

            {/* Email Card */}
            <a 
              href="mailto:nizhal.community@gmail.com?subject=Connecting%20with%20Nizhal%20Community" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "mailto:nizhal.community@gmail.com?subject=Connecting%20with%20Nizhal%20Community";
              }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#ebe3d9]/30 border border-[#2b2622]/10 hover:border-[#522D21]/40 hover:bg-[#ebe3d9]/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-[#2b2622] text-white flex items-center justify-center group-hover:bg-[#522D21] transition-colors duration-300 shadow-sm shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-[#2b2622]/50 lowercase">email us directly</span>
                <span className="text-base font-medium text-[#2b2622] lowercase group-hover:text-[#522D21] transition-colors">nizhal.community@gmail.com</span>
              </div>
            </a>

            {/* Warm Community Note (Fills remaining height) */}
            <div className="flex-1 flex flex-col justify-center p-6 sm:p-7 rounded-2xl bg-[#ebe3d9]/20 border border-[#2b2622]/8 text-left">
              <span className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-bold block mb-2">
                a safe space to talk ♡
              </span>
              <p className="text-xs sm:text-sm text-[#2b2622]/70 lowercase leading-relaxed">
                every question shared with us is treated with genuine warmth, confidentiality, and deep care. we typically respond within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#ebe3d9]/25 border border-[#2b2622]/10 rounded-3xl p-6 sm:p-8 md:p-9 shadow-sm relative overflow-hidden flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5 text-left" 
                  onSubmit={handleSubmit}
                >
                  {/* Topic Selector Pills - 3 Clean Equal Columns Without Scroll */}
                  <div>
                    <label className="text-xs text-[#2b2622]/60 font-medium lowercase block mb-2">
                      what is on your mind?
                    </label>
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {topics.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setSelectedTopic(topic)}
                          className={`w-full py-2 px-1 text-center rounded-xl text-[11px] sm:text-xs transition-all duration-200 lowercase cursor-pointer truncate ${
                            selectedTopic === topic
                              ? 'bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 font-semibold shadow-sm'
                              : 'bg-[#ebe3d9]/60 text-[#2b2622]/70 hover:bg-[#ebe3d9] border border-[#2b2622]/5'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name / Org Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#2b2622]/60 font-medium lowercase block mb-1.5">
                        {selectedTopic === 'collaborate' ? 'your organization name *' : 'your name *'}
                      </label>
                      <input 
                        type="text" 
                        required
                        minLength={2}
                        maxLength={60}
                        value={formData.name}
                        onChange={handleNameChange}
                        placeholder="how should we call you?" 
                        className="w-full bg-[#fcfaf8] border border-[#2b2622]/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#522D21] focus:ring-2 focus:ring-[#522D21]/10 transition-all lowercase placeholder:text-[#2b2622]/30 text-[#2b2622]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#2b2622]/60 font-medium lowercase block mb-1.5">
                        your email *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com" 
                        className="w-full bg-[#fcfaf8] border border-[#2b2622]/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#522D21] focus:ring-2 focus:ring-[#522D21]/10 transition-all lowercase placeholder:text-[#2b2622]/30 text-[#2b2622]"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number (Mandatory - 10 Digits Only) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs text-[#2b2622]/60 font-medium lowercase">
                        whatsapp number *
                      </label>
                      <span className="text-[10px] text-[#2b2622]/40 lowercase">
                        {formData.phone.length}/10 digits
                      </span>
                    </div>
                    <input 
                      type="tel" 
                      required
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      minLength={10}
                      maxLength={10}
                      title="Please enter a valid 10-digit WhatsApp number"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="enter your 10 digits whatsapp number" 
                      className="w-full bg-[#fcfaf8] border border-[#2b2622]/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#522D21] focus:ring-2 focus:ring-[#522D21]/10 transition-all lowercase placeholder:text-[#2b2622]/30 text-[#2b2622]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs text-[#2b2622]/60 font-medium lowercase block mb-1.5">
                      your message *
                    </label>
                    <textarea 
                      required
                      minLength={5}
                      maxLength={1000}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="share whatever is in your heart..." 
                      className="w-full bg-[#fcfaf8] border border-[#2b2622]/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#522D21] focus:ring-2 focus:ring-[#522D21]/10 transition-all lowercase placeholder:text-[#2b2622]/30 resize-none text-[#2b2622]"
                    />
                  </div>

                  {/* Centered Submit Button */}
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="bg-[#FCEBED] text-[#522D21] border border-[#522D21]/20 text-sm sm:text-base font-semibold rounded-full px-10 py-3.5 hover:bg-[#f6dbe0] transition-all lowercase self-center mx-auto mt-2 shadow-lg shadow-[#522D21]/10 cursor-pointer"
                  >
                    send message
                  </motion.button>
                </motion.form>
              ) : (
                /* Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4"
                >
                  <div className="h-16 w-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-6 border border-[#25D366]/20">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="hero-title text-2xl sm:text-3xl font-medium tracking-tight mb-2 lowercase text-[#2b2622]">
                    your voice has reached us.
                  </h3>
                  <p className="text-[#2b2622]/70 text-sm leading-relaxed lowercase max-w-sm mb-6">
                    thank you for sharing a piece of your world with nizhal community. our caretakers will get back to you shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-xs text-[#2b2622]/60 hover:text-[#2b2622] underline underline-offset-4 lowercase transition-colors cursor-pointer"
                  >
                    send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;

