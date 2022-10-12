import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Logo() {
    return(
        <div className="px-5 h-16 border-b-2 border-b-gray-200 flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Memories</h1>
            <ConnectButton />
        </div>
    )
}