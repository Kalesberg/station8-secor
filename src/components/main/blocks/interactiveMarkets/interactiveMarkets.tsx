import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './interactiveMarkets.module.scss'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(block.markets && block.markets.length > 0 ? block.markets[0].market : "")
  const [width, setWidth] = useState(null);
  const highlighter = useRef(null);
  const container = useRef(null);
  const [highlightLeft, setHighlightLeft] = useState(null)
  const [highlightRight, setHighlightRight] = useState(null)
  const pageLinkOne = block.buttonLink ? link(block.buttonLink) : null;
  
  const handleClick = (e) => {
    setSelected(e.target.innerText);
    const targetWidth = e.target.offsetWidth;
    const highlightBoundary = highlighter.current.getBoundingClientRect();
    const selectedBoundary = e.target.getBoundingClientRect();
    const containerBoundary = container.current.getBoundingClientRect();
    
    if (highlightBoundary.left < selectedBoundary.left) {
      setHighlightLeft(`${(highlightBoundary.left - containerBoundary.left) / window.innerWidth * 100}vw`);
      setHighlightRight('auto');
      setWidth(`${(selectedBoundary.right - highlightBoundary.left) / window.innerWidth * 100}vw`);
      setTimeout(() => {
        setHighlightLeft(`${(selectedBoundary.left - containerBoundary.left) / window.innerWidth * 100}vw`);
        setWidth(`${targetWidth / window.innerWidth * 100}vw`)
      }, 400)  
    } else if (highlightBoundary.left > selectedBoundary.left) {
      setHighlightLeft('auto');
      setHighlightRight(`${(containerBoundary.right - highlightBoundary.right) / window.innerWidth * 100}vw`);
      setWidth(`${(highlightBoundary.right - selectedBoundary.left) / window.innerWidth * 100}vw`);
      setTimeout(() => {
        setHighlightRight(`${(containerBoundary.right - selectedBoundary.right) / window.innerWidth * 100}vw`);
        setWidth(`${targetWidth / window.innerWidth * 100}vw`);
      }, 400)
    }  
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSelected(block.markets && block.markets.length > 0 ? block.markets[0].market : "");
      if (highlighter.current) {
        highlighter.current.style.left = '0';
        highlighter.current.style.width = `${container.current.firstElementChild.offsetWidth / window.innerWidth * 100}vw`;
      }
    })
  },[selected])

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
          <div className={styles.highlighter} ref={highlighter} 
            style={{width: width, left: highlightLeft ? highlightLeft : "", right: highlightRight ? highlightRight : ""}}></div>
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
