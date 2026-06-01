# Workout Tracker

A workout logging app built with React and Firebase. Log workouts, add exercises, and track volume over time. Data persists via Firestore.

**Live: [workout-tracker-rho-neon.vercel.app](https://workout-tracker-rho-neon.vercel.app)**

## What it does

You can create a workout (name, date, duration), add exercises to it (name, sets, reps, weight, muscle group), and the app calculates total volume per workout. There's a stats page that shows total workouts logged, average duration, and cumulative volume.

## Stack

- Vite + React (functional components, useState)
- Firebase Firestore for data persistence
- Deployed on Vercel

## Background

Started this as a Java prototype — three classes modeling exercises, workouts, and a workout log. Rebuilt it as a web app to learn React and get real data persistence working. The core data model stayed the same, just translated across paradigms.

## Running locally

Clone the repo and install dependencies:

```bash
git clone https://github.com/atharvscodez/Workout-Tracker.git
cd Workout-Tracker
npm install
```

Copy `.env.example` to `.env` and add your Firebase project credentials:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

```bash
npm run dev
```

## Planned

Google auth, lift progression charts, mobile layout.