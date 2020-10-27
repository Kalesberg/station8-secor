import React from 'react'

import { Image } from '../../../../functions'

import styles from './search.module.scss'

export default ({ block, images }) => (
  <div className={styles.default}>
    {block.icon && <Image className={styles.icon} src={block.icon.image} alt={block.icon.alt} title={block.icon.title} images={images} />}
  </div>
)
