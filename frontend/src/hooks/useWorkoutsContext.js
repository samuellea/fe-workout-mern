import { WorkoutsContext } from '../context/WorkoutsContext';
import { useContext } from 'react';

// use this hook to consume our Workouts Context inside our components
export const useWorkoutsContext = () => {
  // useContext returns to use the value of this WorkoutsContext (same as value passed into the context provider, WorkoutsContext.Provider) = an obj containing state (obj) + dispatch (fn)
  const context = useContext(WorkoutsContext);

  // Context Providers can wrap ANY tree of components, doesn't have to be the entire App tree - could be just Home, etc.
  // if a custom use context hook like this is invoked somewhere in the app outside the tree being wrapped by its corresponding Provider, the 'const context' value will be null - won't have access to state + dispatch.
  // if this happens, throw an Error - ensures a warning is displayed if this is attempted, helps with robustness and debugging.
  if (!context) {
    throw Error(
      'useWorkoutsContext must be used inside a WorkoutsContext.Provider'
    );
  }
  return context;
  // whenever we want to use our workouts data, we invoke useWorkoutsContext
};
