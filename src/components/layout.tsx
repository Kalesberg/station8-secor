import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { ContactForm, Footer, Header, Logo } from './'

import { mainStyles as styles } from '../styles/components'
import '../styles/reset.scss'
import '../styles/global.scss'

export const Layout = ({ title: siteTitle = '', images, pages, children, formOpen, toggleForm }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty('--top', '0')
    document.documentElement.style.setProperty('--floating-logo-opacity', '1')
    document.documentElement.style.setProperty('--floating-logo-click', 'all')
  }, [])

  const scrollListener = e => {
    document.documentElement.style.setProperty('--top', e.target.scrollTop)
    document.documentElement.style.setProperty('--floating-logo-opacity', e.target.scrollTop < window.innerHeight ? '' + (window.innerHeight - e.target.scrollTop) / window.innerHeight : '0')
    document.documentElement.style.setProperty('--floating-logo-click', e.target.scrollTop < window.innerHeight ? 'all' : 'none')
  }

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
    <>
      <Helmet>
        <html lang='en' />
        <title>{siteTitle + titleDivider + `${title || '404: Page Not Found'}`}</title>
        <meta name='description' content={description} />
      </Helmet>
      <Header images={images} pages={pages} menuOpen={menuOpen} setMenuOpen={setMenuOpen} toggleForm={toggleForm} />
      <ContactForm formOpen={formOpen} toggleForm={toggleForm} />
      <main onScroll={scrollListener} className={styles.main + `${menuOpen ? ` ${styles.hidden}` : ''}`} id='main'>
        <Logo images={images} menuOpen={menuOpen} />
        {children}
        <Footer images={images} pages={pages} toggleForm={toggleForm} />
      </main>
    </>
  )
}
