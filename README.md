# Hogs CRM

This project uses Firebase for authentication. To run the project locally, you must
provide your own Firebase credentials.

1. Copy `.env.example` to `.env`.
2. Fill in the values for `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN` and `VITE_FIREBASE_PROJECT_ID` using your Firebase configuration.
3. Install dependencies with `npm install`.
4. Start the development server using `npm run dev`.

The provided example environment file lists the variables required by `src/firebase-config.js`.
