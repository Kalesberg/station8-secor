import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

import 'animate.css/animate.min.css'

import { classNames, enabled, Image } from '../exports'

import { OilPriceTicker } from './'

export const Hero = ({ block, styles, images }) => {
  const scrollDown = () => {
    document.getElementById('main').scroll({
      left: 0,
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section id='hero' className={classNames(block, styles)}>
      <div className={styles.backgrounds}>
        {enabled(block.backgrounds).map((background, i) => (
          <Image key={i} className={styles.imageContainer + `${background.class ? ` ${styles[background.class]}` : ''}`} images={images} src={block.backgrounds[i].image} title={background.title} container='div' alt={background.alt} />
        ))}
      </div>
      <OilPriceTicker styles={styles} />
      <div className={styles.textContainer}>
        {block.smallHeading && (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150} delay={1000}>
            <h1 className={styles.smallHeading}>{block.smallHeading}</h1>
          </ScrollAnimation>
        )}
        {block.largeHeading && (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150} delay={1500}>
            <h2 className={styles.largeHeading}>{block.largeHeading}</h2>
          </ScrollAnimation>
        )}
        {block.mediumHeading && (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150} delay={2000}>
            <h3 className={styles.mediumHeading}>{block.mediumHeading}</h3>
          </ScrollAnimation>
        )}
        {block.body && (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150} delay={2500}>
            <p className={styles.body}>{block.body}</p>
          </ScrollAnimation>
        )}
      </div>
      <div onClick={scrollDown} className={styles.pageDownIconContainer}>
        <Image className={styles.icon} images={images} src={block.pageDownIcon.image} title={block.pageDownIcon.title} alt={block.pageDownIcon.alt} />
        <p className={styles.label}>Scroll</p>
      </div>
      {block.showRedBar && (
        <ScrollAnimation className={styles.redBarContainer} animateIn='animate__fadeInDown' animateOnce scrollableParentSelector='#main' offset={150}>
          <div className={styles.redBar} />
        </ScrollAnimation>
      )}
    </section>
  )
}
