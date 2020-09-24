import React from 'react'

import { ContactInfo, CopyrightInfo, Links, Logo, Quotes, SocialMediaLinks, TextAndLinks } from './blocks'

import styles from './footer.module.scss'

import footerConfig from '../../../.forestry/content/settings/footer.json'
import contactInfo from '../../../.forestry/content/settings/contact.json'

export default ({ images, pages, toggleForm }) => (
  <>
    <footer className={styles.footer}>
      {footerConfig.blocks.map((block, i: number) => {
        return block.template === 'footer-contact-info' ? (
          <ContactInfo key={i} contactInfo={contactInfo} toggleForm={toggleForm} />
        ) : block.template === 'footer-copyright-info' ? (
          <CopyrightInfo key={i} block={block} pages={pages} />
        ) : block.template === 'footer-links' ? (
          <Links key={i} block={block} pages={pages} />
        ) : block.template === 'footer-logo' ? (
          <Logo key={i} block={block} images={images} />
        ) : block.template === 'footer-quotes' ? (
          <Quotes key={i} block={block} />
        ) : <p key={i}>{block.template} not defined</p>
      })}
    </footer>
    <footer className={styles.bottomRow}>
      {footerConfig.bottomRow.map((block, i: number) => {
        return block.template === 'footer-social-media-links' ? (
          <SocialMediaLinks key={i} block={block} images={images} />
        ) : block.template === 'footer-text-and-links' ? (
          <TextAndLinks key={i} block={block} />
        ) : <p key={i}>{block.template} not defined</p>
      })}
    </footer>
  </>
)
