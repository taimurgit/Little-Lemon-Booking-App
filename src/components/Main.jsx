import { useReducer } from "react";
import { fetchAPI } from "../api";
import BookingPage from "../pages/BookingPage";

// Reducer initializer: gets the initial available booking times.
export function initializeTimes() {
  return fetchAPI(new Date());
}

// Reducer: updates available times when the selected date changes.
export function updateTimes(state, action) {
  if (action.type === "UPDATE_TIMES") {
    return fetchAPI(new Date(`${action.payload}T12:00:00`));
  }

  return state;
}

export default function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  return (
    <main>
      <BookingPage availableTimes={availableTimes} dispatch={dispatch} />
    </main>
  );
}