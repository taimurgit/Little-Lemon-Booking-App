import { Link, useLocation } from "react-router-dom";

export default function ConfirmationPage() {
  const { state } = useLocation();
  const reservation = state?.reservation;

  return (
    <main className="confirmation-section">
      <div className="confirmation-card">
        <div className="confirmation-icon" aria-hidden="true">✓</div>
        <p className="eyebrow">LITTLE LEMON</p>
        <h1>{reservation ? "Your request is confirmed!" : "Thank you for visiting."}</h1>
        {reservation ? (
          <>
            <p>We look forward to welcoming you. Here are your reservation details:</p>
            <dl className="reservation-details">
              <div><dt>Date</dt><dd>{reservation.date}</dd></div>
              <div><dt>Time</dt><dd>{reservation.time}</dd></div>
              <div><dt>Guests</dt><dd>{reservation.guests}</dd></div>
              <div><dt>Occasion</dt><dd>{reservation.occasion}</dd></div>
            </dl>
          </>
        ) : <p>Your reservation details are not available in this session. You can start a new booking below.</p>}
        <Link className="button button-primary" to="/booking">Make another reservation</Link>
      </div>
    </main>
  );
}