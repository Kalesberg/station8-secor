import React from 'react'
import styles from './accessories.module.scss'

// shows registered trademark symbol as superscript in paragraph
export default ({text}) => {
  const split = text.split("®");

  return (
    <p className={styles.description}>{split[0]}<sup>®</sup>{split[1]}</p>
  )
}