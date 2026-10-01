import { useState } from 'react';
import { useWorkoutsContext } from '../context/WorkoutContext.jsx';

export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, load, reps }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
        return;
      }
      setTitle(''); setLoad(''); setReps('');
      setError(null); setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    } catch {
      setError('Could not reach the server. Is the backend running?');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes('title') ? 'invalid' : ''} />

      <label>Load (in Kg's):</label>
      <input type="number" value={load} onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes('load') ? 'invalid' : ''} />

      <label>Reps:</label>
      <input type="number" value={reps} onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes('reps') ? 'invalid' : ''} />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
