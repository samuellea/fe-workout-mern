import React, { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const Home = () => {
  // const [workouts, setWorkouts] = useState([]); // local state now redundant - we use context instead
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`);
      const json = await response.json();
      if (response.ok) {
        // setWorkouts(json);
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id.toString()} workout={workout} />
          ))}
      </div>
      <div className="workoutForm">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
