import React, { useEffect, useState, createRef } from 'react'
import { Link } from 'gatsby'
import styles from './joinTeam.module.scss'
import { Image, link } from '../../../../functions'

export default ({ block, images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (block.images && block.images.length > 0) {
      console.log(current)
      if (current === block.images.length - 1)
        setTimeout(() => {
          setCurrent(0)
        }, 4000);
      else if (current < block.images.length)
        setTimeout(() => {
          setCurrent(current + 1);
        }, 4000)
    }
  },[current])

  return (
    <section className={styles.section}>
      {block.images && block.images.map((image, i) => {
        return (
          <div key={i} className={styles.backgroundContainer + ` ${current === i ? `${styles.backgroundShow}` : ""}`}>
            <div className={styles.background}>
              <Image className={styles.image} src={image.image} images={images} />
            </div>
          </div>
        )
      })}
      <div className={styles.container}>
        <h2 className={styles.heading}>{block.heading && block.heading}</h2>
        <p className={styles.subHeading}>{block.subHeading && block.subHeading}</p>
        <div className={styles.buttonContainer}>
        {block.buttonText && block.buttonLink &&
          <Link to={block.buttonLink}>
            <button className={styles.button}>{block.buttonText}
              <span>
                {block.icon && <Image className={styles.icon} src={block.icon} images={images} />}
              </span>
            </button>
          </Link>}
      </div>
      </div>
    </section>
  )
}  