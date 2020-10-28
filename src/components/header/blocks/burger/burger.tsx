import React from 'react'

import styles from './burger.module.scss'

export default ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <button className={styles.button} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
      <img className={styles.image} src='/menu-copy.svg' />
    </button>
  )
}
