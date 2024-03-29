import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './interactiveMarkets.module.scss'
import HorizontalHighlight from '../highlighters/horizontalHighlight'

export default ({ block }) => {
  const [selected, setSelected] = useState(block.markets && block.markets.length > 0 ? block.markets[0].market : '')
  const [target, setTarget] = useState(null)
  const container = useRef(null)

  const handleClick = e => {
    setSelected(e.target.innerText)
    setTarget(e.target)
  }

  const resetHighlight = () => {
    setSelected(block.markets && block.markets.length > 0 ? block.markets[0].market : '')
    setTarget(container.current && container.current.firstElementChild)
  }

  useEffect(() => {
    window.addEventListener('resize', resetHighlight)
    return () => {
      window.removeEventListener('resize', resetHighlight)
    }
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.backgroundContainer}>
        {block.markets && block.markets.map((market, i) => {
          return (
            <div key={i} className={styles.background + ` ${selected === market.market ? `${styles.backgroundShow}` : ''}`}>
              <Image className={styles.image} src={market.image && market.image} />
            </div>
          )
        })}
      </div>
      <div className={styles.selectButtons}>
        <h2 className={styles.selectTitle}>{selected}</h2>
        {block.markets.map((market, i) => {
          return (
            <button key={i} onClick={handleClick} className={styles.selectButton + ` ${selected === market.market ? `${styles.active}` : ''}`}>{market.market}</button>
          )
        })}
      </div>
      <div className={styles.selectorContainer}>
        <div className={styles.selectors} ref={container}>
          {block.markets && block.markets.map((market, i) => {
            return (
              <div onClick={handleClick} className={styles.market + ` ${selected === market.market ? `${styles.marketShow}` : ''}`} key={i}>{market.market}</div>
            )
          })}
          <HorizontalHighlight container={container} target={target} />
        </div>
      </div>
      <div className={styles.descriptionsContainer}>
        <div className={styles.descriptions}>
          {block.markets && block.markets.map((market, i) => {
            return (
              <p key={i} className={styles.description + ` ${selected === market.market ? `${styles.descriptionShow}` : ''}`}>
                {market.description && market.description}
              </p>
            )
          })}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {block.buttonText && block.buttonLink && (
          <Link to={block.buttonLink}>
            <button className={styles.button}>{block.buttonText}
              <span>
                {block.icon && (
                  <Image className={styles.icon} src={block.icon} />
                )}
              </span>
            </button>
          </Link>
        )}
      </div>
    </section>
  )
}
