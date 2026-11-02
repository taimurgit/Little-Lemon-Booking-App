// Standalone mock of the Little Lemon course API.
// Replace these implementations with the supplied course API when integrating
// this project into the official starter repository.

const TIMES = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

export function fetchAPI(_date) {
  // The assignment permits returning the same times for every selected date.
  return [...TIMES];
}

export function submitAPI(_formData) {
  // Simulates a successful reservation request.
  return true;
}