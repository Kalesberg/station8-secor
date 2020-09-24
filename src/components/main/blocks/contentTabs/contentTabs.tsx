import React from 'react'
import ReactPlayer from 'react-player'
import camelcase from 'camelcase'

import { classNames, Image } from '../../../../functions'

import styles from './contentTabs.module.scss'

export default ({ block, images }) => {
  return (
    <section className={classNames(block, styles)}>
      {block.title && <h1 className={styles.title}>{block.title}</h1>}
      <div className={styles.tabContainer}>
        {block.tabs.map((tab, i) => (
          <div className={styles.tab} key={i}>
            {tab.label && <h2 className={styles.label}>{tab.label}</h2>}
            <div key={i} className={styles.content}>
              {tab.content.map((block, i) => (
                <React.Fragment key={i}>
                  {block.template === 'rich-text' && (
                    block.content && <div className={styles.richText} dangerouslySetInnerHTML={{ __html: block.content }} />
                  )}
                  {block.template === 'image' && (
                    block.image && <Image className={styles.image} src={block.image} alt={block.alt} title={block.title} images={images} />
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
                    <div className={styles.buttonContainer}>
                      <button className={styles[camelcase(block.style)]}>{block.buttonText}</button>
                    </div>
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
