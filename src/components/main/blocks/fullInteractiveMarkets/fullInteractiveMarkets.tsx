import React, { useEffect, useState, useRef } from 'react'
import { Image } from '../../../../functions'
import styles from './fullInteractiveMarkets.module.scss'

export default ({ block }) => {
  const [selected, setSelected] = useState(block.market[0].title)
  const [titles] = useState(block.market && block.market.map(market => market.title))
  const [start] = useState(window.innerWidth > 600 ? '-21vw' : '-140vw')
  const ref = useRef(null)
  const [move, setMove] = useState(window.innerWidth > 600 ? 1 : 2)

  useEffect(() => {
    console.log(selected)
  }, [selected])

  const moveRight = () => {
    if (ref.current) {
      ref.current.style.transition = 'all .5s'
      ref.current.style.transform = `translateX(-${(move + 1) * ref.current.children[0].offsetWidth}px)`
      if ((window.innerWidth > 600 && move === titles.length) || (window.innerWidth <= 600 && move === titles.length + 1)) {
        setTimeout(() => {
          ref.current.style.transition = 'none'
          ref.current.style.transform = `translateX(${start})`
        }, 500)
        setMove(window.innerWidth > 600 ? 1 : 2)
        setSelected(titles[0])
      } else {
        setMove(move + 1)
        setSelected(titles[titles.indexOf(selected) + 1])
      }
    }
  }
  const moveLeft = () => {
    if (ref.current) {
      ref.current.style.transition = 'all .5s'
      ref.current.style.transform = `translateX(-${(move - 1) * ref.current.children[0].offsetWidth}px)`
      if ((window.innerWidth > 600 && move - 1 === 0) || (window.innerWidth <= 600 && move - 2 === 0)) {
        setTimeout(() => {
          ref.current.style.transition = 'none'
          ref.current.style.transform = `translateX(-${(window.innerWidth > 600 ? titles.length : titles.length + 1) * ref.current.children[0].offsetWidth}px)`
        }, 500)
        setMove(window.innerWidth > 600 ? titles.length : titles.length + 1)
        setSelected(titles[titles.length - 1])
      } else {
        setMove(move - 1)
        setSelected(titles[titles.indexOf(selected) - 1])
      }
    }
  }
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (ref.current) {
        if (window.innerWidth > 600) {
          ref.current.style.transform = 'translateX(-21vw)'
          setSelected(block.market[0].title)
          setMove(1)
        } else {
          ref.current.style.transform = 'translateX(-140vw)'
          setSelected(block.market[0].title)
          setMove(2)
        }
      }
    })
  }, [])

  const handleTitleClick = e => {
    const clickedIndex = titles.indexOf(e.target.title)
    const currentIndex = titles.indexOf(selected)
    if (clickedIndex === currentIndex) {
      moveRight()
    } else if (clickedIndex === 0) {
      currentIndex === 1 ? moveLeft() : moveRight()
    } else if (currentIndex === 0) {
      clickedIndex === 1 ? moveRight() : moveLeft()
    } else {
      clickedIndex > currentIndex ? moveRight() : moveLeft()
    }
  }

  return (
    <section className={styles.section} id="markets">
      <div className={styles.backgroundContainer}>
        {block.market && block.market.map((market, i) => {
          return (
            <div key={i} className={styles.background + ` ${selected === market.title ? `${styles.backgroundShow}` : ''}`}>
              <Image className={styles.image} src={market.image && market.image} />
            </div>
          )
        })}
      </div>
      <div className={styles.descriptionsContainer}>
        <div className={styles.descriptions}>
          {block.market && block.market.map((market, i) => {
            return (
              <p key={i} className={styles.description + ` ${selected === market.title ? `${styles.descriptionShow}` : ''}`}>
                {market.description && market.description}
              </p>
            )
          })}
        </div>
      </div>

      <div className={styles.selectorContainer}>
        <div className={styles.buttonLeftContainer}>
          <button onClick={moveLeft} className={styles.button}>{block.buttonText}
            <span>
              {block.left && <Image className={styles.left} src={block.left} />}
            </span>
          </button>
        </div>
        <div className={styles.slideContainer}>
          <div className={styles.selectors} ref={ref}>
            {titles.filter((title, i) => i <= titles.length - 1 && i >= titles.length - 2).map((title, i) => {
              return (
                <div key={i} className={styles.selector + ` ${selected === title ? `${styles.selected}` : ''}`} title={title} onClick={handleTitleClick}>{title}</div>
              )
            })}
            {titles.map((title, i) => {
              return (
                <div key={i} className={styles.selector + ` ${selected === title ? `${styles.selected}` : ''}`} title={title} onClick={handleTitleClick}>{title}</div>
              )
            })}
            {titles.filter((title, i) => i >= 0 && i < 2).map((title, i) => {
              return (
                <div key={i} className={styles.selector + ` ${selected === title ? `${styles.selected}` : ''}`} title={title} onClick={handleTitleClick}>{title}</div>
              )
            })}
          </div>
        </div>

        <div className={styles.buttonRightContainer}>
          <button onClick={moveRight} className={styles.button}>{block.buttonText}
            <span>
              {block.right && <Image className={styles.right} src={block.right} />}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
