import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { Context } from '../context/context'
import { Footer, Header, HeaderMobile, Main } from '../'
import Scroll from './scroll/scroll'

import './reset.scss'
import './global.scss'
import styles from './layout.module.scss'

export default ({ children, title: siteTitle = '', images, pages, toggleForm, blocks, articles, tag, menu, location, options, careers, forms }) => {
  const context = useContext(Context)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(null)
  const { site: { siteMetadata: { config: { description, title, titleDivider } } } } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          config {
            description
            title
            titleDivider
          }
        }
      }
    }
  `)

  const scrollListener = (e) => {
    setScrollPosition(e.target.scrollTop)
  }

  return context ? (
    <div className={styles.layout}>
      <Helmet>
        <html lang='en' />
        <title>{siteTitle + titleDivider + `${title || '404: Page Not Found'}`}</title>
        <meta name='description' content={description} />
      </Helmet>
      <Header images={images} pages={pages} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} menu={menu} location={location} />
      <HeaderMobile images={images} pages={pages} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} menu={menu} location={location} />
      <Main blocks={blocks} images={images} menuOpen={menuOpen} scrollListener={scrollListener} scrollPosition={scrollPosition} setMenuOpen={setMenuOpen} setUserMenuOpen={setUserMenuOpen} articles={articles} pages={pages} toggleForm={toggleForm} menu={menu} location={location} options={options} careers={careers} forms={forms}>
        {children}
        <Footer images={images} pages={pages} toggleForm={toggleForm} />
      </Main>
      <Scroll />
    </div>
  ) : null
}
