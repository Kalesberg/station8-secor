import React from 'react'

import { CallButton, ContactFormWithVideoBackground, ContactInfo, FavoritePage, FeaturedPage, FillSpace, Logo, Navigation, Search } from './blocks'

import styles from './header.module.scss'

import headerConfig from '../../../.forestry/content/settings/header.json'
import contactInfo from '../../../.forestry/content/settings/contact.json'

export default ({ images, pages, menuOpen, setMenuOpen, toggleForm }) => (
  <header className={styles.header}>
    {/* {!menuOpen && <img className={styles.menuButton} alt='Open menu' src='' onClick={() => setMenuOpen(!menuOpen)} />}
    {menuOpen && <img className={styles.menuButton + ` ${styles.closeButton}`} alt='Close menu' src='' onClick={() => setMenuOpen(!menuOpen)} />} */}
    <div className={styles.menu + `${menuOpen ? ` ${styles.active}` : ''}`}>
      {headerConfig.blocks.map((block, i: number) => {
        return block.template === 'header-call-button' ? (
          <CallButton key={i} block={block} images={images} />
        ) : block.template === 'header-contact-form-with-video-background' ? (
          <ContactFormWithVideoBackground key={i} block={block} images={images} menuOpen={menuOpen} />
        ) : block.template === 'header-contact-info' ? (
          <ContactInfo key={i} contactInfo={contactInfo} />
        ) : block.template === 'header-favorite-page' ? (
          <FavoritePage key={i} block={block} images={images} pages={pages} />
        ) : block.template === 'header-featured-page' ? (
          <FeaturedPage key={i} block={block} pages={pages} />
        ) : block.template === 'header-fill-space' ? (
          <FillSpace key={i} />
        ) : block.template === 'header-logo' ? (
          <Logo key={i} block={block} images={images} />
        ) : block.template === 'header-links' ? (
          <Navigation key={i} block={block} pages={pages} setMenuOpen={setMenuOpen} toggleForm={toggleForm} />
        ) : block.template === 'header-search' ? (
          <Search key={i} block={block} images={images} />
        ) : <p key={i}>{block.template} not defined</p>
      })}
    </div>
  </header>
)
