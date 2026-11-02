import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">CHICAGO · MEDITERRANEAN KITCHEN</p>
            <h1>Little Lemon</h1>
            <h2>A little zest. A lot of flavor.</h2>
            <p>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
            <Link className="button button-primary" to="/booking">Reserve a table</Link>
          </div>
          <div className="hero-photo" role="img" aria-label="Fresh Mediterranean food on a restaurant table" />
        </div>
      </section>
      <section className="highlights" id="menu">
        <div className="section-heading">
          <div><p className="eyebrow">MADE FRESH, SERVED WITH LOVE</p><h2>From our kitchen</h2></div>
          <Link className="button button-outline" to="/booking">Book a table</Link>
        </div>
        <div className="highlight-grid">
          <article className="highlight-card"><div className="food-photo food-one" /><div className="highlight-content"><h3>Seasonal favorites</h3><p>Colorful ingredients and bold Mediterranean flavors in every bite.</p></div></article>
          <article className="highlight-card"><div className="food-photo food-two" /><div className="highlight-content"><h3>Made to share</h3><p>Gather around the table for generous plates and good conversation.</p></div></article>
          <article className="highlight-card"><div className="food-photo food-three" /><div className="highlight-content"><h3>Something sweet</h3><p>Finish your meal with a little treat from our dessert menu.</p></div></article>
        </div>
      </section>
      <section className="about-strip" id="about"><div><p className="eyebrow">OUR STORY</p><h2>Good food brings people together.</h2><p>At Little Lemon, every meal is an invitation to slow down, share, and enjoy.</p></div><Link to="/booking" className="text-link">Plan your visit →</Link></section>
    </main>
  );
}