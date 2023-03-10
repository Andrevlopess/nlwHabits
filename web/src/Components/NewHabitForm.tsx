import { Check } from "phosphor-react"
import * as CheckBox from '@radix-ui/react-checkbox'
import { FormEvent, useState } from 'react'
import { api } from "../lib/axios"
const avaliableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

export const NewHabitForm = () => {

    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event: FormEvent) {
        event.preventDefault()

        if (!title || weekDays.length === 0) {
            return
        }

        await api.post('habits', {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])

        alert('Hábito criado com sucesso!')
    }

    function handleToggleWeekDay(weekDay: number) {
        if (weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
            setWeekDays(weekDaysWithRemovedOne)
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]
            setWeekDays(weekDaysWithAddedOne)
        }
    }

    return (
        <form className="w-full flex flex-col mt-6" onSubmit={(e) => createNewHabit(e)}>
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu compromentimento?
            </label>

            <input
                type='text'
                id='title'
                placeholder="ex.: Exercises"
                className="p-4 rounded-lg mt-3 bg-zinc-900 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus: ring-offset-zinc-900"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label className="font-semibold leading-tight mt-4">
                Qual a decorrencia?
            </label>
            <div className="flex flex-col gap-2 mt-3">
                {avaliableWeekDays.map((weekday, index) => {
                    return (

                        <CheckBox.Root
                            className='flex items-center gap-3 group focus:ring-2 focus:outline-none'
                            onCheckedChange={() => handleToggleWeekDay(index)}
                            checked={weekDays.includes(index)}
                            key={weekday}>

                            <div className='h-8 w-8 flex bg-zinc-900 items-center border-2 justify-center border-zinc-800 rounded-lg group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus: ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:outline-none group-focus: ring-offset-background'>
                                <CheckBox.Indicator>
                                    <Check size={20} className='text-white' />
                                </CheckBox.Indicator>
                            </div>


                            <span className='leading-tight text-white font-semibold'>
                                {weekday}
                            </span>
                        </CheckBox.Root>

                    )
                })}
            </div>

            <button type='submit'
                className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus: ring-offset-zinc-900">
                <Check size={20} weight="bold" />
                Confirmar
            </button>

        </form>
    )
}
