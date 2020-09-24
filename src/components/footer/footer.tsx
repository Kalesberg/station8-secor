import React from 'react'

import { ContactInfo, CopyrightInfo, Logo } from './blocks'

import styles from './footer.module.scss'

import footerConfig from '../../../.forestry/content/settings/footer.json'
import contactInfo from '../../../.forestry/content/settings/contact.json'

export default ({ images, pages, toggleForm }) => (
  <footer className={styles.footer}>
    {footerConfig.blocks.map((block, i: number) => {
      return block.template === 'footer-contact-info' ? (
        <ContactInfo key={i} contactInfo={contactInfo} toggleForm={toggleForm} />
      ) : block.template === 'footer-copyright-info' ? (
        <CopyrightInfo key={i} block={block} pages={pages} />
      ) : block.template === 'footer-logo' ? (
        <Logo key={i} block={block} images={images} />
      ) : <p key={i}>{block.template} not defined</p>
    })}
  </footer>
)
