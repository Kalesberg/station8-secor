import React from 'react'
import parse from 'html-react-parser'
import { graphql, useStaticQuery } from 'gatsby'

import styles from './pipeVideo.module.scss'

export default ({ block }) => {
  const { allFile: { nodes: images } } = useStaticQuery(graphql`
    {
      allFile(filter: {relativeDirectory: {eq: "images"}}) {
        nodes {
          publicURL
          relativePath
        }
      }
    }
  `)
  const media = images.length && images.find(image => image.relativePath === 'images/' + block.video.split('/').pop())

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
