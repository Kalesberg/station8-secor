import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'

import { Context } from '../../../../context/context'

import styles from './loggedOut.module.scss'

export default () => {
  const context = useContext(Context)
  const [error, setError] = useState('')
  const [loginData, setLoginData] = useState({
    user: '',
    pass: ''
  })

  const errorMsg = () => {
    if (error) {
      return error
    } else if (!loginData.user) {
      return 'Email required'
    } else if (!loginData.user.match(/\S+@\S+\.\S+/)) {
      return 'Email invalid'
    } else if (!loginData.pass) {
      return 'Password required'
    }
  }

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
      setError('Login failed')
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
    setError('')
  }

  return (
    <form className={styles.login}>
      <div className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.column}>
          <div className={styles.field}>
            <label htmlFor='user'>Email<span className={styles.required}>*</span></label>
            <input type='email' id='user' style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwzKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InVzZXItY2hlY2siPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTE1LDE4TDE1LDE2QzE1LDEzLjc5MSAxMy4yMDksMTIgMTEsMTJMNCwxMkMxLjc5MSwxMiAwLDEzLjc5MSAwLDE2TDAsMTgiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iNy41IiBjeT0iNCIgcj0iNCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZTEiIHNlcmlmOmlkPSJTaGFwZSIgZD0iTTE2LDhMMTgsMTBMMjIsNiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} onChange={handleLoginEdit} required />
          </div>
          <div className={styles.field}>
            <label htmlFor='pass'>Password<span className={styles.required}>*</span></label>
            <input type='password' id='pass' style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMywyKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9ImxvY2siPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJSZWN0YW5nbGUtcGF0aCIgZD0iTTE4LDExQzE4LDkuODk2IDE3LjEwNCw5IDE2LDlMMiw5QzAuODk2LDkgMCw5Ljg5NiAwLDExTDAsMThDMCwxOS4xMDQgMC44OTYsMjAgMiwyMEwxNiwyMEMxNy4xMDQsMjAgMTgsMTkuMTA0IDE4LDE4TDE4LDExWiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTQsOUw0LDVDNCwyLjIzOSA2LjIzOSwwIDksMEMxMS43NjEsMCAxNCwyLjIzOSAxNCw1TDE0LDkiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==")' }} onChange={handleLoginEdit} required />
          </div>
        </div>
      </div>
      <div className={styles.errorContainer}>
        <p className={styles.error}>{errorMsg() || <br />}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button + `${errorMsg() ? ` ${styles.error}` : ''}`} onClick={handleLogin}>Login</button>
      </div>
      <div className={styles.links}>
        <Link className={styles.link} to='/account/recover'>Forgot password</Link>
        <span className={styles.link}> | </span>
        <Link className={styles.link} to='/account/register'>Create new account</Link>
      </div>
    </form>
  )
}
