import React, { useEffect, useState, useRef } from 'react'
import { Image } from '../../../../functions'
import CountUp from 'react-countup'

import styles from './stats.module.scss'

export default ({ block, images, scrollPosition }) => {
  const [scrolled, setScrolled] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    if (!scrolled && ref.current) {
      if (ref.current.getBoundingClientRect().top < (scrollPosition)) {
        setScrolled(true)
      }
    }
  }, [scrollPosition])

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={ref}>
        {block.stats && scrolled && block.stats.map((stat, i) => {
          return (
            <div key={i} className={styles.statContainer}>
              {stat.icon && <Image className={styles.icon} src={stat.icon} images={images} />}
              <p className={styles.number}><CountUp useEasing={false} duration={4} end={stat.number} />
                {stat.characters && stat.characters}
              </p>
              <p className={styles.description}>{stat.description && stat.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
