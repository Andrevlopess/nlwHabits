import React from 'react'
import { generageDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning.ts'
import HabitDay from './HabitDay'

type Props = {}

const weekDays = [
    "D",
    "S",
    "T",
    "Q",
    "Q",
    "S",
    "S",
]

const summaryDates = generageDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 //18 weeks

const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length


const SummaryTable = (props: Props) => {
    return (
        <div className="w-full flex">
            <div className='grid grid-rows-7 grid-flow-row gap-3'>
                {weekDays.map((day, index) => {
                    return (
                        <div
                            key={`${day}-${index}`}
                            className='text-zinc-400 text-xl h-10 w-10 items-center justify-center font-bold'>
                            {day}
                        </div>

                    )
                })}

            </div>

            <div className='grid grid-rows-7 grid-flow-col gap-3'>
                {summaryDates.map(day => {
                    return (
                        <HabitDay
                            amount={5}
                            completed={Math.round(Math.random() * 5)}
                            key={day.toString()} />
                    )
                })}

                {amountOfDaysToFill > 0 &&
                    Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                        return (
                            <div
                                key={i}
                                className="w-10 h-10 bg-zinc-900 border-zinc-800 border-2 rounded-lg cursor-not-allowed opacity-40" />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default SummaryTable