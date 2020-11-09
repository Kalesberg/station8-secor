import React from 'react'

import { Image } from '../../../../functions'

import styles from './socialMediaLinks.module.scss'

export default ({ block }) => (
  <div className={styles.links}>
    {block.links.map((link, i) => (
      <a key={i} className={styles.link} href={link.url} target='_blank' rel='noopener noreferrer'>
        <Image className={styles.icon} src={link.icon} container='div' />
      </a>
    ))}
  </div>
)
