
type CalorieDisplayProps = {
    calories: number,
    activity: string
}

export const CalorieDisplay = ({ calories, activity }: CalorieDisplayProps) => {
    return (
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            <span className="text-6xl font-black text-white">{calories}</span>
            {activity}
        </p>
    )
}
