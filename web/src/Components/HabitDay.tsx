import * as Popover from '@radix-ui/react-popover'
import * as CheckBox from '@radix-ui/react-checkbox'
import { Progressbar } from './ProgressBar'
import clsx from 'clsx'
import { Check } from 'phosphor-react'
import dayjs from 'dayjs'

type Props = {
  date: Date,
  completed?: number,
  amount?: number
}


const HabitDay = ({completed =0, amount = 0, date}: Props) => {

  const completedPerentage =amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg', {
          'bg-zinc-900 border-zinc-700': completedPerentage === 0,
          'bg-violet-900 border-violet-700': completedPerentage > 0 && completedPerentage < 20,
          'bg-violet-800 border-violet-600': completedPerentage >= 20 && completedPerentage < 40,
          'bg-violet-700 border-violet-500': completedPerentage >= 40 && completedPerentage < 60,
          'bg-violet-600 border-violet-500': completedPerentage >= 80 && completedPerentage < 60,
          'bg-violet-500 border-violet-400': completedPerentage >= 80

        })} />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>
            {dayOfWeek}
          </span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

          <Progressbar progress={completedPerentage} />

          <div className='mt-6 flex flex-col gap-3'>

            <CheckBox.Root className='flex items-center gap-3 group'>

              <div className='h-8 w-8 flex bg-zinc-900 items-center border-2 justify-center border-zinc-800 rounded-lg group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                <CheckBox.Indicator>
                  <Check size={20} className='text-white'/>
                </CheckBox.Indicator>
              </div>


              <span className='font-bold text-xl leading-tight text-white 
              group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                  Estudar typescript
              </span>
            </CheckBox.Root>

          </div>
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>

    </Popover.Root>

  )
}

export default HabitDay