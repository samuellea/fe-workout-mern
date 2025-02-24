import React from 'react';
import styles from '../styles/WorkoutDetails.module.css';

const WorkoutDetails = ({ workout }) => {
  const { title, reps, load, createdAt } = workout;
  return (
    <div className={styles.workoutDetails}>
      <h4>{title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
