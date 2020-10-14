import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { Context } from '../context/context'
import { Footer, Header, Main } from '../'

import './reset.scss'
import './global.scss'
import styles from './layout.module.scss'

export default ({ children, title: siteTitle = '', images, pages, toggleForm, blocks, articles, tag, menu, location, options }) => {
  const context = useContext(Context)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

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

  return context ? (
    <div className={styles.layout}>
      <Helmet>
        <html lang='en' />
        <title>{siteTitle + titleDivider + `${title || '404: Page Not Found'}`}</title>
        <meta name='description' content={description} />
      </Helmet>
      <Header images={images} pages={pages} menuOpen={menuOpen} setMenuOpen={setMenuOpen} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} menu={menu} location={location} />
      <Main blocks={blocks} images={images} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setUserMenuOpen={setUserMenuOpen} articles={articles} pages={pages} tag={tag} toggleForm={toggleForm} menu={menu} location={location} options={options}>
        {children}
        <Footer images={images} pages={pages} toggleForm={toggleForm} />
      </Main>
    </div>
  ) : null
}
