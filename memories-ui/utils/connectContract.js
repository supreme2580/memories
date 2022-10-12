import abiJson from "./Memories.json"
import { ethers } from "ethers"

function connectContract() {
    const contractAddress = "0x8CF07F2EaB368456AC1f0b4EBcCFD844D38C1b11"
    const contractAbi = abiJson.abi
    let memoryContract
    try {
        const { ethereum } = window
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            memoryContract = new ethers.Contract(contractAddress, contractAbi, signer)
        }
        else {
            console.log("Ethereum object does not exist")
        }
    } catch (error) {
        console.log("Error: ", error)
    }
    return memoryContract
}

export default connectContract