import heroBgUrl from './assets/hero-bg.png';
import ctaBgUrl from './assets/cta-bg.png';
import activeListeningVideoUrl from './assets/active-listening.mp4';
import ImageGallery from './components/ImageGallery';
import MediaMarquee from './components/MediaMarquee';

const Hero = () => {
  return (
    <div className="w-full bg-[#fcfaf8] text-[#2b2622] selection:bg-[#2b2622]/30">
      {/* 1. Hero Section with Background Image and the 3 Words Alone */}
      <section className="relative h-screen w-full overflow-hidden bg-[#fcfaf8] flex items-center justify-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={heroBgUrl}
            alt="Nizhal Community Circle of Warmth"
            className="w-full h-full object-cover select-none"
          />
          {/* Subtle natural vignette to make white words pop */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        {/* Foreground 3 Words Alone in White */}
        <div className="relative h-full w-full pointer-events-none z-10">
          <h1 className="hero-title absolute text-white font-medium text-[11vw] md:text-[8.5vw] left-6 md:left-14 top-[15%] lowercase select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            listen
          </h1>
          <h1 className="hero-title absolute text-white font-medium text-[11vw] md:text-[8.5vw] right-6 md:right-14 top-[15%] lowercase select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            connect
          </h1>
          <h1 className="hero-title absolute text-white font-medium text-[11vw] md:text-[8.5vw] left-1/2 -translate-x-1/2 bottom-[10%] lowercase select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] text-center whitespace-nowrap">
            belong
          </h1>
        </div>
      </section>

      {/* 2. Frame-by-Frame Media Marquee Section (Photos & Full Mute Videos in B&W) */}
      <MediaMarquee />

      {/* 3. Pillars / Features Section - Edge-to-Edge Sharp Grid */}
      <section className="w-full border-b border-[#2b2622]/10 bg-[#fcfaf8]">
        <div className="px-6 md:px-14 pt-24 pb-16 max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-[#2b2622]/40 font-medium block mb-4">
            our core pillars
          </span>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight lowercase mb-6">
            a different kind of network.
          </h2>
          <p className="text-lg md:text-xl text-[#2b2622]/60 lowercase leading-relaxed">
            we strip away the noise of modern social platforms. here, you won't find algorithms or endless scrolls—just genuine spaces designed for human connection.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t border-[#2b2622]/10">
          {/* Pillar 1: Active Listening */}
          <div className="p-8 md:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-[#2b2622]/10 hover:bg-[#ebe3d9]/30 transition-colors flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="h-12 w-12 border border-[#2b2622]/15 bg-[#2b2622]/5 flex items-center justify-center group-hover:border-[#522D21] transition-colors">
                  <svg className="w-5 h-5 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                </div>
                <span className="text-xs font-mono text-[#2b2622]/30 group-hover:text-[#522D21] transition-colors">01</span>
              </div>

              {/* Active Listening Video Showcase inside Box */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 border border-[#2b2622]/15 bg-[#2b2622]/5 shadow-sm">
                <video
                  src={activeListeningVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover grayscale contrast-115 brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              <h3 className="text-2xl font-medium mb-4 lowercase text-[#2b2622]">active listening</h3>
              <p className="text-[#2b2622]/60 lowercase leading-relaxed text-sm md:text-base">
                speak without fear of judgment. our community is built on the foundation of hearing each other out, deeply and respectfully.
              </p>
            </div>
          </div>

          {/* Pillar 2: Safe Spaces */}
          <div className="p-8 md:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-[#2b2622]/10 hover:bg-[#ebe3d9]/30 transition-colors flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-10">
                <div className="h-12 w-12 border border-[#2b2622]/15 bg-[#2b2622]/5 flex items-center justify-center group-hover:border-[#522D21] transition-colors">
                  <svg className="w-5 h-5 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <span className="text-xs font-mono text-[#2b2622]/30 group-hover:text-[#522D21] transition-colors">02</span>
              </div>
              <h3 className="text-2xl font-medium mb-4 lowercase text-[#2b2622]">safe spaces</h3>
              <p className="text-[#2b2622]/60 lowercase leading-relaxed text-sm md:text-base">
                every interaction is moderated to ensure a toxic-free environment. you have full control over who you connect with.
              </p>
            </div>
          </div>

          {/* Pillar 3: Shared Presence */}
          <div className="p-8 md:p-12 lg:p-14 hover:bg-[#ebe3d9]/30 transition-colors flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-10">
                <div className="h-12 w-12 border border-[#2b2622]/15 bg-[#2b2622]/5 flex items-center justify-center group-hover:border-[#522D21] transition-colors">
                  <svg className="w-5 h-5 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <span className="text-xs font-mono text-[#2b2622]/30 group-hover:text-[#522D21] transition-colors">03</span>
              </div>
              <h3 className="text-2xl font-medium mb-4 lowercase text-[#2b2622]">shared presence</h3>
              <p className="text-[#2b2622]/60 lowercase leading-relaxed text-sm md:text-base">
                join silent reading rooms, ambient study sessions, or open mic nights. sometimes simply being together is enough.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ImageGallery />

      {/* 4. Final CTA */}
      <section className="relative py-36 md:py-44 px-6 md:px-10 text-center flex flex-col items-center justify-center border-t border-[#2b2622]/5 overflow-hidden bg-[#fcfaf8]">
        {/* Background Image: Black & White Translucent (High Visibility) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
          <img 
            src={ctaBgUrl} 
            alt="Nizhal Community Gathering" 
            className="w-full h-full object-cover grayscale contrast-125 brightness-95 opacity-65"
          />
          {/* Subtle soft scrim overlay to keep text effortlessly readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fcfaf8]/75 via-[#fcfaf8]/40 to-[#fcfaf8]/80 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="hero-title text-6xl md:text-8xl font-medium lowercase mb-8 text-[#2b2622] drop-shadow-sm">
            your story matters.
          </h2>
          <p className="text-xl md:text-2xl text-[#2b2622]/90 lowercase max-w-xl mb-12 leading-relaxed font-normal drop-shadow-sm">
            step into a world where connection is intentional and every voice is valued.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openJoinModal'))}
            className="bg-[#FCEBED] text-[#522D21] border border-[#522D21]/30 text-lg font-semibold rounded-full px-10 py-5 hover:scale-105 hover:bg-[#f6dbe0] transition-all lowercase shadow-xl shadow-[#522D21]/15 cursor-pointer"
          >
            become a member
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
