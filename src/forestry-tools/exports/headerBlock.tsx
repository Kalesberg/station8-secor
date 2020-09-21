import React from 'react'

import { CallButton, ContactFormWithVideoBackground, ContactInfo, FavoritePage, FeaturedPage, FillSpace, Logo, Navigation, Search, toggleForm } from '../header'

export default (block, i, images, styles, pages, contactInfo, setMenuOpen, toggleForm, menuOpen) => {
  return block.template === 'header-call-button' ? (
    <CallButton key={i} block={block} styles={styles} images={images} />
  ) : block.template === 'header-contact-form-with-video-background' ? (
    <ContactFormWithVideoBackground key={i} block={block} styles={styles} images={images} menuOpen={menuOpen} />
  ) : block.template === 'header-contact-info' ? (
    <ContactInfo key={i} styles={styles} contactInfo={contactInfo} />
  ) : block.template === 'header-favorite-page' ? (
    <FavoritePage key={i} block={block} styles={styles} images={images} pages={pages} />
  ) : block.template === 'header-featured-page' ? (
    <FeaturedPage key={i} block={block} styles={styles} pages={pages} />
  ) : block.template === 'header-fill-space' ? (
    <FillSpace key={i} styles={styles} />
  ) : block.template === 'header-logo' ? (
    <Logo key={i} block={block} styles={styles} images={images} />
  ) : block.template === 'header-navigation' ? (
    <Navigation key={i} block={block} styles={styles} pages={pages} setMenuOpen={setMenuOpen} toggleForm={toggleForm} />
  ) : block.template === 'header-search' ? (
    <Search key={i} block={block} styles={styles} images={images} />
  ) : <p key={i}>{block.template} not defined</p>
}
