import React, { useContext, useState } from 'react'

import { Context } from '../../../../context/context'

import styles from './login.module.scss'

export default () => {
  const context = useContext(Context)

  const [loginData, setLoginData] = useState({
    user: '',
    pass: ''
  })

  const handleLogin = async e => {
    e.preventDefault()
    const res = await window.fetch('/.netlify/functions/login', {
      method: 'POST',
      body: JSON.stringify({
        email: loginData.user,
        password: loginData.pass
      })
    })
    if (res.status === 401) {
      console.log('login failed')
    } else if (res.ok) {
      const data = await res.json()
      console.log(data)
      context.handleValidateUser()
    }
  }

  const handleLoginEdit = e => {
    const newLoginData = { ...loginData }
    newLoginData[e.target.id] = e.target.value
    setLoginData(newLoginData)
  }

  return (
    <form className={styles.login}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.column}>
          <div className={styles.field}>
            <label htmlFor='user'>Email<span className={styles.required}>*</span></label>
            <input type='email' id='user' style={{ backgroundImage: `url(${null})` }} onChange={handleLoginEdit} required />
          </div>
          <div className={styles.field}>
            <label htmlFor='pass'>Password<span className={styles.required}>*</span></label>
            <input type='password' id='pass' style={{ backgroundImage: `url(${null})` }} onChange={handleLoginEdit} required />
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleLogin}>Login</button>
      </div>
    </form>
  )
}
