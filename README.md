# Smart Lecture Notifier

Smart Lecture Notifier is a React PWA and Capacitor Android app backed by Express, Firebase Authentication, Cloud Firestore, FCM, and a Vision LLM timetable parser.

## Development

```bash
cd frontend && npm install && npm run dev
cd backend && npm install && npm run dev
```

Copy each `.env.example` to `.env`. The frontend expects the backend at `VITE_API_URL`; the backend requires Firebase Admin credentials and a Groq API key for image parsing.

The backend exposes:

- `POST /api/timetable/parse` — authenticated multipart image upload
- `GET /api/timetable/:cohortId` — read a shared cohort timetable
- `PUT /api/timetable/:cohortId` — save a reviewed timetable
- `POST /api/cron/dispatch` — secured notification dispatch trigger

For Android, run `npm run build` in `frontend`, then `npx cap add android` and `npx cap sync android`.
