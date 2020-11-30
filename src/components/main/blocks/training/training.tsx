import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'gatsby'
import styles from './training.module.scss'
import { Image } from '../../../../functions'
import HorizontalHighlight from '../highlighters/horizontalHighlight'
import parse from 'html-react-parser'

export default ({ block }) => {
  const [selected, setSelected] = useState(block.categories && block.categories.length > 0 ? block.categories[0].category : '')
  const [target, setTarget] = useState(null)
  const container = useRef(null)

  const handleClick = (e) => {
    setSelected(e.target.innerText)
    setTarget(e.target)
  }
  function resetHighlight () {
    setSelected(block.categories && block.categories.length > 0 ? block.categories[0].category : '')
    setTarget(container.current && container.current.firstElementChild)
  }
  useEffect(() => {
    if (container.current) { setTarget(container.current.children[0]) }
    window.addEventListener('resize', resetHighlight)
    return () => {
      window.removeEventListener('resize', resetHighlight)
    }
  }, [container])
  return (
    <section className={styles.section}>
      <div className={styles.categoryContainer}>
        <div className={styles.categories} ref={container}>
          {block.categories && block.categories.map((category, i) => {
            return (
              <div onClick={handleClick} key={i} className={styles.category + ` ${selected.toLowerCase() === category.category.toLowerCase() ? `${styles.categoryShow}` : ''}`}>
                {category.category}
              </div>
            )
          })}
          <HorizontalHighlight container={container} target={target} />
        </div>
      </div>
      {block.categories && block.categories.map((training, i) => {
        return (
          <div key={i} className={styles.training + ` ${selected.toLowerCase() === training.category.toLowerCase() ? `${styles.trainingShow}` : ''}`}>
            {training.image && <Image className={styles.image} src={training.image} />}
            <div className={styles.textContainer}>
              <div>{training.description && parse(training.description)}</div>
              {training.buttonText && training.buttonLink &&
                <Link to={training.buttonLink}>
                  <button className={styles.button}>{training.buttonText}
                    <span>
                      {training.icon && <Image className={styles.icon} src={training.icon} />}
                    </span>
                  </button>
                </Link>}
            </div>
          </div>
        )
      })}
    </section>
  )
}
