import { CalorieDisplay } from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";

export const CalorieTracker = () => {

    const { caloriesConsumed, caloriesBurned, netCalories} = useActivity();

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center"> Resumen de Calorias</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-5">
                <CalorieDisplay calories={caloriesConsumed} activity="Consumidas" />
                <CalorieDisplay calories={caloriesBurned} activity="Quemadas" />
                <CalorieDisplay calories={netCalories} activity="Diferencia" />
            </div>

        </>
    )
}
