import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'gatsby'
import styles from './training.module.scss'
import { Image, link } from '../../../../functions'
import HorizontalHighlight from '../highlighters/horizontalHighlight'
import parse from 'html-react-parser'
import articlesGrid from '../articlesGrid/articlesGrid'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(block.categories && block.categories.length > 0 ? block.categories[0].category : "")
  const [target, setTarget] = useState(null);
  const container = useRef(null);
  const pageLinkOne = block.buttonLink ? link(block.buttonLink) : null;
  
  const handleClick = (e) => {
    setSelected(e.target.innerText);
    setTarget(e.target);
  }
  function resetHighlight() {
    setSelected(block.categories && block.categories.length > 0 ? block.categories[0].category : "");
    setTarget(container.current && container.current.firstElementChild);
  }
  useEffect(() => {
    if (container.current)
      setTarget(container.current.children[0]);
    window.addEventListener('resize', resetHighlight);
    return () => {
      window.removeEventListener('resize', resetHighlight)
    }
  },[container])
  return (
    <section className={styles.section}>
      <div className={styles.categoryContainer}>
        <div className={styles.categories} ref={container}>
          {block.categories && block.categories.map((category, i) => {
            return (
              <div onClick={handleClick} key={i} className={styles.category + ` ${selected.toLowerCase() === category.category.toLowerCase() ? `${styles.categoryShow}` : ""}`}>
                {category.category}
              </div>
            )
          })}
          <HorizontalHighlight container={container} target={target} />
        </div>
      </div>
      {block.categories && block.categories.map((training, i) => {
        return (
          <div className={styles.training + ` ${selected.toLowerCase() === training.category.toLowerCase() ? `${styles.trainingShow}` : ""}` }>
            {training.image && <Image className={styles.image} src={training.image} images={images} />}
            <div className={styles.textContainer}>
              <p>{training.description && parse(training.description)}</p>
              {training.buttonText && training.buttonLink &&
              <Link to={training.buttonLink}>
                <button className={styles.button}>{training.buttonText}
                  <span>
                    {training.icon && <Image className={styles.icon} src={training.icon} images={images} />}
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