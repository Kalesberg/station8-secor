import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './interactiveMarkets.module.scss'
import HorizontalHighlight from '../highlighters/horizontalHighlight'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(block.markets && block.markets.length > 0 ? block.markets[0].market : "")
  const [target, setTarget] = useState(null);
  const container = useRef(null);
  const pageLinkOne = block.buttonLink ? link(block.buttonLink) : null;
  
  const handleClick = (e) => {
    setSelected(e.target.innerText);
    setTarget(e.target);
  }
  function resetHighlight() {
    setSelected(block.markets && block.markets.length > 0 ? block.markets[0].market : "");
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
      <div className={styles.backgroundContainer}>
        {block.markets && block.markets.map((market,i) => {
          return (
            <div key={i} className={styles.background + ` ${selected === market.market ? `${styles.backgroundShow}` : "" }`}>
              <Image className={styles.image} src={market.image && market.image} images={images} />
            </div>
          ) 
        })}
      </div>
      <div className={styles.selectorContainer} >
        <div className={styles.selectors} ref={container}>
          {block.markets && block.markets.map((market, i) => {
            return (
              <div onClick={handleClick} className={styles.market + ` ${selected === market.market ? `${styles.marketShow}` : ""}`} key={i}>{market.market}</div>
            )
          })}
          <HorizontalHighlight container={container} target={target} />
        </div>
      </div>
      <div className={styles.descriptionsContainer}>
        <div className={styles.descriptions}>
          {block.markets && block.markets.map((market, i) => {
            return (
              <p key={i} className={styles.description + ` ${selected === market.market ? `${styles.descriptionShow}` : ""}`}>
                {market.description && market.description}</p>
            )
          })}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {block.buttonText && pageLinkOne &&
          <Link to={pageLinkOne}>
            <button className={styles.button}>{block.buttonText}
              <span>
                {block.icon && <Image className={styles.icon} src={block.icon} images={images} />}
              </span>
            </button>
          </Link>}
      </div>
    </section>
  )
}
