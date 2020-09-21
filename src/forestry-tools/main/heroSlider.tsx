import React, { useEffect, useState } from 'react'

import { classNames, enabled, Image } from '../exports'

export const HeroSlider = ({ block, styles, images }) => {
  const [slides, setSlides] = useState([])
  const [active, setActive] = useState(undefined)
  const [clicked, setClicked] = useState(false)
  const [timer, setTimer] = useState(undefined)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setSlides(enabled(block.slides))
    setActive(0)
  }, [])

  const cycle = () => {
    if (slides.length > 1) {
      active < slides.length - 1 ? setActive(active + 1) : setActive(0)
    }
  }

  useEffect(() => {
    if (block.options.autoCyclePages) {
      clearTimeout(timer)
      setPaused(false)
      if (clicked) {
        setClicked(false)
        setTimer(setTimeout(cycle, (block.options.clickCycleDelay * 1000) || 20000))
      } else {
        setTimer(setTimeout(cycle, (block.options.autoCycleDelay * 1000) || 5000))
      }
    }
  }, [block, active])

  const togglePause = () => {
    if (!paused) {
      setPaused(true)
      clearTimeout(timer)
    } else {
      setPaused(false)
      setTimer(setTimeout(cycle, (block.options && block.options.autoCycleDelay * 1000) || 5000))
    }
  }

  const Contents = ({ page }) => {
    return (
      <div className={styles.container}>
        <div className={styles.heading}>
          {page.heading && page.heading.split('\n').map((line, i) => {
            return (
              <h1 key={i}>{line}</h1>
            )
          })}
        </div>
        <div className={styles.body}>
          {page.body && page.body.split('\n').map((line, i) => (
            <h2 key={i}>{line}</h2>
          ))}
        </div>
        {slides.length > 1 && (
          <div className={styles.controls}>
            {block.options.showPauseButton && (
              <div className={styles.pause + `${paused ? ' ' + styles.paused : ''}`} onClick={togglePause}>
                <span className={styles.line} />
                <span className={styles.line} />
              </div>
            )}
            {slides.map((page, i) => {
              const setActiveSlide = () => {
                setActive(i)
                setClicked(true)
              }
              return (
                <div style={{ gridColumn: ((5 - slides.length)) + i }} className={styles.button + `${i === active ? ' ' + styles.active : ''}`} key={i} onClick={setActiveSlide}>
                  <h1 className={styles.index}>{`0${i + 1}`}</h1>
                  {page.heading && page.heading.split('\n').map((line, i) => {
                    return (
                      <h1 key={i}>{line}</h1>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // const chevronDown = assets.find(asset => asset.name === 'Chevron Down').asset.publicURL

  return (
    <section className={classNames(slides, styles)}>
      {slides.map((page, i) => {
        return (
          <div key={i} className={styles.pageContainer + `${i === active ? ' ' + styles.active : ''}`}>
            <Image className={styles.page} src={page.image} container='div' images={images} />
            <Contents page={page} />
          </div>
        )
      })}
      {block.options.showScrollButton && (
        <div className={styles.scrollContainer}>
          <div className={styles.scrollButton}>
            {/* {chevronDown && (
              <img className={styles.icon} src={chevronDown} alt='scroll down' />
            )} */}
          </div>
        </div>
      )}
    </section>
  )
}
