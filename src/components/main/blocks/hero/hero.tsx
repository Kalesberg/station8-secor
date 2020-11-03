import React from 'react'
import { Link } from 'gatsby'
import styles from './hero.module.scss'
import { Image, link } from '../../../../functions'

export default ({ block, images }) => {
  let source
  if (block && block.video) {
    source = block.video
  } else if (block && block.image) {
    source = block.image
  }

  const media = images.find(image => image.relativePath === 'images/' + source.split('/').pop())
  const pageLink = block.buttonLink ? link(block.buttonLink) : null

  const scrollDown = () => {
    document.getElementById('main').scroll({
      left: 0,
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className={styles.container}>
      {block.video && (
        <div className={styles.hero}><video className={styles.video} poster='/video-frame.jpg' playsInline autoPlay muted loop src={media.publicURL} /></div>)}
      {block.image && (
        <div className={styles.hero}><img src={media.publicURL} alt='' /></div>)}
      <div className={styles.textContainer}>
        {block.heroText && block.heroText.length > 1 && block.heroText.map((txt, i) => {
          return (
            <div key={i} className={styles[`heroText${i}`]}>{txt.text}</div>
          )
        })}
        {block.heroText && block.heroText.length === 1 && block.heroText.map((txt, i) => {
          return (
            <div key={i} className={styles.heroTextMedium}>{txt.text}</div>
          )
        })}
        {block.buttonText && pageLink &&
          <Link to={pageLink}>
            <button className={styles.button}>{block.buttonText}
              <span>
                {block.buttonIcon && <Image className={styles.icon} src={block.buttonIcon} images={images} />}
              </span>
            </button><br className={styles.buttonBreak}></br>
          </Link>}
        {block.extraButtons && block.extraButtons.length > 0 && block.extraButtons.map((button, i) => {
          return (
            <Link key={i} to={button.buttonLink}>
              <button className={styles.button}>{button.buttonText}
                <span>
                  {block.buttonIcon && <Image className={styles.icon} src={button.buttonIcon} images={images} />}
                </span>
              </button><br className={styles.buttonBreak}></br>
            </Link> 
          )
        })}  
      </div>
      <div className={styles.scrollContainer} onClick={scrollDown}>
        <p className={styles.label}>Scroll</p>
        <div className={styles.scroll} />
      </div>
    </div>
  )
}
