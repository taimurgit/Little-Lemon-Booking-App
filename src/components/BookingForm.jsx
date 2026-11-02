import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitAPI } from "../api";

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const initialForm = (date) => ({
  date,
  time: "",
  guests: "2",
  occasion: "Birthday"
});

export default function BookingForm({ availableTimes, dispatch }) {
  const navigate = useNavigate();
  const today = getLocalDateString();
  const [formData, setFormData] = useState(() => initialForm(today));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === "date" ? { time: "" } : {})
    }));

    setErrors((current) => ({ ...current, [name]: "", submit: "" }));

    if (name === "date" && value) {
      dispatch({ type: "UPDATE_TIMES", payload: value });
    }
  }

  function validate() {
    const nextErrors = {};
    const guests = Number(formData.guests);

    if (!formData.date) {
      nextErrors.date = "Choose a reservation date.";
    } else if (formData.date < today) {
      nextErrors.date = "The reservation date cannot be in the past.";
    }

    if (!formData.time) {
      nextErrors.time = "Choose an available time.";
    } else if (!availableTimes.includes(formData.time)) {
      nextErrors.time = "That time is no longer available. Please choose another.";
    }

    if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
      nextErrors.guests = "Enter a whole number between 1 and 10.";
    }

    if (!["Birthday", "Anniversary"].includes(formData.occasion)) {
      nextErrors.occasion = "Choose a valid occasion.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting || !validate()) return;

    setSubmitting(true);
    setErrors((current) => ({ ...current, submit: "" }));

    try {
      const reservation = {
        ...formData,
        guests: Number(formData.guests)
      };
      const successful = await Promise.resolve(submitAPI(reservation));

      if (!successful) {
        setErrors({ submit: "We couldn't complete your reservation. Please try again." });
        return;
      }

      navigate("/confirmed", { state: { reservation } });
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="res-date">Choose date</label>
        <input
          id="res-date"
          name="date"
          type="date"
          min={today}
          value={formData.date}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        {errors.date && <p className="field-error" id="date-error" role="alert">{errors.date}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.time)}
          aria-describedby={errors.time ? "time-error" : undefined}
        >
          <option value="">Select a time</option>
          {availableTimes.map((time) => <option key={time} value={time}>{time}</option>)}
        </select>
        {errors.time && <p className="field-error" id="time-error" role="alert">{errors.time}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="guests">Number of guests</label>
        <input
          id="guests"
          name="guests"
          type="number"
          min="1"
          max="10"
          step="1"
          inputMode="numeric"
          value={formData.guests}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.guests)}
          aria-describedby={errors.guests ? "guests-error" : "guests-help"}
        />
        <span className="field-hint" id="guests-help">For parties of 1–10 guests.</span>
        {errors.guests && <p className="field-error" id="guests-error" role="alert">{errors.guests}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.occasion)}
          aria-describedby={errors.occasion ? "occasion-error" : undefined}
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        {errors.occasion && <p className="field-error" id="occasion-error" role="alert">{errors.occasion}</p>}
      </div>

      {errors.submit && <p className="form-error" role="alert">{errors.submit}</p>}

      <button className="button button-primary submit-button" type="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Make Your Reservation"}
      </button>
      <p className="privacy-note">Your table request is just a few clicks away.</p>
    </form>
  );
}