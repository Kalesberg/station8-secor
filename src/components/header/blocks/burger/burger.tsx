import React from 'react'

import styles from './burger.module.scss'

export default () => {
  return (
    <button className={styles.button}>
      <img className={styles.image} src='/menu-copy.svg' />
    </button>
  )
}
