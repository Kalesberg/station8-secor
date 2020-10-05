import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { Footer, Header, Main } from '../'

import './reset.scss'
import './global.scss'
import styles from './layout.module.scss'

export default ({ children, title: siteTitle = '', images, pages, toggleForm, blocks, articles, tag, menu, location }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  // useEffect(() => {
  //   console.log(menuOpen)
  // }, [menuOpen])

  // useEffect(() => {
  //   document.documentElement.style.setProperty('--top', '0')
  //   document.documentElement.style.setProperty('--floating-logo-opacity', '1')
  //   document.documentElement.style.setProperty('--floating-logo-click', 'all')
  // }, [])

  // const scrollListener = e => {
  //   document.documentElement.style.setProperty('--top', e.target.scrollTop)
  //   document.documentElement.style.setProperty('--floating-logo-opacity', e.target.scrollTop < window.innerHeight ? '' + (window.innerHeight - e.target.scrollTop) / window.innerHeight : '0')
  //   document.documentElement.style.setProperty('--floating-logo-click', e.target.scrollTop < window.innerHeight ? 'all' : 'none')
  // }

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

  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang='en' />
        <title>{siteTitle + titleDivider + `${title || '404: Page Not Found'}`}</title>
        <meta name='description' content={description} />
      </Helmet>
      <Header images={images} pages={pages} menuOpen={menuOpen} setMenuOpen={setMenuOpen} menu={menu} location={location} />
      <Main blocks={blocks} images={images} menuOpen={menuOpen} setMenuOpen={setMenuOpen} articles={articles} pages={pages} tag={tag} toggleForm={toggleForm} menu={menu} location={location}>
        {children}
        <Footer images={images} pages={pages} toggleForm={toggleForm} />
      </Main>
    </div>
  )
}
