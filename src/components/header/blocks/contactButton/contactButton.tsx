import React from 'react'
import { Link } from 'gatsby'

import { Image } from '../../../../functions'

import styles from './contactButton.module.scss'

export default ({ block, images, handleCloseMenus }) => {
  return (
    <Link className={styles.link} activeClassName={styles.active} to='/contact' onMouseOver={handleCloseMenus}>
      <Image className={styles.icon} src={block.icon} images={images} />
      <span className={styles.underline} />
    </Link>
  )
}
