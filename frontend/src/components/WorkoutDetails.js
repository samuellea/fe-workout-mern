import React from 'react';
import styles from '../styles/WorkoutDetails.module.css';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { formatDistanceToNow } from 'date-fns';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { _id, title, reps, load, createdAt } = workout;

  const handleClick = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${_id}`, {
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
      <p><strong>Load (kg): </strong>{load}</p>
      <p><strong>Number of reps: </strong>{reps}</p>
      <p>{formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
