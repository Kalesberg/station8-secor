import React from 'react'
import { Link } from 'gatsby'

import { Image } from '../../../../functions'

import styles from './contactButton.module.scss'

export default ({ block, handleCloseMenus }) => {
  return (
    <Link className={styles.link} to='/contact' onMouseOver={handleCloseMenus}>
      <Image className={styles.icon} src={block.icon} />
    </Link>
  )
}
