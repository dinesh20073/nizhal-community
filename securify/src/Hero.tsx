import ImageGallery from './components/ImageGallery';

const Hero = () => {
  return (
    <div className="w-full bg-[#fcfaf8] text-[#2b2622] selection:bg-[#2b2622]/30">
      {/* 1. Hero Section (Original) */}
      <section className="relative h-screen w-full overflow-hidden bg-[#fcfaf8]">
        {/* Foreground content wrapper */}
        <div className="relative h-full w-full pointer-events-none">
          {/* Headlines */}
          <h1 className="hero-title absolute text-[#2b2622] font-medium text-[14vw] md:text-[13vw] left-4 md:left-10 top-[18%] lowercase">
            listen
          </h1>
          <h1 className="hero-title absolute text-[#2b2622] font-medium text-[14vw] md:text-[13vw] right-4 md:right-10 top-[38%] lowercase">
            connect
          </h1>
          <h1 className="hero-title absolute text-[#2b2622] font-medium text-[14vw] md:text-[13vw] left-[18%] md:left-[28%] top-[58%] lowercase">
            belong
          </h1>

          {/* Description */}
          <p className="absolute left-6 md:left-10 top-[46%] max-w-[240px] text-[15px] leading-snug text-[#2b2622]/90 lowercase pointer-events-auto">
            where people gather, stories are shared, and everyone is welcome to simply exist.
          </p>

          {/* Stat block - top-right */}
          <div className="absolute right-6 md:right-24 top-[12%] md:top-[14%]">
            <div className="flex items-center gap-3 justify-end">
              <div className="hidden md:block h-px w-24 bg-[#2b2622]/40 rotate-[20deg]" />
              <span className="text-3xl md:text-5xl font-medium tracking-tight text-[#2b2622]">+10k</span>
            </div>
            <div className="text-xs md:text-sm text-[#2b2622]/70 mt-1 text-right lowercase">
              conversations
            </div>
          </div>

          {/* Stat block - bottom-left */}
          <div className="absolute left-6 md:left-20 bottom-32 md:bottom-24">
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-5xl font-medium tracking-tight text-[#2b2622]">+500</span>
              <div className="hidden md:block h-px w-24 bg-[#2b2622]/40 rotate-[-20deg]" />
            </div>
            <div className="text-xs md:text-sm text-[#2b2622]/70 mt-1 lowercase">
              members joined
            </div>
          </div>

          {/* Stat block - bottom-right */}
          <div className="absolute right-6 md:right-20 bottom-12 md:bottom-20">
            <div className="flex items-center gap-3 justify-end">
              <div className="hidden md:block h-px w-24 bg-[#2b2622]/40 rotate-[-20deg]" />
              <span className="text-3xl md:text-5xl font-medium tracking-tight text-[#2b2622]">+50</span>
            </div>
            <div className="text-xs md:text-sm text-[#2b2622]/70 mt-1 text-right lowercase">
              community events
            </div>
          </div>

          {/* Bottom gradient */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#fcfaf8]" />
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
          className="bg-[#ff5a1f] text-white text-lg font-medium rounded-full px-10 py-5 hover:scale-105 transition-transform lowercase"
        >
          become a member
        </button>
      </section>
    </div>
  );
};

export default Hero;
