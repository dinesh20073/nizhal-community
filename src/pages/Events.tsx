import InstagramFeed from '../components/InstagramFeed';
import bodyBgUrl from '../assets/body.png';

const Events = () => {
  return (
    <div className="relative bg-[#fcfaf8] text-[#2b2622] min-h-screen overflow-hidden">
      {/* Decorative Background Artwork */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <img 
          src={bodyBgUrl} 
          alt="Nizhal Events Background" 
          className="w-full h-full object-cover object-top opacity-80"
        />
      </div>

      <section className="relative w-full pt-32 px-6 md:px-10 z-10">
        <div className="max-w-5xl mx-auto mt-20 mb-20">
          <h1 className="hero-title font-medium text-6xl md:text-8xl mb-12 lowercase">
            events
          </h1>
          <div className="h-px w-full bg-[#2b2622]/10 mb-12"></div>
        </div>
      </section>

      <div className="relative z-10">
        <InstagramFeed />
      </div>
    </div>
  );
};

export default Events;
