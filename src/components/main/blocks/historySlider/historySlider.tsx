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
              <h2>{history.year && history.year}</h2>
              <p>{history.description && history.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
