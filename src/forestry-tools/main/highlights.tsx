import React, { useState } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

import 'animate.css/animate.min.css'

import { classNames, enabled, Image } from '../exports'
import { Button } from '../shared'

export const Highlights = ({ block, styles, images, toggleForm }) => {
  const [index, setIndex] = useState(0)

  return (
    <section className={classNames(block, styles)}>
      <div className={styles.content}>
        <h1 className={styles.heading}>{block.heading}</h1>
        <div className={styles.highlights}>
          <div className={styles.fillspace} />
          {enabled(block.highlights).map((highlight, i) => {
            const setActiveIndex = () => {
              setIndex(i)
            }
            return index !== i && (
              <div key={i} className={styles.highlight} onClick={setActiveIndex}>
                <Image className={styles.image} images={images} container='div' src={highlight.image.image} title={highlight.image.title} alt={highlight.image.alt}>
                  <p className={styles.index}>{`${i < 10 ? '0' : ''}${i + 1}`}</p>
                </Image>
              </div>
            )
          })}
        </div>
        <div className={styles.detail}>
          {block.highlights.map((highlight, i) => {
            return (
              <div key={i} className={styles.imageContainer + `${index === i ? ` ${styles.active}` : ''}`}>
                <Image className={styles.image} images={images} src={highlight.image.image} title={highlight.image.title} alt={highlight.image.alt} container='div'>
                  {block.showRedBar && (
                    <ScrollAnimation animateIn='animate__fadeInDown' animateOnce scrollableParentSelector='#main' offset={150}>
                      <div className={styles.redBar} />
                    </ScrollAnimation>
                  )}
                </Image>
              </div>
            )
          })}
        </div>
        <div className={styles.text}>
          {<p className={styles.index}>{`${index < 10 ? '0' : ''}${index + 1}`}</p>}
          {block.highlights[index].title && <h2 className={styles.title}>{block.highlights[index].title}</h2>}
          {block.highlights[index].body && <p className={styles.body}>{block.highlights[index].body}</p>}
          <Button text='Get in touch' direction='right' styles={styles} onClick={toggleForm} />
        </div>
      </div>
    </section>
  )
}
