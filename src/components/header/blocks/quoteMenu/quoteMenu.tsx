import React from 'react'

import { Image } from '../../../../functions'

import styles from './quoteMenu.module.scss'

export default ({ block, images }) => (
  <div className={styles.container}>
    <p className={styles.label}>{block.label}</p>
    <Image className={styles.icon} src={block.icon} images={images} />
  </div>
)
