# Workout Buddy (MERN CRUD + Context)

## Backend
```
cd backend
npm install
cp .env.example .env    # put your MongoDB Atlas URI in MONGO_URI
npm run dev             # http://localhost:4000
```
API: `GET /api/workouts`, `POST /api/workouts`, `DELETE /api/workouts/:id`

## Frontend
```
cd frontend
npm install
npm run dev             # http://localhost:5173 (proxies /api to :4000)
```
Start the backend first, then the frontend.

## Features
- Mongoose model: title, load, reps (required) + timestamps
- Validation errors from the backend (400) shown near the form; empty fields highlighted
- Global state via React Context + useReducer (SET / CREATE / DELETE)
