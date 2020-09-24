import React from 'react'

import { classNames, Image } from '../../../../functions'

import styles from './testimonial.module.scss'

export default ({ block, images }) => {
  return (
    <section className={classNames(block, styles)}>
      <section className={styles.left}>
        {block.quote && <p className={styles.quote}>{block.quote}</p>}
        {block.author && <p className={styles.author}>{block.author}</p>}
        {block.buttonLabel && <button className={styles.button}>{block.buttonLabel}</button>}
      </section>
      <section className={styles.right}>
        {block.images.map((image, i) => {
          return (
            <Image key={i} className={styles.image} src={image.image} alt={image.alt} title={image.title} images={images} />
          )
        })}
      </section>
    </section>
  )
}
