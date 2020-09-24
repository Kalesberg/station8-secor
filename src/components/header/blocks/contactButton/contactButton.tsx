import React from 'react'
import { Link } from 'gatsby'

import { Image } from '../../../../functions'

import styles from './contactButton.module.scss'

export default ({ block, images }) => {
  console.log(block)
  return (
    <Link className={styles.link} to='/contact'>
      <Image className={styles.icon} src={block.icon} images={images} />
    </Link>
  )
}
