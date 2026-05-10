import { motion } from 'framer-motion';

function Events() {

  const instagramLinks = [
    "https://www.instagram.com/p/DVl32cQgIUO/",
    "https://www.instagram.com/reel/DWwIdBPACQC/",
    "https://www.instagram.com/p/DVl-pExEzr7/",
    "https://www.instagram.com/reel/DXrp4wBAKt7/",
    "https://www.instagram.com/reel/DXo0AIezkxv/",
    "https://www.instagram.com/reel/DXmbIQmANMO/",
    "https://www.instagram.com/reel/DXXFrAdgPvE/",
    "https://www.instagram.com/reel/DXHevLgki0u/"
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="page fade-in">
      <section className="stories" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
        <div className="container">

          <div className="section-header">
            <h2>Community Events</h2>
            <p style={{ color: 'var(--color-mocha)', marginTop: '1rem' }}>Latest posts and reels from Nizhal.</p>
          </div>

          <motion.div
            className="instagram-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem'
            }}
          >
            {instagramLinks.map((url, index) => {
              const cleanUrl = url.split('?')[0];
              const embedUrl = cleanUrl.endsWith('/') ? `${cleanUrl}embed` : `${cleanUrl}/embed`;

              return (
                <motion.div key={index} variants={itemFade} className="instagram-embed-wrapper">
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="500"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency="true"
                    allow="encrypted-media"
                    style={{
                      borderRadius: '15px',
                      border: '1px solid rgba(210, 188, 172, 0.2)',
                      boxShadow: '0 10px 30px rgba(210, 188, 172, 0.1)',
                      background: 'white',
                      overflow: 'hidden'
                    }}
                  ></iframe>
                </motion.div>
              );
            })}
          </motion.div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <a href="https://www.instagram.com/nizhal.community" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              View more on Instagram
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Events;
