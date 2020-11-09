import React, { useEffect, useState, useRef } from 'react'
import { Image } from '../../../../functions'
import styles from './pipeSlider.module.scss'
import HorizontalHighlight from '../highlighters/horizontalHighlight'

export default ({ block }) => {
  const [selected, setSelected] = useState(block.pipes && block.pipes.length > 0 ? block.pipes[0].heading : '')
  const ref = useRef(null)
  const [target, setTarget] = useState(null)
  const container = useRef(null)

  const handleClick = (e) => {
    setSelected(e.target.innerText)
    setTarget(e.target)
    block.pipes.map((p, i) => {
      if (p.heading === e.target.innerText && ref.current) { ref.current.scrollLeft = i * ref.current.offsetWidth }
    })
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (ref.current) {
        ref.current.scrollLeft = 0
        setSelected(block.pipes && block.pipes.length > 0 ? block.pipes[0].heading : '')
        setTarget(container.current && container.current.firstElementChild)
      }
    })
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={ref}>
        {block.pipes && block.pipes.map((pipe, i) => {
          return (
            <div key={i} className={styles.imageContainer}>
              <div key={i} className={styles.background}>
                <Image className={styles.image} src={pipe.pipe && pipe.pipe} />
              </div>
              <div className={styles.textContainer + ` ${selected === pipe.heading ? `${styles.textContainerShow}` : ''}`}>
                <div />
                <div className={styles.text}>
                  <h2 className={styles.heading}>{pipe.heading && pipe.heading}</h2>
                  <p className={styles.subHeading}>{pipe.subHeading && pipe.subHeading}</p>
                  <p className={styles.description}>{pipe.description && pipe.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.selectorContainer}>
        <div className={styles.selectors} ref={container}>
          {block.pipes && block.pipes.map((pipe, i) => {
            return (
              <div key={i} onClick={handleClick} className={styles.selector + ` ${selected === pipe.heading ? `${styles.selectorShow}` : ''}`}>
                {pipe.heading}
              </div>
            )
          })}
          <HorizontalHighlight container={container} target={target} />
        </div>
      </div>
    </section>
  )
}
