import React from 'react'

import { ContactInfo, CopyrightInfo, Logo } from '../footer'

export default (block, i, images, styles, pages, contactInfo, toggleForm) => {
  return block.template === 'footer-contact-info' ? (
    <ContactInfo key={i} styles={styles} contactInfo={contactInfo} toggleForm={toggleForm} />
  ) : block.template === 'footer-copyright-info' ? (
    <CopyrightInfo key={i} styles={styles} block={block} pages={pages} />
  ) : block.template === 'footer-logo' ? (
    <Logo key={i} styles={styles} block={block} images={images} />
  ) : <p key={i}>{block.template} not defined</p>
}
