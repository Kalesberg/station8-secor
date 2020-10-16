import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './pipeSlider.module.scss'
import HorizontalHighlight from '../highlighters/horizontalHighlight'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(0);
  const ref = useRef(null);
  const [target, setTarget] = useState(null);
  const container = useRef(null);
  
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
  const moveRight = (e) => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollLeft + ref.current.offsetWidth;
      setSelected(selected + 1);
    }  
  }
  const moveLeft = (e) => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollLeft - ref.current.offsetWidth;
      setSelected(selected - 1);
    }  
  }
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (ref.current) {
        ref.current.scrollLeft = 0;
        setSelected(0);
      }
    })
  },[])

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={ref}>
        {block.pipes && block.pipes.map((pipe, i) => {
          return (
            <div key={i}className={styles.pipeContainer}>
              <div key={i} className={styles.background}>
                <Image className={styles.image} src={pipe.pipe && pipe.pipe} images={images} />
              </div>
              <div className={styles.textContainer}>
                <div></div>
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
      <div className={styles.categoryContainer}>
        <div className={styles.categories} ref={container}>
          {block.pipes && block.pipes.map((pipe, i) => {
            return (
              <div key={i} onClick={handleClick} className={styles.category + ` ${selected === i ? `${styles.categoryShow}` : ""}`}>
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
