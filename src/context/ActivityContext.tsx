import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { initialState, activityReducer, activityState, activityActions  } from "../reducers/activityReducer";
import { activity } from "../types";
import { categories } from "../data/categories";

type BudgetContextProps = {
    state: activityState
    dispatch: Dispatch<activityActions>
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
    categoryName: (category: activity["category"]) => string[]
    isEmtyActivities: boolean
}

type ActivityProviderProps = {
    children: ReactNode
}

export const ActivityContext = createContext<BudgetContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
    const [state, dispatch] = useReducer(activityReducer, initialState);
    const { activities } = state;

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities]);
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities]);
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities]);

    const categoryName = useMemo(() => (category: activity['category']) => categories.map((cat) => cat.id === category ? cat.name : ''), [state.activities])
    const isEmtyActivities = useMemo(() => activities.length === 0, [state.activities]);

    return (
        <ActivityContext.Provider value={{ state, dispatch, caloriesConsumed, caloriesBurned, netCalories, categoryName, isEmtyActivities}}>
            {children}
        </ActivityContext.Provider>
    )
}
