import React from 'react'
import { Link } from 'gatsby'
import styles from './simpleImageText.module.scss'
import { Image } from '../../../../functions'

export default ({ block, images }) => {
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{block.heading && block.heading}</h2>
        {block.image &&
        <div className={styles.backgroundContainer}>
          <div className={styles.background}>
            <Image className={styles.image} src={block.image && block.image} images={images} />
          </div>
        </div>}
        <p className={styles.description}>{block.description && block.description}</p>
        <div className={styles.buttonContainer}>
        {block.buttonText && block.buttonLink &&
          <Link to={block.buttonLink}>
            <button className={styles.button}>{block.buttonText}
            </button>
          </Link>}
      </div>
      </div>
    </section>
  )
}  