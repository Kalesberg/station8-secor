import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { Context } from '../context/context'
import { Footer, Header, HeaderMobile, Main } from '../'
import Scroll from './scroll/scroll'

import './reset.scss'
import './global.scss'
import styles from './layout.module.scss'

type layoutProps = {
  children?: any,
  title: string,
  pages: [any],
  blocks?: [any],
  articles?: [any],
  menu: any,
  location: any,
  options?: any,
  careers?: any,
  forms?: any
}

export default ({ children, title: siteTitle = '', pages, blocks, articles, menu, location, options, careers, forms }: layoutProps) => {
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
      <Header pages={pages} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} menu={menu} location={location} />
      <HeaderMobile pages={pages} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} location={location} />
      <Main blocks={blocks} menuOpen={menuOpen} scrollListener={scrollListener} scrollPosition={scrollPosition} setMenuOpen={setMenuOpen} setUserMenuOpen={setUserMenuOpen} articles={articles} menu={menu} location={location} options={options} careers={careers} forms={forms}>
        {children}
        <Footer pages={pages} />
      </Main>
      <Scroll />
    </div>
  ) : null
}
