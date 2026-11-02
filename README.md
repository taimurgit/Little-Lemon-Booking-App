# Little Lemon — Table Booking App

A responsive restaurant reservation app built with React. It demonstrates controlled form inputs, accessible validation, React Router, and `useReducer` for date-dependent available booking times.

## Features

- Reservation form with date, time, guest count, and occasion.
- Controlled inputs using React state.
- `useReducer` state management in `Main`.
- `initializeTimes` and `updateTimes` reducer functions.
- Date changes dispatch an action to update available times.
- Client-side validation and accessible error messages.
- Reservation confirmation screen.
- Responsive layout and keyboard-visible focus states.
- Unit tests with Vitest and React Testing Library.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd little-lemon-booking
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Run tests and production build

```bash
npm test
npm run build
npm run preview
```

## Project structure

```text
src/
├── api.js
├── App.jsx
├── main.jsx
├── components/
│   ├── BookingForm.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── Main.jsx
├── pages/
│   ├── BookingPage.jsx
│   ├── ConfirmationPage.jsx
│   └── HomePage.jsx
├── styles/
│   └── global.css
└── tests/
    ├── BookingForm.test.jsx
    ├── Main.test.jsx
    └── setup.js
```

## Booking API note

`src/api.js` contains a local mock of the Little Lemon course API so the project runs independently. In a course-provided starter repository, retain the supplied `fetchAPI` and `submitAPI` implementations if required by the grader. The mock `fetchAPI` returns the same set of times for each date, as permitted by the assignment's initial reducer exercise. `submitAPI` simulates a successful submission.

## Push to GitHub

Create an empty repository on GitHub, then run:

```bash
git init
git add .
git commit -m "feat: build Little Lemon table booking app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/little-lemon-booking.git
git push -u origin main
```

Replace `YOUR_USERNAME` and the repository URL with your own values.
