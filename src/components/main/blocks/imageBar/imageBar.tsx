import React from 'react'

import { classNames, Image } from '../../../../functions'

import styles from './imageBar.module.scss'

export default ({ block, images }) => (
  <section className={classNames(block, styles)}>
    {block.images.map((item, i) => {
      return item.url ? (
        <a className={styles.link} key={i} href={item.url}>
          {item.image ? <Image className={styles.image} src={item.image} alt={item.alt} title={item.title} images={images} /> : <p>{item.alt}</p>}
        </a>
      ) : (
        item.image ? <Image key={i} className={styles.image} src={item.image} alt={item.alt} title={item.title} images={images} /> : <p>{item.alt}</p>
      )
    })}
  </section>
)
