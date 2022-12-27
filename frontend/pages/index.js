import Head from 'next/head'
import Image from 'next/image'
import Hero from '../assets/image/hero.png'
import Logo from '../assets/logo.svg'
import { useState } from 'react'
import styles from '../styles/signin.module.css'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()
  const [email, setEmail] = useState({
    value: '',
    type: 'email',
    placeholder: 'example@example.com'
  })

  const handleEmail = e => {
    const value = e.target.value
    setEmail({
      ...email,
      value
    })
  }

  const [password, setPassword] = useState({
    value: '',
    type: 'password',
    placeholder: '****'
  })

  const handlePassword = e => {
    const value = e.target.value
    setPassword({
      ...password,
      value
    })
  }

  const onSignIn = async () => {
    const { status } = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    if (status === 201) {
      return router.push('/post')
    }
  }

  return (
    <>
      <Head>
        <title>Wires</title>
      </Head>
      <div className={styles.signin}>
        <figure className={styles.hero}>
          <Image alt='cubes background' src={Hero} width='382' height='283' className={styles.hero__background} />
          <Image alt='wires logo' src={Logo} width='382' height='283' className={styles.hero__logo} />
        </figure>
        <h1 className={styles.welcome}>Welcome To Wires</h1>
        <main>
          <button>Sing Up</button>
          <div>
            <label>Email</label>
            <input {...email} onChange={handleEmail} />
          </div>
          <div>
            <label>Password</label>
            <input {...password} onChange={handlePassword} />
          </div>
          <button onClick={onSignIn} data-type='primary'>Sing In</button>

          <div>
            <input type='checkbox' /><sub>Remember me</sub>
          </div>
        </main>
        <footer>
          Holines
        </footer>
      </div>
    </>
  )
}
