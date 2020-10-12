import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { Context } from '../../../../context/context'

import styles from './loggedIn.module.scss'

export default () => {
  const context = useContext(Context)

  return context && (
    <div className={styles.menu}>
      <Link to='/account/info' className={styles.link}>Account info</Link>
      <Link to='/account/forms' className={styles.link}>Forms</Link>
      <Link to='/account/quotes' className={styles.link}>My quotes</Link>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={context.handleLogoutUser}>Logout</button>
      </div>
    </div>
  )
}
