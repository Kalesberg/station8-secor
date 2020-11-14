import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import slugify from 'slugify'

import styles from './navigation.module.scss'

export default ({ block, setMenuOpen, location }) => {
  const { allFile: { nodes: pages } } = useStaticQuery(graphql`
    {
      allFile(filter: {relativeDirectory: {eq: "pages"}}) {
        nodes {
          relativePath
          childPagesJson {
            slug
            title
          }
        }
      }
    }
  `)
  const closeMenu = () => setMenuOpen(false)
  const openMenu = () => setMenuOpen(true)

  const getPage = filePath => {
    const page = pages.find(page => filePath.includes(page.relativePath))
    return page ? (
      <Link activeClassName={styles.active} className={styles.link} partiallyActive={page.filePath !== '/'} to={page.childPagesJson.slug === '/' ? '/' : page.childPagesJson.slug ? `/${page.childPagesJson.slug}` : '/' + slugify(page.childPagesJson.title).toLowerCase()} onClick={closeMenu} onMouseOver={closeMenu}>
        <p className={styles.label}>{page.childPagesJson.title}</p>
        <span className={styles.underline} />
      </Link>
    ) : 'Link Missing'
  }

  return (
    <nav className={styles.default} role='navigation' aria-label='main navigation'>
      <ul className={styles.item + ' ' + styles.list}>
        {block.links.map((item, i) => (
          <li key={i} className={styles.listItem}>
            {!item.megaMenu ? getPage(item.page) : (
              <div className={styles.menu + `${location && (location.pathname.split('/')[1] === 'equipment' || location.pathname.split('/')[1] === 'products') ? ` ${styles.active}` : ''}`} onMouseOver={openMenu}>
                <p className={styles.label}>{item.label}</p>
                <span className={styles.underline} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
