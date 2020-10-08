import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import ReactPlayer from "react-player"
import styles from './hero.module.scss'
import { Image, link } from '../../../../functions'

export default ({ block, images }) => {
  let source;
  if (block && block.video)
    source = block.video;
  else if (block && block.image) 
    source = block.image;

  const media = images.find(image => image.relativePath === 'images/' + source.split('/').pop());
  const pageLink = block.buttonLink ? link(block.buttonLink) : null;
 
  return (
    <div className={styles.container}>
      {block.video && (
        <div className={styles.hero}><video className={styles.video} playsInline autoPlay muted loop src={media.publicURL} /></div> )}
      {block.image && (
        <div className={styles.hero}><img src={media.publicURL} alt='' /></div>)}
      <div className={styles.textContainer}>
        {block.text && block.text.length > 1 && block.text.map((txt, i) => {
          return (
            <div key={i} className={styles[`heroText${i}`]}>{txt.text}</div>
          )
        })}
        {block.text && block.text.length === 1 && block.text.map((txt, i) => {
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
            </button>
          </Link>}
      </div>
    </div>
  )
}  
