import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './historySlider.module.scss'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(0);
  const ref = useRef(null);

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
      {block.histories[selected - 1] &&
        <div className={styles.left} onClick={moveLeft}>
          <div className={styles.clickContainer}>
            <Image className={styles.icon} src={block.left} images={images} />
            <div className={styles.year}><span className={styles.rotate}>{block.histories[selected - 1].year}</span></div>
          </div>
          <div className={styles.text}><span className={styles.rotate}>{block.histories[selected - 1].yearText}</span></div>
        </div>}
      <div className={styles.container} ref={ref}>
        {block.histories && block.histories.map((history, i) => {
          return (
            <div key={i}className={styles.history}>
              <div key={i} className={styles.background}>
                <Image className={styles.image} src={history.image && history.image} images={images} />
                {/* <div className={styles.overlay}></div> */}
              </div>
              <div className={styles.textContainer}>
                <div></div>
                <div className={styles.text}>
                  <div className={styles.top}>
                    <h2>{history.year && history.year}</h2>
                    <p className={styles.description}>{history.description && history.description}</p>
                  </div>
                  <div className={styles.textYear}><span className={styles.rotate}>{history.yearText}</span></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {block.histories[selected + 1] &&
        <div className={styles.right} onClick={moveRight}>
          <div className={styles.clickContainer}>
            <Image className={styles.icon} src={block.right} images={images} />
            <div className={styles.year}><span className={styles.rotate}>{block.histories[selected + 1].year}</span></div>
          </div>
          <div className={styles.text}><span className={styles.rotate}>{block.histories[selected + 1].yearText}</span></div>
        </div>}
    </section>
  )
}
