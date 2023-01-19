import { Plus } from 'phosphor-react'
import './Styles/global.css';
import logoImage from './Assets/logoImage.svg'
import Header from './Components/Header';
import SummaryTable from './Components/SummaryTable';

export function App() {

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header />
        <SummaryTable/>
      </div>

    </div>
  )
}

