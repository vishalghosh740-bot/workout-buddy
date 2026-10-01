import { formatDistanceToNow } from 'date-fns';
import { useWorkoutsContext } from '../context/WorkoutContext.jsx';

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();

  const handleDelete = async () => {
    const res = await fetch('/api/workouts/' + workout._id, { method: 'DELETE' });
    const json = await res.json();
    if (res.ok) dispatch({ type: 'DELETE_WORKOUT', payload: json });
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (in Kgs): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p className="time">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <button className="delete" onClick={handleDelete} aria-label="Delete workout" title="Delete">🗑️</button>
    </div>
  );
}
