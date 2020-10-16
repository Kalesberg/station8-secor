import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'gatsby'
import styles from './training.module.scss'
import { Image, link } from '../../../../functions'
import HorizontalHighlight from '../highlighters/horizontalHighlight'

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
    window.addEventListener('resize', resetHighlight);
    return () => {
      window.removeEventListener('resize', resetHighlight)
    }
  },[])
  return (
    <section className={styles.section}>
      <div className={styles.categoryContainer}>
        <div className={styles.categories} ref={container}>
          {block.categories && block.categories.map((category, i) => {
            return (
              <div onClick={handleClick} key={i} className={styles.category + ` ${selected === category.category ? `${styles.categoryShow}` : ""}`}>
                {category.category}
              </div>
            )
          })}
          <HorizontalHighlight container={container} target={target} />
        </div>
      </div>  
    </section>
  )
}  