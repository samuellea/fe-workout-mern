import React, { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const Home = () => {
  // const [workouts, setWorkouts] = useState([]); // local state now redundant - we use context instead
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      // we omit the "http://localhost:4000" part of our backend API URL, because we have it stored in "proxy" field of our package.json (for bypassing CORS blocking during dev)
      const response = await fetch('/api/workouts');
      const json = await response.json();
      if (response.ok) {
        // setWorkouts(json);
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]); // if any logic inside your useEffect uses external functions ('dependencies'), you have to declare them

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
