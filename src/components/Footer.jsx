import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">🍋 LITTLE LEMON</div>
          <p>Fresh Mediterranean flavors, made with love.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/">Home</Link>
          <Link to="/booking">Reservations</Link>
        </div>
        <div>
          <h2>Visit us</h2>
          <p>Chicago, Illinois</p>
          <p>hello@littlelemon.example</p>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
    </footer>
  );
}