import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile-2.png';
import contactVideoUrl from '../assets/contact-bg.mp4';

const topics = [
  "General Inquiry",
  "Volunteer",
  "Collaborate"
];

const Contact = () => {
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

  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (selectedTopic.toLowerCase() === 'collaborate') {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit WhatsApp number.");
      return;
    }

    setIsSending(true);
    setErrorMessage('');

    const endpoint = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/send-email';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: selectedTopic,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Email send error:', err);
      setErrorMessage(
        err?.message || 'Failed to send message. Please ensure the backend server is running.'
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage('');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="relative min-h-screen w-full bg-[#fcfaf8] pt-32 pb-20 px-6 md:px-10 text-[#2b2622] flex flex-col justify-center overflow-hidden">
      {/* Layered Overlapping Background: Artwork Image + Video + Balanced Whitish Scrim */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        {/* Layer 1: Previous Background Artwork Image (Balanced Opacity) */}
        <picture className="absolute inset-0 w-full h-full">
          <source media="(max-width: 768px)" srcSet={bodyMobileBgUrl} />
          <img 
            src={bodyBgUrl} 
            alt="Nizhal Contact Artwork" 
            className="w-full h-full object-cover md:object-fill opacity-65 brightness-105"
          />
        </picture>

        {/* Layer 2: Overlapping Video Background (Balanced Brightness & Opacity) */}
        <video
          ref={videoRef}
          src={contactVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-42 brightness-118 contrast-95 pointer-events-none"
        />

        {/* Layer 3: Balanced Soft Whitish Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcfaf8]/90 via-[#fcfaf8]/68 to-[#fcfaf8]/90 pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto my-auto w-full relative z-10">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8 md:mb-10"
        >
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#2b2622] mb-3">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-[#2b2622]/70 leading-relaxed">
            We’d love to hear from you. Drop us a message, share your thoughts, or connect directly with our community.
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
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#ede4d8] border border-[#2b2622]/15 shadow-sm hover:border-[#d62976]/40 hover:bg-[#e5d9ca] hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-full bg-[#2b2622] text-white flex items-center justify-center group-hover:bg-[#d62976] transition-colors duration-300 shadow-sm shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-[#2b2622]/60">Follow our journey</span>
                <span className="text-base font-semibold text-[#2b2622] group-hover:text-[#d62976] transition-colors">@nizhal.community</span>
              </div>
            </a>

            {/* WhatsApp Community Card */}
            <a 
              href="https://chat.whatsapp.com/DjwhofsCU4M0WAXNTLBzLl" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#ede4d8] border border-[#2b2622]/15 shadow-sm hover:border-[#25D366]/40 hover:bg-[#e5d9ca] hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-full bg-[#2b2622] text-white flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300 shadow-sm shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-[#2b2622]/60">WhatsApp Group</span>
                <span className="text-base font-semibold text-[#2b2622] group-hover:text-[#25D366] transition-colors">Join Nizhal Circle</span>
              </div>
            </a>

            {/* Email Card */}
            <a 
              href="mailto:nizhal.community@gmail.com?subject=Connecting%20with%20Nizhal%20Community" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "mailto:nizhal.community@gmail.com?subject=Connecting%20with%20Nizhal%20Community";
              }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#ede4d8] border border-[#2b2622]/15 shadow-sm hover:border-[#522D21]/40 hover:bg-[#e5d9ca] hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-[#2b2622] text-white flex items-center justify-center group-hover:bg-[#522D21] transition-colors duration-300 shadow-sm shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs text-[#2b2622]/60">Email us directly</span>
                <span className="text-base font-semibold text-[#2b2622] group-hover:text-[#522D21] transition-colors">nizhal.community@gmail.com</span>
              </div>
            </a>

            {/* Warm Community Note (Fills remaining height) */}
            <div className="flex-1 flex flex-col justify-center p-6 sm:p-7 rounded-2xl bg-[#ede4d8] border border-[#2b2622]/15 shadow-sm text-left">
              <span className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-bold block mb-2">
                A safe space to talk ♡
              </span>
              <p className="text-xs sm:text-sm text-[#2b2622]/75 leading-relaxed">
                Every question shared with us is treated with genuine warmth, confidentiality, and deep care. We typically respond within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#ede4d8] border border-[#2b2622]/15 rounded-3xl p-6 sm:p-8 md:p-9 shadow-lg relative overflow-hidden flex flex-col justify-center"
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
                    <label className="text-xs text-[#2b2622]/60 font-medium block mb-2">
                      What is on your mind?
                    </label>
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {topics.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setSelectedTopic(topic)}
                          className={`w-full py-2 px-1 text-center rounded-xl text-[11px] sm:text-xs transition-all duration-200 cursor-pointer truncate ${
                            selectedTopic === topic
                              ? 'bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 font-semibold shadow-sm'
                              : 'bg-[#dfd3c3] text-[#2b2622]/80 hover:bg-[#d6c7b4] border border-[#2b2622]/15'
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
                      <label className="text-xs text-[#2b2622]/60 font-medium block mb-1.5">
                        {selectedTopic.toLowerCase() === 'collaborate' ? 'Your organization name *' : 'Your name *'}
                      </label>
                      <input 
                        type="text" 
                        required
                        minLength={2}
                        maxLength={60}
                        value={formData.name}
                        onChange={handleNameChange}
                        placeholder="How should we call you?" 
                        className="w-full bg-[#fcfaf8] border border-[#2b2622]/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#522D21] focus:ring-2 focus:ring-[#522D21]/10 transition-all placeholder:text-[#2b2622]/30 text-[#2b2622]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#2b2622]/60 font-medium block mb-1.5">
                        Your email *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com" 
                        className="w-full bg-[#fcfaf8] border border-[#2b2622]/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#522D21] focus:ring-2 focus:ring-[#522D21]/10 transition-all placeholder:text-[#2b2622]/30 text-[#2b2622]"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number (Mandatory - 10 Digits Only) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs text-[#2b2622]/60 font-medium">
                        WhatsApp number *
                      </label>
                      <span className="text-[10px] text-[#2b2622]/40">
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
                      placeholder="Enter your 10 digits WhatsApp number" 
                      className="w-full bg-[#fcfaf8] border border-[#2b2622]/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#522D21] focus:ring-2 focus:ring-[#522D21]/10 transition-all placeholder:text-[#2b2622]/30 text-[#2b2622]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs text-[#2b2622]/60 font-medium block mb-1.5">
                      Your message *
                    </label>
                    <textarea 
                      required
                      minLength={5}
                      maxLength={1000}
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share whatever is in your heart..." 
                      className="w-full bg-[#fcfaf8] border border-[#2b2622]/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#522D21] focus:ring-2 focus:ring-[#522D21]/10 transition-all placeholder:text-[#2b2622]/30 resize-none text-[#2b2622]"
                    />
                  </div>

                  {/* Error Alert */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/60 text-xs text-red-700 leading-relaxed text-center">
                      {errorMessage}
                    </div>
                  )}

                  {/* Centered Submit Button with Rich Interactive Feedback */}
                  <div className="flex flex-col items-center gap-2 mt-3">
                    <motion.button 
                      whileHover={!isSending ? { scale: 1.04, y: -2 } : {}}
                      whileTap={!isSending ? { scale: 0.94 } : {}}
                      type="submit"
                      disabled={isSending}
                      className={`relative overflow-hidden bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 text-sm sm:text-base font-semibold rounded-full px-12 py-3.5 hover:bg-[#f8d7dc] active:bg-[#f3c5cd] transition-all duration-300 self-center mx-auto shadow-md shadow-[#522D21]/10 cursor-pointer flex items-center justify-center gap-3 select-none ${
                        isSending ? 'opacity-90 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSending ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-[#522D21]/30 border-t-[#522D21] rounded-full"
                          />
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-medium"
                          >
                            Sending with warmth...
                          </motion.span>
                          <motion.span
                            animate={{ x: [0, 4, 0], y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                          >
                            🕊️
                          </motion.span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                /* Interactive Success State with Floating Particle Effects */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4 relative"
                >
                  {/* Floating celebratory particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ 
                        opacity: 1, 
                        y: 0, 
                        x: (i % 2 === 0 ? 1 : -1) * (i * 18),
                        scale: 0.5 
                      }}
                      animate={{ 
                        opacity: [1, 0.8, 0], 
                        y: -80 - (i * 12), 
                        scale: [0.5, 1.2, 0.8],
                        rotate: (i % 2 === 0 ? 45 : -45) * i
                      }}
                      transition={{ 
                        duration: 1.8 + (i * 0.15), 
                        ease: "easeOut",
                        delay: i * 0.08 
                      }}
                      className="absolute text-lg pointer-events-none select-none"
                    >
                      {['✨', '🌸', '💫', '🌿', '♡', '✨', '🕊️', '🌸'][i]}
                    </motion.span>
                  ))}

                  {/* Animated Spring Success Badge */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 18,
                      delay: 0.15 
                    }}
                    className="h-20 w-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-5 border-2 border-emerald-200/80 shadow-lg shadow-emerald-600/10 relative"
                  >
                    <motion.svg 
                      className="w-10 h-10" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                    </motion.svg>
                  </motion.div>

                  {/* Success Title */}
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="hero-title text-2xl sm:text-3xl font-medium tracking-tight mb-2.5 text-[#2b2622]"
                  >
                    Message sent with warmth ♡
                  </motion.h3>

                  {/* Success Message */}
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="text-[#2b2622]/75 text-sm leading-relaxed max-w-sm mb-6 font-normal"
                  >
                    Your voice has reached us safely. Our caretakers at Nizhal will read your words and get back to you shortly.
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="bg-[#FCEBED] text-[#522D21] border border-[#522D21]/20 text-xs sm:text-sm font-semibold rounded-full px-7 py-2.5 hover:bg-[#f6dbe0] transition-all shadow-sm cursor-pointer"
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
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

