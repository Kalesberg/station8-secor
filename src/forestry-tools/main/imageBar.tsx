import React from 'react'

import { classNames, enabled, Image } from '../exports'

export const ImageBar = ({ block, styles, images }) => (
  <section className={classNames(block, styles)}>
    {enabled(block.images).map((item, i) => {
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
