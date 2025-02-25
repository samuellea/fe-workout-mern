import React from 'react';
import styles from '../styles/WorkoutDetails.module.css';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutDetails = ({ workout }) => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { _id, title, reps, load, createdAt } = workout;

  const handleClick = async () => {
    const response = await fetch(`/api/workouts/${_id}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  // prettier-ignore
  return (
    <div className={styles.workoutDetails}>
      <h4>{title}</h4>
      <p><span>Load (kg): </span>{load}</p>
      <p><span>Reps: </span>{reps}</p>
      <p>{createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
