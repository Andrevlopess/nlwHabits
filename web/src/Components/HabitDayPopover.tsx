import * as CheckBox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { Check } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface HabitsListProps {
    date: Date
    onCompletedChanged: (completed:number) => void
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string,
        title: string,
        created_at: string,
    }>,
    completedHabits: string[]
}
export function HabitDayPopover({ date, onCompletedChanged }: HabitsListProps) {

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    useEffect(() => {

        api.get('day', {
            params: {
                date: date.toISOString()
            }
        }).then(res => setHabitsInfo(res.data))

    }, [])

    const isPastDate =  dayjs(date).endOf('day').isBefore(new Date())

  async function handleToggleHabit(habitId : string){
        const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId)

        await api.patch(`/habits/${habitId}/toggle`)

        let completedHabits: string[] = []

        if(isHabitCompleted){
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        }else{
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        })

        onCompletedChanged(completedHabits.length)
    }

    return (
        <div className='mt-6 flex flex-col gap-3'>

            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <CheckBox.Root 
                    onCheckedChange={() => handleToggleHabit(habit.id)}
                    className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed' 
                    key={habit.id}
                    checked={habitsInfo.completedHabits.includes(habit.id)}
                    disabled={isPastDate}
                    >

                        <div className='h-8 w-8 flex bg-zinc-900 items-center border-2 justify-center border-zinc-800 rounded-lg group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus: ring-offset-background'>
                            <CheckBox.Indicator>
                                <Check size={20} className='text-white' />
                            </CheckBox.Indicator>
                        </div>


                        <span className='font-bold text-xl leading-tight text-white 
      group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                            {habit.title}
                        </span>
                    </CheckBox.Root>)

            })
            }


        </div>)
}