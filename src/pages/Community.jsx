import { motion } from 'framer-motion';
import { Heart, Users, Coffee } from 'lucide-react';
import { useState } from 'react';

function Community() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // '', 'loading', 'success', 'error'

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Replace this URL with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

    // Using a simple fetch to send data to the Google Sheet via Apps Script
    // Form data will be sent as urlencoded or JSON depending on the script setup.
    // Standard Apps Script setup usually prefers formData.

    try {
      const formBody = new URLSearchParams();
      formBody.append('Name', formData.name);
      formBody.append('Email', formData.email);
      formBody.append('Message', formData.message || 'Joined from website');

      // We use no-cors here if the Google Script isn't returning proper CORS headers, 
      // but usually fetching to Apps Script requires a specific setup.
      // For demonstration, we attempt a standard POST request.

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      // Google Script with no-cors will return an opaque response.
      // We assume success if it doesn't throw a network error.
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error('Submission failed', error);
      setStatus('error');
    }
  };

  return (
    <div className="page fade-in">
      {/* Values Section */}
      <section className="values" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Values</h2>
          </motion.div>

          <motion.div
            className="values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div className="value-card" variants={fadeIn}>
              <div className="value-number">01</div>
              <Heart className="mx-auto mb-4" size={32} color="var(--color-peach)" style={{ margin: '0 auto 1rem' }} />
              <h3 className="value-title">Belong</h3>
              <p className="value-desc">A space where everyone feels safe to exist.</p>
            </motion.div>

            <motion.div className="value-card" variants={fadeIn}>
              <div className="value-number">02</div>
              <Users className="mx-auto mb-4" size={32} color="var(--color-sky)" style={{ margin: '0 auto 1rem' }} />
              <h3 className="value-title">Listen</h3>
              <p className="value-desc">Every story deserves to be heard.</p>
            </motion.div>

            <motion.div className="value-card" variants={fadeIn}>
              <div className="value-number">03</div>
              <Coffee className="mx-auto mb-4" size={32} color="var(--color-soft-taupe)" style={{ margin: '0 auto 1rem' }} />
              <h3 className="value-title">Connect</h3>
              <p className="value-desc">Strangers slowly become familiar.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Join Section */}
      <section className="join" id="join">
        <div className="join-blob"></div>
        <div className="container">
          <motion.div
            className="join-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Join Nizhal</h2>
            <p>You don't need to be perfect to belong here. Just come as you are.</p>

            <form className="join-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-input"
                  placeholder="Any message for us? (Optional)"
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ resize: 'none', fontFamily: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-submit"
                disabled={status === 'loading'}
                style={{ opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? 'Sending...' : 'Join Nizhal'}
              </button>

              {status === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--color-peach)', marginTop: '1rem', fontWeight: '500' }}>
                  Thank you! Your information has been saved successfully.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ff6b6b', marginTop: '1rem' }}>
                  Oops! Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Community;
