import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Community from './pages/Community';
import Events from './pages/Events';
import './App.css';
import './modal.css';

function ScrollToTop() {
  const { pathname } = window.location;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    document.title = "Nizhal | A quiet space beside you";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Nizhal is a quiet space where people gather, stories are shared, and everyone is welcome to simply exist. Join our community.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Nizhal is a quiet space where people gather, stories are shared, and everyone is welcome to simply exist. Join our community.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
