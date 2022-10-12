import { modalState } from "../atoms/modalAtom"
import { useRecoilState } from "recoil"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState } from "react"
import { CameraIcon } from "@heroicons/react/outline"
import { Web3Storage } from "web3.storage"
import connectContract from "../utils/connectContract"
import { useRouter } from "next/router"

function Modal() {

    const [open, setOpen] = useRecoilState(modalState)
    const filePickerRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState(null)
    const [file, setFile] = useState(null)
    const [upload, setUpload] = useState(false)
    const router = useRouter()

    const addImageToPost = (e) => {
        const reader = new FileReader()
        const file = e.target.files[0]
        if (file) {
            reader.readAsDataURL(file)
            reader.onload = (readEvent) => {
                if (file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/webp") {
                   setSelectedFile(readEvent.target.result)
                   setFile(file)
                   setFileName(file.name)
                   document.getElementById("update").innerHTML = "Upload photo"
                }
                else {
                    document.getElementById("update").innerHTML = "Unsupported image type"
                }
            }
        }
    }
    
      function makeFile() {
        const blob = new Blob([file], { type: file.type })
        const files = [new File([blob], fileName)]
        return files
      }
    
      async function Store() {
        setLoading(true)
        const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_API_KEY })
        const cid = await client.put(makeFile())
        if (cid) {
            let url = "https://"+cid+".ipfs.w3s.link/"+fileName
            try {
                const memoryContract = connectContract()
                let date = new Date()
                if (memoryContract) {
                    const txn = await memoryContract.createNewMemory(url, date.toLocaleString())
                    let wait = await txn.wait()
                    if (wait) {
                        setLoading(false)
                        setUpload(true)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
      }

      const uploadPhoto = () => {
        Store()
      }

  return (
    <Transition.Root show={open} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-10"
            onClose={() => setOpen(false)}
        >
            <div className="flex items-center justify-center
                min-h-[800px] sm:min-h-screen pt-4 pb-20
                text-center sm:block sm:p-0"
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay
                        className="fixed inset-0 transition-opacity bg-opacity-75"
                    />
                </Transition.Child>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="inline-block w-full px-4 pt-5 pb-4 mx-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:p-6">
                            <div>
                                {
                                    selectedFile ? (
                                        <img
                                            src={selectedFile}
                                            className="object-contain w-full h-64 cursor-pointer"
                                            onClick={() => {
                                                setSelectedFile(null)
                                                setFileName(null)
                                                setFile(null)
                                                setLoading(false)
                                            }}
                                            alt="Upload image"
                                        />
                                    ) : (
                                        <div
                                            onClick={() => filePickerRef.current.click()}
                                            className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full cursor-pointer"
                                        >
                                            <CameraIcon
                                                className="w-6 h-6 text-black"
                                                aria-hidden="true"
                                            />
                                        </div>
  )
                                }
                                <div>
                                    <div>
                                        <input
                                            ref={filePickerRef}
                                            type="file"
                                            hidden
                                            onChange={addImageToPost}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <h1 className="text-lg font-semibold text-center" id="update">Enter image</h1>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        disabled={!selectedFile}
                                        onClick={uploadPhoto}
                                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                                    >
                                        {
                                            loading ? "Uploading..." : upload ? "Photo Uploaded" : "Upload Photo"
                                        }
                                    </button>
                                </div>
                            </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
  )
}

export default Modal