import { Check } from "phosphor-react"

export const NewHabitForm = () => {
    return (
        <form className="w-full flex flex-col mt-6 ">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu compromentimento?
            </label>

            <input
                type='text'
                id='title'
                placeholder="ex.: Exercises"
                className="p-4 rounded-lg mt-3 bg-zinc-900 text-white placeholder:text-zinc-400"
                autoFocus />

            <label className="font-semibold leading-tight mt-4">
                Qual a decorrencia?
            </label>

            <button type='submit' className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500">
                <Check size={20} weight="bold" />
                Confirmar
            </button>

        </form>
    )
}
