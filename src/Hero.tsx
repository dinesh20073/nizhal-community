import heroBgUrl from './assets/hero-bg.png';
import ImageGallery from './components/ImageGallery';

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
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fcfaf8] to-transparent pointer-events-none" />
        </div>

        {/* Foreground 3 Words Alone in White */}
        <div className="relative h-full w-full pointer-events-none z-10">
          <h1 className="hero-title absolute text-white font-medium text-[15vw] md:text-[12vw] left-4 md:left-12 top-[16%] lowercase select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            listen
          </h1>
          <h1 className="hero-title absolute text-white font-medium text-[15vw] md:text-[12vw] right-4 md:right-12 top-[40%] lowercase select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            connect
          </h1>
          <h1 className="hero-title absolute text-white font-medium text-[15vw] md:text-[12vw] left-[12%] md:left-[22%] bottom-[10%] lowercase select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            belong
          </h1>
        </div>
      </section>

      {/* 2. Marquee Section */}
      <section className="py-20 bg-[#f4efe8] border-y border-[#2b2622]/5 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-12 items-center">
          {Array(4).fill(["✨ belong", "listen", "connect", "humans", "stories", "presence"]).flat().map((word, i) => (
            <span key={i} className="text-3xl md:text-5xl font-medium text-[#2b2622]/40 lowercase inline-block">
              {word} <span className="mx-8 text-[#2b2622]/10">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* 3. Pillars / Features Section */}
      <section className="py-32 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight lowercase mb-6">
            a different kind of network.
          </h2>
          <p className="text-xl text-[#2b2622]/60 lowercase leading-relaxed">
            we strip away the noise of modern social platforms. here, you won't find algorithms or endless scrolls—just genuine spaces designed for human connection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#ebe3d9]/40 border border-[#2b2622]/10 p-10 rounded-3xl hover:bg-[#ebe3d9] transition-colors">
            <div className="h-12 w-12 rounded-full bg-[#2b2622]/10 flex items-center justify-center mb-10">
              <svg className="w-6 h-6 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            </div>
            <h3 className="text-2xl font-medium mb-4 lowercase">active listening</h3>
            <p className="text-[#2b2622]/60 lowercase leading-relaxed">
              speak without fear of judgment. our community is built on the foundation of hearing each other out, deeply and respectfully.
            </p>
          </div>

          <div className="bg-[#ebe3d9]/40 border border-[#2b2622]/10 p-10 rounded-3xl hover:bg-[#ebe3d9] transition-colors">
            <div className="h-12 w-12 rounded-full bg-[#2b2622]/10 flex items-center justify-center mb-10">
              <svg className="w-6 h-6 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h3 className="text-2xl font-medium mb-4 lowercase">safe spaces</h3>
            <p className="text-[#2b2622]/60 lowercase leading-relaxed">
              every interaction is moderated to ensure a toxic-free environment. you have full control over who you connect with.
            </p>
          </div>

          <div className="bg-[#ebe3d9]/40 border border-[#2b2622]/10 p-10 rounded-3xl hover:bg-[#ebe3d9] transition-colors">
            <div className="h-12 w-12 rounded-full bg-[#2b2622]/10 flex items-center justify-center mb-10">
              <svg className="w-6 h-6 text-[#2b2622]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </div>
            <h3 className="text-2xl font-medium mb-4 lowercase">shared presence</h3>
            <p className="text-[#2b2622]/60 lowercase leading-relaxed">
              join silent reading rooms, ambient study sessions, or open mic nights. sometimes simply being together is enough.
            </p>
          </div>
        </div>
      </section>

      <ImageGallery />

      {/* 4. Final CTA */}
      <section className="py-32 px-6 md:px-10 text-center flex flex-col items-center justify-center border-t border-[#2b2622]/5 bg-gradient-to-t from-[#f4efe8] to-[#fcfaf8]">
        <h2 className="hero-title text-6xl md:text-8xl font-medium lowercase mb-8">
          your story matters.
        </h2>
        <p className="text-xl text-[#2b2622]/60 lowercase max-w-xl mb-12">
          step into a world where connection is intentional and every voice is valued.
        </p>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('openJoinModal'))}
          className="bg-[#ff5a1f] text-white text-lg font-medium rounded-full px-10 py-5 hover:scale-105 transition-transform lowercase shadow-lg shadow-[#2b2622]/10"
        >
          become a member
        </button>
      </section>
    </div>
  );
};

export default Hero;
