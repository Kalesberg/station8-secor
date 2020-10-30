import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'gatsby'
import { Context } from '../context/context'

import { CallButton, ContactButton, ContactFormWithVideoBackground, ContactInfo, FavoritePage, FeaturedPage, FillSpace, Logo, Navigation, Search, QuoteMenu, UserMenu } from './blocks'
import SocialMediaLinks from '../footer/blocks/socialMediaLinks/socialMediaLinks'
import styles from './header.module.scss'

import footerConfig from '../../../.forestry/content/settings/footer.json'
import headerConfig from '../../../.forestry/content/settings/header.json'
import headerMobileConfig from '../../../.forestry/content/settings/headerMobile.json'
import contactInfo from '../../../.forestry/content/settings/contact.json'

export default ({ images, pages, menuOpen, setMenuOpen, menu, location, userMenuOpen, setUserMenuOpen, mobileMenuOpen, setMobileMenuOpen }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [levelOne, setLevelOne] = useState(0)
  const [levelTwo, setLevelTwo] = useState(0)
  const [activeSubcategory, setActiveSubcategory] = useState(undefined)
  const [searchResults, setSearchResults] = useState([])
  const context = useContext(Context)

  const handleSetSearchTerm = e => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (searchTerm) {
      const results = []
      menu.forEach(category => category.menus.forEach(menu => menu.submenus.forEach(submenu => submenu.products.forEach(product => {
        if (product.name.replace(/\W/g, '').toLowerCase().includes(searchTerm.replace(/\W/g, '').toLowerCase())) {
          results.push(product)
        }
      }))))
      setSearchResults(results)
    }
  }, [searchTerm])

  const handleCloseMenus = () => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }

  const handleCloseMobile = () => {
    setMobileMenuOpen(false);
  }

  return (
    <section className={styles.container + ` ${mobileMenuOpen ? `${styles.headerOpen}` : ""}`}>
      <header className={styles.header}>
        <div className={styles.menu + `${menuOpen ? ` ${styles.active}` : ''}`}>
          {headerConfig.blocks.map((block, i: number) => {
            return block.template === 'header-call-button' ? (
              <CallButton key={i} block={block} handleCloseMenus={handleCloseMenus} />
            ) : block.template === 'header-contact-form-with-video-background' ? (
              <ContactFormWithVideoBackground key={i} block={block} images={images} menuOpen={menuOpen} />
            ) : block.template === 'header-contact-info' ? (
              <ContactInfo key={i} contactInfo={contactInfo} />
            ) : block.template === 'header-favorite-page' ? (
              <FavoritePage key={i} block={block} images={images} pages={pages} />
            ) : block.template === 'header-featured-page' ? (
              <FeaturedPage key={i} block={block} pages={pages} />
            ) : block.template === 'header-fill-space' ? (
              <FillSpace key={i} handleCloseMenus={handleCloseMenus} />
            ) : block.template === 'header-logo' ? (
              <Logo key={i} block={block} images={images} />
            ) : block.template === 'header-search' ? (
              <Search key={i} block={block} images={images} />
            ) : null
          })}
          {headerMobileConfig.blocks.map((block, i: number) => {
            return block.template === 'header-mobile-block-top-navigation' ? (
              <Navigation key={i} block={block} pages={pages} setMenuOpen={setMenuOpen} location={location} bottom={false}/>
            ) : null
          })}
        </div>
        <div className={styles.divider}>
          <div className={styles.dividerLinks}>
            {headerConfig.blocks.map((block, i: number) => {
              return block.template === 'header-quote-menu' ? (
                <QuoteMenu key={i} block={block} images={images} handleCloseMenus={handleCloseMenus} />
              ) : block.template === 'header-user-menu' ? (
                <UserMenu key={i} block={block} images={images} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} location={location} />
              ) : block.template === 'header-contact-button' ? (
                <ContactButton key={i} block={block} images={images} handleCloseMenus={handleCloseMenus} />
              ) : null  
            })}
            <Link className={styles.login} to="/account/login" onMouseDown={handleCloseMobile}>
              {!context.user ? 'Login/Sign up' : 
              (<button className={styles.logout} onClick={context.handleLogoutUser}>Logout</button>)}
            </Link>
          </div>
        </div>
        <div className={styles.bottomMenu}>
          {headerMobileConfig.blocks.map((block, i: number) => {
            return block.template === 'header-mobile-block-bottom-navigation' ? (
              <Navigation key={i} block={block} pages={pages} setMenuOpen={setMenuOpen} location={location} bottom={true}/>
            ) : null
          })}
          {footerConfig.bottomRow.map((block, i: number) => {
          return block.template === 'footer-social-media-links' ? (
            <SocialMediaLinks key={i} block={block} images={images}/>
          ) : null
        })}
        </div>
      </header>
    </section>
  )
}
