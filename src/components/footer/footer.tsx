import React from 'react'

import { Links, Quotes, SocialMediaLinks, TextAndLinks } from './blocks'

import styles from './footer.module.scss'

import footerConfig from '../../../.forestry/content/settings/footer.json'

export default () => (
  <>
    <footer className={styles.footer}>
      {footerConfig.blocks.map((block, i: number) => {
        return block.template === 'footer-links' ? (
          <Links key={i} block={block} />
        ) : block.template === 'footer-quotes' ? (
          <Quotes key={i} block={block} />
        ) : <p key={i}>{block.template} not defined</p>
      })}
    </footer>
    <footer className={styles.bottomRow}>
      {footerConfig.bottomRow.map((block, i: number) => {
        return block.template === 'footer-social-media-links' ? (
          <SocialMediaLinks key={i} block={block} />
        ) : block.template === 'footer-text-and-links' ? (
          <TextAndLinks key={i} block={block} />
        ) : <p key={i}>{block.template} not defined</p>
      })}
    </footer>
  </>
)
