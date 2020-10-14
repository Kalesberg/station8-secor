import React, { useEffect, useState, createRef } from 'react'
import { Link } from 'gatsby'
import styles from './simpleText.module.scss'
import { Image, link } from '../../../../functions'
import Recaptcha from 'react-google-recaptcha'

export default ({ block, images }) => {
  
  return (
    <section className={styles.section}>
      {block.image &&
        <div className={styles.backgroundContainer}>
          <div className={styles.background}>
            <Image className={styles.image} src={block.image && block.image} images={images} />
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
                {block.icon && <Image className={styles.icon} src={block.icon} images={images} />}
              </span>
            </button>
          </Link>}
      </div>
      </div>
    </section>
  )
}  