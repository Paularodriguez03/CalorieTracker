import type { activity } from '../types/index';

//* Tipos de acciones
export type activityActions =
    { type: 'save-activity', payload: { newActivity: activity } } |
    { type: 'set-activeId', payload: { id: activity['id'] } } |
    { type: 'delete-activity', payload: { id: activity['id'] } } |
    { type: 'restart-activities' }

//* typo del estado del reducer
export type activityState = {
    activities: activity[],
    activeId: activity['id']
}

const localStorageActivities= (): activity[]  => {
    return JSON.parse(localStorage.getItem('activities')!) || []
}
//* estado inicial del reducer
export const initialState: activityState = {
    activities: localStorageActivities(),
    activeId: ''
}

//* ejecución de las acciones
export const activityReducer = (state: activityState = initialState, action: activityActions) => {
    if (action.type === 'save-activity') {
        let updateActivities: activity[] = [];
        if (state.activeId) {
            updateActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity);
        } else {
            updateActivities = [...state.activities, action.payload.newActivity];
        }
        return { ...state, activities: updateActivities, activeId: '' }
    }

    if (action.type === 'set-activeId') {
        return { ...state, activeId: action.payload.id }
    }

    if (action.type === 'delete-activity') {
        return { ...state, activities: state.activities.filter(activity => activity.id !== action.payload.id) }
    }

    if (action.type === 'restart-activities') {
        return { ...state, activities: [], activeId: '' }
    }
    
    return state
}