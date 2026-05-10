import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
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

  return (
    <div className="page">
      <section className="hero-split" style={{ paddingTop: '5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          <motion.div
            className="hero-text-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="hero-subtitle" variants={fadeIn}>
              ni.zhal | noun
            </motion.div>
            <motion.h1 className="hero-title" variants={fadeIn} style={{ fontSize: '5rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>
              A quiet space <br />
              <span style={{ color: 'var(--color-soft-taupe)', fontStyle: 'italic' }}>beside you.</span>
            </motion.h1>
            <motion.p className="hero-description" variants={fadeIn} style={{ fontSize: '1.2rem', marginBottom: '2.5rem' }}>
              Where people gather, stories are shared, and everyone is welcome to simply exist. Just a small community built on conversations and presence.
            </motion.p>
            <motion.div className="button-group" variants={fadeIn}>
              <Link to="/community" className="btn btn-primary">
                Join the Community <ArrowRight size={18} />
              </Link>
              <Link to="/stories" className="btn btn-outline">
                Explore Stories
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ position: 'relative', height: '600px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(105, 85, 70, 0.15)' }}
          >
            <img src="/hero-image.png" alt="Circle of warmth" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(105,85,70,0.3), transparent)' }}></div>
          </motion.div>

        </div>
      </section>

      {/* Marquee Section */}
      <section className="marquee-section" style={{ padding: '3rem 0', background: 'var(--color-charcoal)', color: 'var(--color-cream)', overflow: 'hidden' }}>
        <div className="marquee-content" style={{ display: 'flex', whiteSpace: 'nowrap', gap: '3rem', fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            style={{ display: 'flex', gap: '3rem' }}
          >
            <span>✨ Belong</span>
            <span>•</span>
            <span>Listen</span>
            <span>•</span>
            <span>Connect</span>
            <span>•</span>
            <span>Humans</span>
            <span>•</span>
            <span>Stories</span>
            <span>•</span>
            <span>Presence</span>
            <span>•</span>
            <span>✨ Belong</span>
            <span>•</span>
            <span>Listen</span>
            <span>•</span>
            <span>Connect</span>
            <span>•</span>
            <span>Humans</span>
            <span>•</span>
            <span>Stories</span>
            <span>•</span>
            <span>Presence</span>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
