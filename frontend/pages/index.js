import Head from 'next/head'
import Image from 'next/image'
import Hero from '../assets/image/hero.png'
import Logo from '../assets/logo.svg'
import { Inter } from '@next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Wires</title>
      </Head>
      <main>
        <Image alt='cubes background' src={Hero}  width="375" height="375"></Image>
        <Image alt='wires logo' src={Logo}  width="375" height="375"></Image>
        <button>---</button>
        <input></input>
        <input></input>
        <button>---</button>
      </main>
    </>
  )
}
