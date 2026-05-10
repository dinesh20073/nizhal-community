import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function JoinModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          >
            <button className="modal-close" onClick={onClose}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <h2>Join Nizhal</h2>
              <p>Step into our quiet space.</p>
            </div>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); alert("Welcome to Nizhal!"); onClose(); }}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="hello@example.com" required />
              </div>
              <div className="form-group">
                <label>Why do you want to join?</label>
                <textarea rows="3" placeholder="Share a little bit about yourself..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default JoinModal;
