import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Context } from '../context/context'

import { CallButton, ContactButton, FillSpace, Logo, Navigation, QuoteMenu, UserMenu } from './blocks'
import SocialMediaLinks from '../footer/blocks/socialMediaLinks/socialMediaLinks'
import styles from './header.module.scss'

import footerConfig from '../../../.forestry/content/settings/footer.json'
import headerConfig from '../../../.forestry/content/settings/header.json'
import headerMobileConfig from '../../../.forestry/content/settings/headerMobile.json'

export default ({ menuOpen, setMenuOpen, location, userMenuOpen, setUserMenuOpen, mobileMenuOpen, setMobileMenuOpen }) => {
  const context = useContext(Context)

  const handleCloseMenus = () => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }

  const handleCloseMobile = () => {
    setMobileMenuOpen(false)
  }

  return (
    <section className={styles.container + ` ${mobileMenuOpen ? `${styles.headerOpen}` : ''}`}>
      <header className={styles.header}>
        <div className={styles.menu + `${menuOpen ? ` ${styles.active}` : ''}`}>
          {headerConfig.blocks.map((block, i: number) => {
            return block.template === 'header-call-button' ? (
              <CallButton key={i} block={block} handleCloseMenus={handleCloseMenus} />
            ) : block.template === 'header-fill-space' ? (
              <FillSpace key={i} handleCloseMenus={handleCloseMenus} />
            ) : block.template === 'header-logo' ? (
              <Logo key={i} block={block} />
            ) : null
          })}
          {headerMobileConfig.blocks.map((block, i: number) => {
            return block.template === 'header-mobile-block-top-navigation' ? (
              <Navigation key={i} block={block} setMenuOpen={setMenuOpen} bottom={false} />
            ) : null
          })}
        </div>
        <div className={styles.divider}>
          <div className={styles.dividerLinks}>
            {headerConfig.blocks.map((block, i: number) => {
              return block.template === 'header-quote-menu' ? (
                <QuoteMenu key={i} block={block} handleCloseMenus={handleCloseMenus} />
              ) : block.template === 'header-user-menu' ? (
                <UserMenu key={i} block={block} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} location={location} />
              ) : block.template === 'header-contact-button' ? (
                <ContactButton key={i} block={block} handleCloseMenus={handleCloseMenus} />
              ) : null
            })}
            <Link className={styles.login} to='/account/login' onMouseDown={handleCloseMobile}>
              {!context.user ? 'Login/Sign up'
                : (<button className={styles.logout} onClick={context.handleLogoutUser}>Logout</button>)}
            </Link>
          </div>
        </div>
        <div className={styles.bottomMenu}>
          {headerMobileConfig.blocks.map((block, i: number) => {
            return block.template === 'header-mobile-block-bottom-navigation' ? (
              <Navigation key={i} block={block} setMenuOpen={setMenuOpen} bottom />
            ) : null
          })}
          {footerConfig.bottomRow.map((block, i: number) => {
            return block.template === 'footer-social-media-links' ? (
              <SocialMediaLinks key={i} block={block} />
            ) : null
          })}
        </div>
      </header>
    </section>
  )
}
