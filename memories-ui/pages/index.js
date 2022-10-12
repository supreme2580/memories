import Head from 'next/head'
import Navbar from "../components/Navbar"
import Result from "../components/Result"
import AddButton from "../components/AddButton"
import Modal from "../components/Modal"
import { useEffect, useState } from 'react'
import { useSigner } from 'wagmi'

export default function Home() {

  const [address, setAddress] = useState(null)
  const { data: signer } = useSigner()

  async function getLoggedIn() {
    const userAddress = (await signer?.getAddress())?.toString()
    setAddress(userAddress)
  }

  useEffect(() => {
    async() => getLoggedIn()
  }, [address])

  getLoggedIn()

  return (
    <div>
      <Head>
        <title>Memories</title>
        <meta
          name="description"
          content="An application to store all your favorite memories"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='relative'>
        <Navbar />
        {
          address ? (
            <>
              <Result owner={address} />
              <AddButton />
              <Modal />
            </>
          ) : <div className='flex flex-col items-center justify-center w-screen h-screen'>
            <h1 className='text-xl font-semibold'>Connect wallet to continue</h1>
          </div>
        }
      </main>
    </div>
  );
};