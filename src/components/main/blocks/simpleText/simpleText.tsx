import React from 'react'
import { Link } from 'gatsby'
import styles from './simpleText.module.scss'
import { Image } from '../../../../functions'

export default ({ block }) => {
  return (
    <section className={styles.section}>
      {block.image &&
        <div className={styles.backgroundContainer}>
          <div className={styles.background}>
            <Image className={styles.image} src={block.image} />
          </div>
        </div>}
      <div className={styles.container}>
        <h2>{block.heading && block.heading}</h2>
        <p>{block.subHeading && block.subHeading}</p>
        <div className={styles.buttonContainer}>
          {block.buttonText && block.buttonLink &&
            <Link to={block.buttonLink}>
              <button className={styles.button}>{block.buttonText}
                <span>
                  {block.icon && (
                    <Image className={styles.icon} src={block.icon} />
                  )}
                </span>
              </button>
            </Link>}
        </div>
      </div>
    </section>
  )
}
