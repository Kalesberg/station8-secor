import React, { useEffect, useState } from 'react'

import styles from './account.module.scss'

export default () => {
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    state: '',
    zip: ''
  })
  const [emailRegistered, setEmailRegistered] = useState(false)
  const [passwordFail, setPasswordFail] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState('')

  const handleRegistration = async e => {
    if (registrationData.firstName && registrationData.lastName && registrationData.company && registrationData.email && registrationData.phone && registrationData.password && registrationData.confirmPassword && registrationData.city && registrationData.state) {
      if (registrationData.password !== registrationData.confirmPassword) {
        setRegistrationStatus('Passwords do not match')
      } else if (registrationData.password === registrationData.confirmPassword) {
        e.preventDefault()
        const res = await window.fetch('/.netlify/functions/register', {
          method: 'POST',
          body: JSON.stringify({
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            company: registrationData.company,
            email: registrationData.email,
            phone: registrationData.phone,
            password: registrationData.password,
            addressLineOne: registrationData.addressLineOne,
            addressLineTwo: registrationData.addressLineTwo,
            city: registrationData.city,
            state: registrationData.state,
            zip: registrationData.zip
          })
        })
        if (res.status === 201) {
          setEmailRegistered(true)
        }
        const data = await res.json()
        console.log(data)
      }
    }
  }

  const handleLogin = async e => {
    e.preventDefault()
    const res = await window.fetch('/.netlify/functions/login', {
      method: 'POST',
      body: JSON.stringify({
        email: registrationData.email,
        password: registrationData.password
      })
    })
    if (res.status === 401) {
      console.log('login failed')
    }
    const data = await res.json()
    console.log(data)
  }

  const handleLogout = async e => {
    e.preventDefault()
    const res = await window.fetch('/.netlify/functions/logout', {
      method: 'GET'
    })
    const data = await res.json()
    console.log(data)
  }

  const handleRegistrationEdit = e => {
    const newRegistrationData = { ...registrationData }
    newRegistrationData[e.target.id] = e.target.value
    setRegistrationData(newRegistrationData)
  }

  useEffect(() => {
    console.log(registrationData)
  }, [registrationData])

  return (
    <section className={styles.section}>
      <form className={styles.register}>
        <h1 className={styles.title}>New account</h1>
        <div className={styles.registrationForm} onSubmit={handleRegistration}>
          <div className={styles.column}>
            <div className={styles.field}>
              <label htmlFor='firstName'>First Name<span className={styles.required}>*</span></label>
              <input id='firstName' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
            </div>
            <div className={styles.field}>
              <label htmlFor='lastName'>Last Name<span className={styles.required}>*</span></label>
              <input id='lastName' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
            </div>
            <div className={styles.field}>
              <label htmlFor='email'>Email<span className={styles.required}>*</span></label>
              <input type='email' id='email' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
            </div>
            <div className={styles.field}>
              <label htmlFor='password'>Password<span className={styles.required}>*</span></label>
              <input type='password' id='password' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
            </div>
            <div className={styles.field}>
              <label htmlFor='confirmPassword'>Confirm password<span className={styles.required}>*</span></label>
              <input type='password' id='confirmPassword' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.field}>
              <label htmlFor='company'>Company name<span className={styles.required}>*</span></label>
              <input id='company' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
            </div>
            <div className={styles.field}>
              <label htmlFor='phone'>Phone number<span className={styles.required}>*</span></label>
              <input id='phone' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
            </div>
            <div className={styles.field}>
              <label htmlFor='addressLineOne'>Business address (line 1)</label>
              <input id='addressLineOne' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} />
            </div>
            <div className={styles.field}>
              <label htmlFor='addressLineTwo'>Business address (line 2)</label>
              <input id='addressLineTwo' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} />
            </div>
            <div className={styles.field}>
              <label htmlFor='city'>City<span className={styles.required}>*</span></label>
              <input id='city' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
            </div>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor='state'>State<span className={styles.required}>*</span></label>
                <input id='state' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
              </div>
              <div className={styles.field}>
                <label htmlFor='zip'>ZIP</label>
                <input id='zip' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleRegistration}>{!emailRegistered ? 'Create account' : 'Email already registered!'}</button>
        </div>
      </form>
      <form className={styles.register}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.registrationForm} onSubmit={handleLogin}>
          <div className={styles.column}>
            <div className={styles.field}>
              <label htmlFor='email'>Email<span className={styles.required}>*</span></label>
              <input type='email' id='email' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
            </div>
            <div className={styles.field}>
              <label htmlFor='password'>Password<span className={styles.required}>*</span></label>
              <input type='password' id='password' style={{ backgroundImage: `url(${null})` }} onChange={handleRegistrationEdit} required />
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleLogin}>Login</button>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleLogout}>Logout</button>
        </div>
      </form>
    </section>
  )
}
