import React, { useContext } from 'react'
import { Link } from 'gatsby'
import ReactPlayer from 'react-player'

import { Context } from '../../../context/context'
import { Image, link } from '../../../../functions'

import styles from './hero.module.scss'

export default ({ block }) => {
  const context = useContext(Context)
  const source = block.video || block.image

  const media = context.images && context.images.length && context.images.find(image => image.relativePath === 'images/' + source.split('/').pop())
  const pageLink = block.buttonLink ? link(block.buttonLink) : null

  return (
    <div className={styles.container + `${block.video ? ` ${styles.video}` : ''}`}>
      {block.video ? (
        <ReactPlayer
          wrapper={styles.hero} config={{
            wistia: {
              options: {
                endVideoBehavior: 'loop',
                muted: true,
                fitStrategy: 'cover'
              }
            },
            file: {
              attributes: {
                poster: '/cover.png'
              }
            }
          }}
          playing
          muted
          url='https://station8branding.wistia.com/medias/lng6o2vfr1'
        />
      ) : (
        <div className={styles.hero}><img src={media.publicURL} alt='' /></div>
      )}
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
