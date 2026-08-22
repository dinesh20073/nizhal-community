import { motion } from 'framer-motion';

const MOCK_POSTS = [
  { id: '1', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', caption: 'community gathering ✨' },
  { id: '2', type: 'VIDEO', url: 'https://images.unsplash.com/photo-1511632765486-a01c80cf59af?w=800&q=80', caption: 'quiet moments.' },
  { id: '3', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?w=800&q=80', caption: 'connections.' },
  { id: '4', type: 'IMAGE', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80', caption: 'safe spaces.' },
];

const ImageGallery = () => {
  return (
    <section className="py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-[#2b2622]/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight lowercase mb-4">
            on the gram.
          </h2>
          <p className="text-lg text-[#2b2622]/50 lowercase max-w-md">
            glimpses into our community, safe spaces, and shared moments.
          </p>
        </div>
        <a 
          href="https://www.instagram.com/nizhal.community/" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 text-sm lowercase border border-[#2b2622]/10 rounded-full px-6 py-3 hover:bg-[#522D21] hover:border-[#522D21] hover:text-white transition-all cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          follow us
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_POSTS.map((post, i) => (
          <motion.a
            key={post.id}
            href="https://www.instagram.com/nizhal.community/"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#ebe3d9] border border-[#2b2622]/5"
          >
            <img 
              src={post.url} 
              alt={post.caption} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fcfaf8]/80 via-[#dfd3c3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-[#2b2622] text-sm line-clamp-2 lowercase leading-snug">
                {post.caption}
              </p>
            </div>
            {post.type === 'VIDEO' && (
              <div className="absolute top-4 right-4 bg-[#fcfaf8]/40 backdrop-blur-md p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            )}
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;
