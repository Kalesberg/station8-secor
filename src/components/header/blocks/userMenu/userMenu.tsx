import React from 'react'

import { Image } from '../../../../functions'

import styles from './userMenu.module.scss'

export default ({ block, images }) => (
  <div className={styles.container}>
    <Image className={styles.icon} src={block.icon} images={images} />
  </div>
)
