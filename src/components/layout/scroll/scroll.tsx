import React from 'react'

import styles from './scroll.module.scss'

export default () => {
  const scrollDown = () => {
    document.getElementById('main').scrollBy({
      left: 0,
      top: document.getElementById('main').offsetHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className={styles.scrollContainer} onClick={scrollDown}>
      <div className={styles.scroll} />
    </div>
  )
}
