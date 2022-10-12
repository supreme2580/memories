import Image from "next/image"
import { DownloadIcon } from "@heroicons/react/outline"
import { saveAs } from "file-saver"

export default function Thumbnail({ date, imageUrl }) {
    return(
        <div className="relative hover:cursor-pointer">
            <p className="absolute right-0 bg-gray-700 text-white p-1.5 z-10">{date}</p>
            {
                //we cannot use <Image /> because the cid of each image is different so the hostname for each image is different
            }
            <Image
                layout="responsive"
                src={imageUrl}
                width={1920}
                height={1080}
                alt="Memory image"
            />
            <button className="absolute bottom-0 left-0" onClick={() => saveAs(imageUrl)}>
                <DownloadIcon className="w-10 h-10 text-white" />
            </button>
        </div>
    )
}