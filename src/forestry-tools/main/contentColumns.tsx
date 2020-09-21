import React from 'react'
import ReactPlayer from 'react-player'

import { classNames, enabled, Image } from '../exports'
import { Button } from '../shared'

export const ContentColumns = ({ block, styles, images }) => {
  return (
    <section className={classNames(block, styles)}>
      {block.title && <h2 className={styles.title}>{block.title}</h2>}
      <div className={styles.columns}>
        {enabled(block.columns).map((column, i) => (
          <div className={styles.column} key={i}>
            <div key={i} className={styles.content}>
              {enabled(column.content).map((block, i) => (
                <React.Fragment key={i}>
                  {block.template === 'rich-text' && block.content && (
                    <div className={styles.richText} dangerouslySetInnerHTML={{ __html: block.content }} />
                  )}
                  {block.template === 'image' && block.image && (
                    <Image className={styles.image} src={block.image} alt={block.alt} title={block.title} images={images} />
                  )}
                  {block.template === 'video' && block.videoUrl && (
                    <>
                      <div className={styles.videoContainer}>
                        <ReactPlayer className={styles.video} light url={block.videoUrl} width='100%' height='100%' />
                      </div>
                      <p className={styles.videoLabel}>{block.label}</p>
                    </>
                  )}
                  {block.template === 'button' && (
                    <Button styles={styles} style={block.style} text={block.buttonText} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
