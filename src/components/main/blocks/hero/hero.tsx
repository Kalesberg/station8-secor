import React from 'react'
import { Link } from 'gatsby'
import ReactPlayer from 'react-player'

import { Image, link } from '../../../../functions'

import styles from './hero.module.scss'

export default ({ block }) => {
  const pageLink = block.buttonLink ? link(block.buttonLink) : null
  console.log(pageLink)
  return (
    <div className={styles.container + `${block.video ? ` ${styles.video}` : ''}`}>
      {block.video ? (
        <div className={styles.hero}>
          <video className={styles.hero} poster="cover.png" playsInline autoPlay muted loop src={"/homeversion7new.mp4"} />
        </div>
      ) : (
        <div className={styles.hero}>
          <Image className={styles.image} src={block.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        {block.heroText && block.heroText.length > 1 && block.heroText.map((txt, i) => <div key={i} className={styles[`heroText${i}`]}>{txt.text}</div>)}
        {block.heroText && block.heroText.length === 1 && block.heroText.map((txt, i) => {
          return (
            <div key={i} className={styles.heroTextMedium}>{txt.text}</div>
          )
        })}
        {block.buttonText && pageLink &&
          <Link to={block.anchor ? (pageLink + block.anchor) : pageLink}>
            <button className={styles.button}>{block.buttonText}
              <span>
                {block.buttonIcon && (
                  <Image className={styles.icon} src={block.buttonIcon} />
                )}
              </span>
            </button><br className={styles.buttonBreak} />
          </Link>}
        {block.extraButtons && block.extraButtons.length > 0 && block.extraButtons.map((button, i) => {
          return (
            <Link key={i} to={button.buttonLink}>
              <button className={styles.button}>{button.buttonText}
                <span>
                  {block.buttonIcon && (
                    <Image className={styles.icon} src={button.buttonIcon} />
                  )}
                </span>
              </button><br className={styles.buttonBreak} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
