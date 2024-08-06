import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { categories } from "../data/categories";
import { activity } from "../types";
import { activityActions, activityState } from "../reducers/activityReducer";

type FormProps = {
    dispatch: Dispatch<activityActions>,
    state: activityState
}

const initialState: activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export const Form = ({dispatch, state}: FormProps) => {

    const [activity, setActivity] = useState<activity>(initialState);

    useEffect(() => {
        if (state.activeId) {
             const activeActivity = state.activities.find(stateActivity => stateActivity.id === state.activeId);
             setActivity(activeActivity!);
            
        }
    }, [state.activeId]);
    

    const handelChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const isNumberFiled = ['category', 'calories'].includes(e.target.id);
        setActivity({ ...activity, [e.target.id]: isNumberFiled ? Number(e.target.value) : e.target.value })
    }

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0
    }

    const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'save-activity', payload: { newActivity: activity }})
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form
            className="space-y-5 bg-white p-5 shadow-md rounded-lg"
            onSubmit={handelSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria</label>
                <select
                    name="category"
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handelChange}
                >
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Ej. Comida, jugo de naranja, ensalda, ejecicio, pesas, bicicleta"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.name}
                    onChange={handelChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias</label>
                <input
                    type="number"
                    id="calories"
                    placeholder="Ej. 300 o 500"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.calories}
                    onChange={handelChange}
                />
            </div>

            <input
                type="submit"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                className="w-full bg-gray-800 mt-3 hover:bg-gray-900 text-white font-bold p-2 upercase cursor-pointer rounded-lg disabled:opacity-10"
                disabled={!isValidActivity()}
            />
        </form>
    )
}
