import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Little Lemon home">
          <span className="brand-mark" aria-hidden="true">🍋</span>
          <span className="brand-name">LITTLE LEMON</span>
        </Link>
        <nav aria-label="Main navigation" className="main-nav">
          <NavLink to="/">Home</NavLink>
          <a href="/#menu">Menu</a>
          <a href="/#about">About</a>
          <NavLink to="/booking">Reservations</NavLink>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}