import bodyBgUrl from '../assets/body.png';

const About = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#fcfaf8] pt-32 pb-20 px-6 md:px-10 text-[#2b2622] flex flex-col justify-center overflow-hidden">
      {/* Decorative Background Artwork */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img 
          src={bodyBgUrl} 
          alt="Nizhal About Background" 
          className="w-full h-full object-cover object-center opacity-90"
        />
      </div>

      <div className="max-w-4xl mx-auto my-auto text-center relative z-10">
        <h1 className="hero-title font-medium text-6xl md:text-8xl mb-12 lowercase">
          about us
        </h1>
        <p className="text-xl md:text-2xl text-[#2b2622]/80 lowercase max-w-2xl mx-auto leading-relaxed mb-8">
          nizhal community is a quiet space beside you. we believe in the power of genuine human connection and listening.
        </p>
        <p className="text-lg text-[#2b2622]/60 lowercase leading-relaxed max-w-2xl mx-auto">
          in a loud, fast-paced world, finding a place to simply exist without expectations is rare. we built this community to bring people together, share stories, and foster empathy. everyone has a story worth hearing.
        </p>
      </div>
    </section>
  );
};

export default About;
