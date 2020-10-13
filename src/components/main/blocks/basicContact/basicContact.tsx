import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'gatsby'
import styles from './basicContact.module.scss'
import { Image, link } from '../../../../functions'

export default ({ block, images }) => {
  

  return (
    <section className={styles.section}>
      <h2>{block.heading && block.heading}</h2>
      <p>{block.paragraph && block.paragraph}</p>
      <div className={styles.form}>
        <form>
          <div className={styles.iconContainer}>
            {block.icon && <Image className={styles.icon} src={block.icon} images={images} />}
          </div>
          <input className={styles.input} placeholder={block.placeholderText && block.placeholderText} />
          <button className={styles.button}>{block.buttonText && block.buttonText}</button>
        </form>
      </div>
    </section>
  )
}  
