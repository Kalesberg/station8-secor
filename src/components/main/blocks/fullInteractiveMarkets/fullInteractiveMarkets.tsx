import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './fullInteractiveMarkets.module.scss'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(1);
  const [titles, setTitles] = useState(block.market && block.market.map(market => market.title))
  const ref = useRef(null);

  const moveRight = (e) => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollLeft + ref.current.offsetWidth / 3
    }
    setTitles([...titles.slice(-1), titles[0]])
  }
  const moveLeft = (e) => {
    if (ref.current) {
      
      let curr = ref.current.children.map(child => child.innerText)
      ref.current.scrollLeft = ref.current.scrollLeft - ref.current.offsetWidth / 3;
      setSelected(selected - 1);
    }  
  }
  
  return (
    <section className={styles.section}>
      <div className={styles.backgroundContainer}>
        {block.market && block.market.map((market,i) => {
          return (
            <div key={i} className={styles.background + ` ${selected === i ? `${styles.backgroundShow}` : "" }`}>
              <Image className={styles.image} src={market.image && market.image} images={images} />
            </div>
          ) 
        })}
      </div>
      <div className={styles.descriptionsContainer}>
        <div className={styles.descriptions}>
          {block.market && block.market.map((market, i) => {
            return (
              <p key={i} className={styles.description + ` ${selected === i ? `${styles.descriptionShow}` : ""}`}>
                {market.description && market.description}</p>
            )
          })}
        </div>
      </div>

      <div className={styles.selectorContainer}>
        <div className={styles.buttonLeftContainer}>
          <button onClick={moveLeft} className={styles.button}>{block.buttonText}
            <span>
              {block.left && <Image className={styles.left} src={block.left} images={images} />}
            </span>
          </button>
        </div> 
        <div className={styles.scrollContainer}>
        <div className={styles.selectors} ref={ref}>
          <div className={styles.selector}></div>
          <div className={styles.selector}></div>
          <div className={styles.selector}>{titles[selected]}</div>
          <div className={styles.selector}></div>
          <div className={styles.selector}></div>
        </div>
        </div>
        
        <div className={styles.buttonRightContainer}>
          <button onClick={moveRight} className={styles.button}>{block.buttonText}
            <span>
              {block.right && <Image className={styles.right} src={block.right} images={images} />}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
