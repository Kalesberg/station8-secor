import React from 'react'
import camelcase from 'camelcase'

import { classNames, enabled, Image } from '../exports'

export const AnimatedImage = ({ block, styles, images }) => {
  return (
    <section className={classNames(block, styles)}>
      {enabled(block.backgrounds).map((background, i) => {
        return (
          <Image key={i} className={styles.image} images={images} src={background.image} title={background.title} alt={background.alt} />
        )
      })}
      <div className={styles.textContainer}>
        <h1 className={styles.heading1}>{block.heading1}</h1>
        <h2 className={styles.heading2}>{block.heading2}</h2>
      </div>
      <div className={styles.animatedElement + ' ' + styles[camelcase(block.animatedElement)]} />
    </section>
  )
}
