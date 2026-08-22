import { useState } from 'react';
import { motion } from 'framer-motion';
import InstagramFeed from '../components/InstagramFeed';

const GATHERINGS = [
  {
    title: 'the listening circle',
    badge: 'recurring weekly',
    type: 'online & in-person',
    description: 'a moderated circle where each participant has dedicated time to share whatever is on their mind while everyone listens intently without interruption.',
    date: 'every saturday • 6:30 pm',
    spots: '12 spots per circle'
  },
  {
    title: 'ambient co-working & reading',
    badge: 'silent room',
    type: 'online voice room',
    description: 'gentle background lofi sounds and shared presence. work, read, or sketch alongside others without the pressure of having to speak.',
    date: 'tuesdays & thursdays • 8:00 pm',
    spots: 'open to all members'
  },
  {
    title: 'tales & reflections',
    badge: 'monthly theme',
    type: 'hybrid gathering',
    description: 'open-floor storytelling around a monthly theme. share personal memories, poetry, or simply enjoy listening to others.',
    date: 'last sunday of every month',
    spots: 'limited seating'
  }
];

const Events = () => {
  const [activeTab, setActiveTab] = useState<'gatherings' | 'instagram'>('gatherings');

  return (
    <div className="bg-[#fcfaf8] text-[#2b2622] selection:bg-[#2b2622]/30 min-h-screen">
      {/* Header Section */}
      <section className="relative w-full pt-36 pb-12 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-title font-medium text-6xl md:text-8xl mb-6 lowercase tracking-tight"
          >
            events & circles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-[#2b2622]/70 lowercase max-w-2xl mx-auto leading-relaxed mb-10"
          >
            spaces to gather, listen, and simply be together.
          </motion.p>

          {/* Toggle buttons */}
          <div className="inline-flex items-center p-1.5 bg-[#ebe3d9]/70 rounded-full border border-[#2b2622]/10 mb-16 shadow-inner">
            <button
              onClick={() => setActiveTab('gatherings')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium lowercase transition-all duration-300 ${
                activeTab === 'gatherings'
                  ? 'bg-[#2b2622] text-[#fcfaf8] shadow-sm'
                  : 'text-[#2b2622]/60 hover:text-[#2b2622]'
              }`}
            >
              upcoming circles
            </button>
            <button
              onClick={() => setActiveTab('instagram')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium lowercase transition-all duration-300 ${
                activeTab === 'instagram'
                  ? 'bg-[#2b2622] text-[#fcfaf8] shadow-sm'
                  : 'text-[#2b2622]/60 hover:text-[#2b2622]'
              }`}
            >
              instagram reels & stories
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      {activeTab === 'gatherings' ? (
        <section className="pb-32 px-6 md:px-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GATHERINGS.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#ebe3d9]/40 border border-[#2b2622]/10 p-8 rounded-3xl flex flex-col justify-between hover:bg-[#ebe3d9] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#ff5a1f] font-semibold bg-[#ff5a1f]/10 px-3 py-1 rounded-full">
                      {event.badge}
                    </span>
                    <span className="text-xs text-[#2b2622]/50 lowercase">
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-medium mb-3 lowercase text-[#2b2622]">
                    {event.title}
                  </h3>

                  <p className="text-sm text-[#2b2622]/70 lowercase leading-relaxed mb-6">
                    {event.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#2b2622]/10 flex flex-col gap-4">
                  <div className="text-xs text-[#2b2622]/60 lowercase flex items-center justify-between">
                    <span>{event.date}</span>
                    <span className="text-[#2b2622]/40">{event.spots}</span>
                  </div>
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('openJoinModal'))}
                    className="w-full bg-[#2b2622] text-[#fcfaf8] text-sm font-medium py-3 rounded-2xl hover:bg-[#ff5a1f] transition-colors lowercase shadow-sm"
                  >
                    rsvp via community
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-[#f4efe8] p-8 md:p-12 rounded-3xl border border-[#2b2622]/5 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-medium mb-3 lowercase">want to host a circle or session?</h3>
            <p className="text-sm md:text-base text-[#2b2622]/60 lowercase mb-6 max-w-xl mx-auto">
              if you have an idea for a mindful workshop, reading hour, or group conversation, we'd love to support you.
            </p>
            <a
              href="mailto:nizhal.community@gmail.com"
              className="inline-block bg-[#ff5a1f] text-white text-sm font-medium px-8 py-3.5 rounded-full hover:scale-105 transition-transform lowercase shadow-md shadow-[#2b2622]/10"
            >
              propose a gathering
            </a>
          </div>
        </section>
      ) : (
        <InstagramFeed />
      )}
    </div>
  );
};

export default Events;
