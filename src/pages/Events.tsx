import InstagramFeed from '../components/InstagramFeed';

const Events = () => {
  return (
    <div className="bg-[#fcfaf8] text-[#2b2622] min-h-screen">
      <section className="relative w-full pt-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto mt-20 mb-20">
          <h1 className="hero-title font-medium text-6xl md:text-8xl mb-12 lowercase">
            events
          </h1>
          <div className="h-px w-full bg-[#2b2622]/10 mb-12"></div>
        </div>
      </section>

      <InstagramFeed />
    </div>
  );
};

export default Events;
