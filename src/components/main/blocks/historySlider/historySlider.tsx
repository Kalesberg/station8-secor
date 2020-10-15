import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './historySlider.module.scss'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(0)

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {block.histories && block.histories.map((history, i) => {
          return (
            <div className={styles.history}>
              <div key={i} className={styles.background}>
                <Image className={styles.image} src={history.image && history.image} images={images} />
              </div>
              <div className={styles.textContainer}>
                <div></div>
                <div className={styles.text}>
                  <h2>{history.yearText && history.Text}</h2>
                  <p className={styles.description}>{history.description && history.description}</p>
                  <p className={styles.verticalYear}>{history.year}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
