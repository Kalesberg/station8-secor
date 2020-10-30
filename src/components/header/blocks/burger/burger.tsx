import React from 'react'

import styles from './burger.module.scss'

export default ({ mobileMenuOpen, setMobileMenuOpen, handleCloseMenus }) => {
  return (
    <button className={styles.button} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} onMouseOver={handleCloseMenus}>
      <img className={styles.image} src='/menu-copy.svg' />
    </button>
  )
}
