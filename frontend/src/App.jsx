import { useEffect, useState } from 'react';
import { useWorkoutsContext } from './context/WorkoutContext.jsx';
import WorkoutDetails from './components/WorkoutDetails.jsx';
import WorkoutForm from './components/WorkoutForm.jsx';
import { API } from '../api.js'; 

export default function App() {
  const { workouts, dispatch } = useWorkoutsContext();
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(`${API}/api/workouts`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to load workouts');
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      } catch (err) {
        setLoadError(err.message);
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <>
      <header><h1>Workout Budyyy</h1></header>
      <main className="pages">
        <div className="workouts">
          {loadError && <div className="error">{loadError}</div>}
          {workouts.map((w) => <WorkoutDetails key={w._id} workout={w} />)}
          {!loadError && workouts.length === 0 && <p>No workouts yet.</p>}
        </div>
        <WorkoutForm />
      </main>
    </>
  );
}
