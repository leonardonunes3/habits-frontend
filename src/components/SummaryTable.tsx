import { datesFromYear } from "../utils/dates-from-year"
import { HabitDay } from "./HabitDay"

const weekDays = [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S'
]

const summaryDates = datesFromYear()

const minimumSummaryDatesSize = 126
const amountofDaysToFill = minimumSummaryDatesSize - summaryDates.length

export function SummaryTable() {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                { weekDays.map((weekday, i) => {
                    return(
                            <div 
                                key={i} 
                                className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
                            >
                                {weekday}
                            </div>
                 )
                })}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                { summaryDates.map(date => {
                    return(
                        <HabitDay completed={2} amount={10} key={date.toString()} />
                    )
                })}

                {amountofDaysToFill > 0 && Array.from({ length: amountofDaysToFill }).map((_, i) => {
                    return(
                        <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/>
                    )
                })}
            </div>
        </div>
    )
}