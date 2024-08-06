import { useEffect, useMemo, useReducer } from 'react';
import { Form } from './components/Form';
import { ActivityList } from './components/ActivityList';
import { CalorieTracker } from './components/CalorieTracker';
import { initialState, activityReducer } from './reducers/activityReducer';

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities]);

  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities]);


  return (
    <>
      <header className="bg-purple-600 py-3 text-white">
        <div className="max-w-4xl mx-auto flex justify-between items-center ">
          <h1 className="text-center text-lg font-bold uppercase">Calorie Tracker</h1>

          <button
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded disabled:opacity-10"
            onClick={() => dispatch({ type: 'restart-activities' })}
            disabled={!canRestartApp()}> Reiniciar</button>
        </div>
      </header>

      <section className="bg-purple-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state} />
        </div>
      </section>

      <section className='bg-gray-800  py-10'>
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker 
           activities={state.activities}/>
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList
          activities={state.activities}
          dispatch={dispatch} />

      </section>
    </>
  )
}

export default App
