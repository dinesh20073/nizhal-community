import SocialCard from './SocialCard';

const Footer = () => {
  return (
    <footer className="w-full bg-[#fcfaf8] border-t border-[#2b2622]/5 py-8 px-6 md:px-10 text-[#2b2622] flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative mt-auto">
      <div className="flex items-center gap-3">
        <span className="text-[#2b2622]/40 text-xs md:text-sm font-normal tracking-tight lowercase">nizhal community © {new Date().getFullYear()}</span>
      </div>

      <div className="flex items-center gap-6">
        <SocialCard />
      </div>
    </footer>
  );
};

export default Footer;
