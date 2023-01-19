import * as Popover from '@radix-ui/react-popover'
import { Progressbar } from './ProgressBar'
import clsx from 'clsx'

type Props = {
  completed: number,
  amount: number
}


const HabitDay = (props: Props) => {


  const completedPerentage = Math.round((props.completed / props.amount) * 100)

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
            Segunda-feira
          </span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>17/01</span>

          <Progressbar progress={completedPerentage} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>

    </Popover.Root>

  )
}

export default HabitDay