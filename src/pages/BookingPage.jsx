import BookingForm from "../components/BookingForm";

export default function BookingPage({ availableTimes, dispatch }) {
  return (
    <section className="booking-section">
      <div className="booking-intro">
        <p className="eyebrow">YOUR TABLE IS WAITING</p>
        <h1>Make a reservation</h1>
        <p>Join us for a memorable meal. Choose your date, time, and party size below.</p>
      </div>
      <div className="booking-layout">
        <div className="booking-aside">
          <div className="aside-image" role="img" aria-label="Mediterranean dishes served at a restaurant" />
          <h2>A little taste of the Mediterranean.</h2>
          <p>Seasonal ingredients, bright flavors, and warm hospitality. We look forward to welcoming you.</p>
          <div className="opening-hours">
            <strong>Opening hours</strong>
            <span>Monday – Sunday</span>
            <span>5:00 PM – 10:00 PM</span>
          </div>
        </div>
        <div className="form-panel">
          <h2>Reserve your table</h2>
          <p className="form-subtitle">All fields are required.</p>
          <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
        </div>
      </div>
    </section>
  );
}