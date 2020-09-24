import React from 'react'

import { Image } from '../../../../functions'

import styles from './logo.module.scss'

export default ({ block, images }) => {
  return (
    <section className={styles.default}>
      <Image images={images} style={{ backgroundSize: 'contain !important' }} className={styles.image} src={block.image} title={block.title} alt={block.alt} container='div' />
    </section>
  )
}
