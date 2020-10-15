import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './historySlider.module.scss'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(0)

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {block.histories[selected - 1] &&
        <div className={styles.right}>
          <p>{block.histories[selected - 1].yearText}</p>
          <p>{block.histories[selected - 1].year}</p>
        </div>}
        {block.histories && block.histories.map((history, i) => {
          return (
            <div key={i}className={styles.history}>
              <div key={i} className={styles.background}>
                <Image className={styles.image} src={history.image && history.image} images={images} />
              </div>
              <div className={styles.textContainer}>
                <div></div>
                <div className={styles.text}>
                  <h2>{history.year && history.year}</h2>
                  <p className={styles.description}>{history.description && history.description}</p>
                  <p className={styles.verticalYear}>{history.yearText && history.yearText}</p>
                </div>
              </div>
            </div>
          )
        })}
        {block.histories[selected + 1] &&
        <div className={styles.right}>
          <Image className={styles.icon} src={block.right} images={images} />
          <div className={styles.year}><span className={styles.rotate}>{block.histories[selected + 1].year}</span></div>
          <div className={styles.text}><span className={styles.rotate}>{block.histories[selected + 1].yearText}</span></div>
        </div>}
      </div>
    </section>
  )
}
