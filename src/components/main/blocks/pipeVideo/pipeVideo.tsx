import React, { useContext } from 'react'
import parse from 'html-react-parser'

import { Context } from '../../../context/context'

import styles from './pipeVideo.module.scss'

export default ({ block }) => {
  const context = useContext(Context)
  const media = context.images && context.images.length && context.images.find(image => image.relativePath === 'images/' + block.video.split('/').pop())
  return (
    <section className={styles.section}>
      <h3>{block.heading && parse(block.heading)}</h3>
      <div className={styles.container}>
        {block.video && (
          <div className={styles.videoContainer}>
            <video className={styles.video} playsInline autoPlay muted loop src={media.publicURL} />
          </div>
        )}
        <div>{block.paragraph && parse(block.paragraph)}</div>
      </div>
    </section>
  )
}
