import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>NIZHAL</h3>
            <p>A quiet space beside you.</p>
            <div className="tamil">நிழல்</div>
          </div>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/community">Community</Link>
            <Link to="/stories">Stories</Link>
            <a href="https://www.instagram.com/nizhal.community" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Nizhal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
