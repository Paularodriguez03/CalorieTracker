import { activity } from '../types';
import { categories } from '../data/categories';
import { Dispatch, useMemo } from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { activityActions } from '../reducers/activityReducer';


type ActivityListProps = {
    activities: activity[],
    dispatch: Dispatch<activityActions>
}

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {

    const categoryName = useMemo(() => (category: activity['category']) => categories.map((cat) => cat.id === category ? cat.name : ''), [activities])

    const selectActivity = (id: activity['id']) => dispatch({ type: 'set-activeId', payload: { id } });
    const deleteActivity = (id: activity['id']) => dispatch({ type: 'delete-activity', payload: { id } });

    const isEmtyActivities = useMemo(() => activities.length === 0, [activities]);

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
            {isEmtyActivities ?
                <p className="text-center mt-10">No hay actividades registradas</p>
                :
                activities.map((activity) => (
                    <div key={activity.id} className='px-5 py-10 bg-white mt-5 flex justify-between shadow-lg'>
                        <div className='space-y-2 relative'>
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-green-500' : 'bg-orange-500'}`}>{categoryName(+activity.category)}</p>
                            <p className='text-2xl font-bold pt-5'>{activity.name}</p>
                            <p className='font-black text-4xl text-purple-600'>{activity.calories}{' '}
                                <span className='text-base'>kcal</span>
                            </p>
                        </div>
                        <div className='flex gap-5 items-center'>

                            <button onClick={() => selectActivity(activity.id)}>
                                <PencilSquareIcon className="h-8 w-8 text-slate-600" />
                            </button>
                            <button onClick={() => deleteActivity(activity.id)}>
                                <XCircleIcon className="h-8 w-8 text-red-500" />
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
