import { useState } from 'react';
import styles from '../styles/WorkoutForm.module.css';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext(); // can also destructure 'workouts'

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    console.log('BING!');
    e.preventDefault();
    const workout = { title, load, reps };
    console.log(workout);
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log(json);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      console.log('new workout added', json);
      setTitle('');
      setLoad('');
      setReps('');
      // now update the context, so our global state is in sync with the db
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
      // const updatedWorkouts = [...workouts.filter(e => e.id !== id), json]
    }
  };

  return (
    <form className={styles.create} onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Exercise title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? styles.error : ''}
      />
      <label>Load:</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? styles.error : ''}
      />
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? styles.error : ''}
      />

      <button>Add Workout</button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default WorkoutForm;
