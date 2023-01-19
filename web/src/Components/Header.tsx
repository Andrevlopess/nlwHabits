import {Plus} from 'phosphor-react'

import logoImage from '../Assets/logoImage.svg'


type Props = {}

const Header = (props: Props) => {
    return (
        <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
            <img src={logoImage} alt="Habits" />
            <button
                type="button"
                className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300'>
                <Plus size={20} className="text-violet-500" />
                Novo Habito
            </button>
        </div>
    )
}

export default Header