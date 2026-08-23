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
        setErrorMsg('You are already a member.');
      } else if (result.status === 'success') {
        setIsSubmitted(true);
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMsg('Network error. Please try again.');
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
            className="fixed inset-0 bg-[#fcfaf8]/60 backdrop-blur-sm"
          />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-[#ebe3d9] border border-[#2b2622]/10 rounded-3xl p-8 md:p-10 shadow-2xl my-auto overflow-hidden"
            >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-[#2b2622]/50 hover:text-[#2b2622] transition-colors z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {!isSubmitted ? (
              <>
                <h2 className="text-3xl font-medium text-[#2b2622] mb-3 tracking-tight">Become a Member</h2>
                <p className="text-[#2b2622]/60 leading-relaxed mb-6 text-sm">
                  Join our growing community. Get access to exclusive events, private spaces, and meaningful connections.
                </p>

                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
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
                      placeholder="First name" 
                      className="bg-[#fcfaf8]/50 border border-[#2b2622]/10 rounded-xl px-4 py-4 outline-none focus:border-[#2b2622]/40 transition-colors placeholder:text-[#2b2622]/30 text-[#2b2622] w-full text-sm min-w-0"
                    />
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Last name" 
                      className="bg-[#fcfaf8]/50 border border-[#2b2622]/10 rounded-xl px-4 py-4 outline-none focus:border-[#2b2622]/40 transition-colors placeholder:text-[#2b2622]/30 text-[#2b2622] w-full text-sm min-w-0"
                    />
                  </div>
                  
                  <div className="w-full">
                    <div className="relative">
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className={`bg-[#fcfaf8]/50 border border-[#2b2622]/10 rounded-xl px-5 py-4 outline-none focus:border-[#2b2622]/40 transition-colors w-full text-sm appearance-none ${formData.gender ? 'text-[#2b2622]' : 'text-[#2b2622]/30'}`}
                      >
                        <option value="" disabled className="bg-[#ebe3d9] text-[#2b2622]/50">Gender</option>
                        <option value="male" className="bg-[#ebe3d9] text-[#2b2622]">Male</option>
                        <option value="female" className="bg-[#ebe3d9] text-[#2b2622]">Female</option>
                        <option value="other" className="bg-[#ebe3d9] text-[#2b2622]">Other (We love you for who you are ♡)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#2b2622]/50">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
                    <div className="relative min-w-0 w-full flex-1 overflow-hidden">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2b2622]/50 text-sm pointer-events-none z-10 bg-[#fcfaf8]/20 px-1 rounded">
                        {!dob ? "Date of birth" : "DOB:"}
                      </span>
                      <input 
                        type="date" 
                        required
                        value={dob}
                        onChange={handleDobChange}
                        className={`bg-[#fcfaf8]/50 border border-[#2b2622]/10 rounded-xl pl-[110px] pr-4 py-4 outline-none focus:border-[#2b2622]/40 transition-colors w-full text-sm [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer ${!dob ? 'text-[#2b2622]/30' : 'text-[#2b2622]'}`}
                        style={{ minWidth: 0, width: '100%', boxSizing: 'border-box' }}
                      />
                      {age !== null && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2b2622]/50 text-xs bg-[#ebe3d9] px-2 py-1 rounded whitespace-nowrap">
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
                      title="Please enter a valid 10-digit phone number"
                      placeholder="Phone number" 
                      className="bg-[#fcfaf8]/50 border border-[#2b2622]/10 rounded-xl px-5 py-4 outline-none focus:border-[#2b2622]/40 transition-colors placeholder:text-[#2b2622]/30 text-[#2b2622] w-full text-sm"
                    />
                  </div>

                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    pattern=".+@gmail\.com$"
                    title="Must be a @gmail.com address"
                    placeholder="Your email (@gmail.com)" 
                    className="bg-[#fcfaf8]/50 border border-[#2b2622]/10 rounded-xl px-5 py-4 outline-none focus:border-[#2b2622]/40 transition-colors placeholder:text-[#2b2622]/30 text-[#2b2622] w-full text-sm"
                  />

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full bg-[#FCEBED] text-[#522D21] border border-[#522D21]/20 font-semibold rounded-xl px-8 py-4 hover:bg-[#f6dbe0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#522D21]/10"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-[#522D21]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>

                {/* Socials / Direct Join Area */}
                <div className="mt-8 pt-8 border-t border-[#2b2622]/5 flex flex-col items-center text-center">
                  <p className="text-[#2b2622]/60 text-sm mb-1">Or connect with us directly</p>
                  <p className="text-[#2b2622]/30 text-xs mb-5 italic tracking-wide">Your presence is a gift. Step into our world whenever you're ready.</p>
                  <SocialCard />
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10"
              >
                <div className="h-20 w-20 bg-[#2b2622]/5 rounded-full flex items-center justify-center mb-6 border border-[#2b2622]/10">
                  <svg className="w-8 h-8 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-medium tracking-tight mb-4 text-[#2b2622]">
                  Application received.
                </h3>
                <p className="text-[#2b2622]/60 text-sm leading-relaxed mb-8">
                  Thank you for taking the first step. We're excited to learn more about you. While you wait, join our community directly below:
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
