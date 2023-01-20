import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { generateProgressPercentage } from "../utils/generate-progress-percentage"
import clsx from "clsx";
import dayjs from "dayjs";

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2 / 5)

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface Props extends TouchableOpacityProps { 
    amountOfHabits?: number;
    amoutCompleted?: number;
    date: Date;
}

export const HabitDay = ({ amountOfHabits = 0, amoutCompleted = 0, date, ...rest }:Props) => {

    const amoutAccomplidshedPercentage = 
    amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amoutCompleted) : 0

    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today)

    console.log(isCurrentDay);
    

    return (
        <TouchableOpacity
            {...rest}
            className={clsx("rounded-xl border-2 m-1",{
                ["bg-zinc-900 border-zinc-800"] : amoutAccomplidshedPercentage === 0,
                ["bg-violet-900 border-violet-700"] : 
                amoutAccomplidshedPercentage > 0 && amoutAccomplidshedPercentage < 20,
                ["bg-violet-800 border-violet-600"] : 
                amoutAccomplidshedPercentage > 20 && amoutAccomplidshedPercentage < 40,
                ["bg-violet-700 border-violet-500"] : 
                amoutAccomplidshedPercentage > 40 && amoutAccomplidshedPercentage < 60,
                ["bg-violet-600 border-violet-500"] : 
                amoutAccomplidshedPercentage > 60 && amoutAccomplidshedPercentage < 80,
                ["bg-violet-500 border-violet-400"] : 
                amoutAccomplidshedPercentage > 80,
                ["border-white border-4"] : isCurrentDay
               

            })}
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={.7} />
    )
}

