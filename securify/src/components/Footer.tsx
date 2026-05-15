import SocialCard from './SocialCard';

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white/5 py-8 px-6 md:px-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative mt-auto">
      <div className="flex items-center gap-3">
        <span className="text-white/40 text-xs md:text-sm font-normal tracking-tight lowercase">nizhal community © {new Date().getFullYear()}</span>
      </div>
      
      <div className="flex items-center gap-6">
        <SocialCard />
      </div>
    </footer>
  );
};

export default Footer;
