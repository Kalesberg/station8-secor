import React, { useContext } from 'react'

import { Context } from '../../../context/context'
import Register from './register/register'
import Login from './login/login'

import styles from './account.module.scss'

export default () => {
  const context = useContext(Context)

  return (
    <section className={styles.section}>
      {context && !context.user && <Register />}
      {context && !context.user && <Login />}
      {context && context.user && (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={context.handleLogoutUser}>Logout</button>
        </div>
      )}
    </section>
  )
}
