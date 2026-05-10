import { motion } from 'framer-motion';

function About() {
  return (
    <div className="page fade-in">
      <section className="about" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-image-wrapper"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src="/about-image.png" alt="People gathering in a warm space" />
              <div className="about-overlay"></div>
            </motion.div>
            
            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2>Nizhal (நிழல்) means shadow — a quiet shade beside someone.</h2>
              <p>
                Nizhal began from a simple belief: people deserve a space where they can just be themselves.
              </p>
              <p>
                Not a big organization.<br/>
                Not a perfect plan.
              </p>
              <p>
                Just a small community built on conversations, presence, and people showing up for each other.
              </p>
              <p>
                Here, stories are shared, strangers become familiar, and everyone is welcome exactly as they are.
              </p>
              <p>
                <strong>A circle of warmth.</strong> humans • stories • connection <br/>
                At the end of the day, we all walk each other home. <br/>
                📍Chennai | India
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
