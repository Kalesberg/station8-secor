import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

import 'animate.css/animate.min.css'

import { classNames, enabled, Image } from '../exports'

import { Button } from '../shared'

export const Cities = ({ block, styles, images, toggleForm }) => {
  return (
    <section className={classNames(block, styles)}>
      <div className={styles.textContainer}>
        {block.title && <h1 className={styles.title}>{block.title}</h1>}
        {block.body && <p className={styles.body}>{block.body}</p>}
        <Button text='Get in touch' direction='right' styles={styles} onClick={toggleForm} />
      </div>
      {enabled(block.cities)[0] && (
        <div className={styles.featuredCity}>
          <Image className={styles.image} src={enabled(block.cities)[0].image.image} images={images} title={enabled(block.cities)[0].image.title} alt={enabled(block.cities)[0].image.alt} container='div'>
            <div className={styles.shadow} />
            <p className={styles.name}>{enabled(block.cities)[0].name}</p>
          </Image>
        </div>
      )}
      {enabled(block.cities).length > 1 && (
        <div className={styles.cities}>
          {enabled(block.cities).map((city, i) => {
            return i > 0 && (
              <div key={i} className={styles.city}>
                <Image className={styles.image} src={city.image.image} images={images} title={city.image.title} alt={city.image.alt} container='div'>
                  <div className={styles.shadow} />
                  <p className={styles.name} dangerouslySetInnerHTML={{ __html: city.name.replace(' ', '<br />') }} />
                  <p className={styles.nameMobile}>{city.name}</p>
                  <p className={styles.nativeLanguageName} dangerouslySetInnerHTML={{ __html: city.nativeLanguageName.replace(' ', '<br />') }} />
                  <p className={styles.nativeLanguageNameMobile}>{city.nativeLanguageName}</p>
                </Image>
              </div>
            )
          })}
        </div>
      )}
      {block.showRedBar && (
        <ScrollAnimation className={styles.redBarContainer} animateIn='animate__fadeInDown' animateOnce scrollableParentSelector='#main' offset={150}>
          <div className={styles.redBar} />
        </ScrollAnimation>
      )}
    </section>
  )
}
