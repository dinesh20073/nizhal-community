import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Hero from './Hero';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';
import JoinModal from './components/JoinModal';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Hero /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#fcfaf8] w-full overflow-x-hidden">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <JoinModal />
      </div>
    </BrowserRouter>
  );
}

export default App;
