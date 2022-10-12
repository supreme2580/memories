import { PlusIcon } from "@heroicons/react/solid"
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"

export default function AddButton() {
    const [open, setOpen] = useRecoilState(modalState)
    const openModal = () => {
        setOpen(!open)
    }
    return(
        <button className="fixed bottom-0 right-0 mb-5 mr-6 rounded-full shadow-2xl shadow-zinc-400 bg-white
            z-40 w-12 h-12 flex items-center justify-center"
            onClick={openModal}>
            <PlusIcon className="w-10 h-10" />
        </button>
    )
}