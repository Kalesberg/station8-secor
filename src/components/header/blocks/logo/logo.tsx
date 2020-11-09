import React from 'react'
import { Link } from 'gatsby'

import { Image } from '../../../../functions'

import styles from './logo.module.scss'

export default ({ block }) => (
  <Link to='/' className={styles.link}>
    <Image className={styles.image} src={block.image} alt={block.alt} title={block.title} container='div' />
  </Link>
)
