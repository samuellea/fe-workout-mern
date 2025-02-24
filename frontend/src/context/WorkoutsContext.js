import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

/*
Reasons for using a context -
1) Makes application's state values globally available across all components - no unwieldy and file-bloating prop drilling
2) Keeps application's state in sync with database - when database updated in some way, those db values also reflected in local state
*/

// a reducer handles all possible dispatch actions
export const workoutsReducer = (state, action) => {
  // state = previous state before making change, the 2nd arg obj passed to useReducer
  /* inside reducer, we check the action type (create, update, delete etc.) */
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { workouts: action.payload }; // here is where the state is actually updated
    case 'CREATE_WORKOUT':
      return { workouts: [...state.workouts, action.payload] };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  /*
  the dispatch function looks like this: 
    dispatch({type: 'SET_WORKOUTS', payload: [{}, {}]});  

  the object being passed into the dispatch function is known as an 'action', containing a type and a payload (any data required for performing that action)
  calling dispatch invokes workoutsReducer (the custom reducer function passed in as 1st arg. to useReducer) - this reducer then updates the globally-available context state.
  */
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  return (
    // pass an obj containing the state and dispatch into the Provider's 'value' - makes both these things available in any component
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
