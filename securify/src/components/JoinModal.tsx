import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialCard from './SocialCard';

// TODO: Replace this with the URL you get after deploying the Google Apps Script
const GOOGLE_SCRIPT_URL = '';

const JoinModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSubmitted(false);
      setIsSubmitting(false);
      setErrorMsg('');
      setDob('');
      setAge(null);
      setFormData({ firstName: '', lastName: '', gender: '', phone: '', email: '' });
    };
    window.addEventListener('openJoinModal', handleOpen);
    return () => window.removeEventListener('openJoinModal', handleOpen);
  }, []);

  const onClose = () => setIsOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    if (!GOOGLE_SCRIPT_URL) {
      // If no URL is provided, we just simulate a successful submission for UI purposes
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
      return;
    }

    try {
      const form = new FormData();
      form.append('name', `${formData.firstName} ${formData.lastName}`);
      form.append('gender', formData.gender);
      form.append('dob', dob);
      form.append('phone', formData.phone);
      form.append('email', formData.email);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: form
      });

      const result = await response.json();

      if (result.status === 'exists') {
        setErrorMsg('you are already a member');
      } else if (result.status === 'success') {
        setIsSubmitted(true);
      } else {
        setErrorMsg('something went wrong. please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMsg('network error. please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDob(val);

    if (val) {
      const birthDate = new Date(val);
      const today = new Date();
      
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      if (calculatedAge >= 0 && calculatedAge < 150) {
        setAge(calculatedAge);
      } else {
        setAge(null);
      }
    } else {
      setAge(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-neutral-900 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl my-auto overflow-hidden"
            >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {!isSubmitted ? (
              <>
                <h2 className="text-3xl font-medium text-white mb-3 lowercase tracking-tight">become a member</h2>
                <p className="text-white/60 lowercase leading-relaxed mb-6 text-sm">
                  join our growing community. get access to exclusive events, private spaces, and meaningful connections.
                </p>

                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm lowercase text-center">
                    {errorMsg}
                  </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 w-full min-w-0">
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="first name" 
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-white/40 transition-colors lowercase placeholder:text-white/30 text-white w-full text-sm min-w-0"
                    />
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="last name" 
                      className="bg-black/50 border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-white/40 transition-colors lowercase placeholder:text-white/30 text-white w-full text-sm min-w-0"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className={`bg-black/50 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white/40 transition-colors lowercase w-full text-sm appearance-none ${formData.gender ? 'text-white' : 'text-white/30'}`}
                      >
                        <option value="" disabled className="bg-neutral-900 text-white/50">gender</option>
                        <option value="male" className="bg-neutral-900 text-white">male</option>
                        <option value="female" className="bg-neutral-900 text-white">female</option>
                        <option value="other" className="bg-neutral-900 text-white">other</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
                    <div className="relative min-w-0 w-full flex-1 overflow-hidden">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-sm pointer-events-none z-10 lowercase bg-black/20 px-1 rounded">
                        {!dob ? "date of birth" : "dob:"}
                      </span>
                      <input 
                        type="date" 
                        required
                        value={dob}
                        onChange={handleDobChange}
                        className={`bg-black/50 border border-white/10 rounded-xl pl-[110px] pr-4 py-4 outline-none focus:border-white/40 transition-colors lowercase w-full text-sm [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer ${!dob ? 'text-white/30' : 'text-white'}`}
                        style={{ minWidth: 0, width: '100%', boxSizing: 'border-box' }}
                      />
                      {age !== null && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs lowercase bg-neutral-900 px-2 py-1 rounded whitespace-nowrap">
                          {age} yrs
                        </span>
                      )}
                    </div>
                    
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      title="please enter a valid 10-digit phone number"
                      placeholder="phone number" 
                      className="bg-black/50 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white/40 transition-colors lowercase placeholder:text-white/30 text-white w-full text-sm"
                    />
                  </div>

                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    pattern=".+@gmail\.com$"
                    title="must be a @gmail.com address"
                    placeholder="your email (@gmail.com)" 
                    className="bg-black/50 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-white/40 transition-colors lowercase placeholder:text-white/30 text-white w-full text-sm"
                  />

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full bg-white text-black font-medium rounded-xl px-8 py-4 hover:bg-neutral-200 transition-colors lowercase disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        submitting...
                      </>
                    ) : (
                      'submit application'
                    )}
                  </button>
                </form>

                {/* Socials / Direct Join Area */}
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center text-center">
                  <p className="text-white/60 text-sm mb-1 lowercase">or connect with us directly</p>
                  <p className="text-white/30 text-xs mb-5 lowercase italic tracking-wide">your presence is a gift. step into our world whenever you're ready.</p>
                  <SocialCard />
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10"
              >
                <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-medium tracking-tight mb-4 lowercase text-white">
                  application received.
                </h3>
                <p className="text-white/60 text-sm leading-relaxed lowercase mb-8">
                  thank you for taking the first step. we're excited to learn more about you. while you wait, join our community directly below:
                </p>
                <SocialCard />
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JoinModal;
