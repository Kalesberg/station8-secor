import React, { useEffect, useState, createRef } from 'react'
import { Link } from 'gatsby'
import styles from './pipeVideo.module.scss'
import { Image, link } from '../../../../functions'
import Recaptcha from 'react-google-recaptcha'

export default ({ block, images }) => {
  const media = images.find(image => image.relativePath === 'images/' + block.video.split('/').pop());
  return (
    <section className={styles.section}>
      <h3>{block.heading && block.heading}</h3>
      <div className={styles.container}>
        {block.video &&
          <div className={styles.videoContainer}><video className={styles.video} playsInline autoPlay muted loop src={media.publicURL} /></div>}
        <p>{block.paragraph && block.paragraph}</p>
      </div>
    </section>
  )
}  