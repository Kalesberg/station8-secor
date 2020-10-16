import React, { useState } from 'react'
import { Image } from '../../../../functions'

import styles from './fabAnimation.module.scss'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(block.fittings && block.fittings.length > 0 ? block.fittings[0].fittingHeading : '')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{block.heading && block.heading}</h2>
      <p className={styles.subHeading}>{block.subHeading && block.subHeading}</p>
      <div className={styles.animationContainer}>
        <div className={styles.infoContainer}>
          {block.fittings && block.fittings.map((fitting, i) => {
            return (
              <div key={i} className={styles.info + ` ${selected === fitting.fittingHeading ? `${styles.infoShow}` : ''}`}>
                <h3>{fitting.fittingHeading && fitting.fittingHeading}</h3>
                <p>{fitting.fittingSubHeading && fitting.fittingSubHeading}</p>
                <ul>
                  {fitting.descriptions && fitting.descriptions.map((descrip, i) => <li key={i}>{descrip}</li>)}
                </ul>
              </div>
            )
          })}
        </div>
        <div className={styles.imageContainer}>
          {block.image && <img className={[styles.image, styles[`image${start}${end}`]].join(' ')} src='/pipe.png' />}
        </div>
        <div className={styles.buttons}>
          {block.fittings && block.fittings.map((fitting, i) => {
            const handleClick = () => {
              setSelected(fitting.fittingHeading)
              const temp = end
              setStart(temp)
              setEnd(i)
            }
            return (
              <div key={i} onClick={handleClick} className={styles.iconContainer + ` ${selected === fitting.fittingHeading ? `${styles.iconContainerActive}` : ''}`}>
                {fitting.icon && <Image className={styles.icon} style={{ backgroundSize: 'contain' }} src={fitting.icon} images={images} />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
