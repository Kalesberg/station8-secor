import React from 'react'

import styles from './callButton.module.scss'

export default ({ block }) => {
  return (
    <a className={styles.default} href={`tel:+${block.phone}`}>
      <span className={styles.phoneNumber}>
        {block.phone.slice(0, 3) + '-' + block.phone.slice(3, 6) + '-' + block.phone.slice(6)}
      </span>
    </a>
  )
}
