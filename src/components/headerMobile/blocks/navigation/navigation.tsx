import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import slugify from 'slugify'

import styles from './navigation.module.scss'

export default ({ block, setMenuOpen, bottom }) => {
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

  const getPage = filePath => {
    const page = pages.find(page => filePath.includes(page.relativePath))
    return page ? (
      <Link activeClassName={styles.active} className={styles.link} partiallyActive={page.filePath !== '/'} to={page.childPagesJson.slug === '/' ? '/' : page.childPagesJson.slug ? `/${page.childPagesJson.slug}` : '/' + slugify(page.childPagesJson.title).toLowerCase()} onClick={closeMenu} onMouseOver={closeMenu}>
        <p className={styles.label + ` ${bottom ? `${styles.labelBlack}` : ''}`}>{page.childPagesJson.title === 'Products' ? 'Products & Equipment' : page.childPagesJson.title}</p>
      </Link>
    ) : 'Link Missing'
  }

  return (
    <nav className={styles.default} role='navigation' aria-label='main navigation'>
      <ul className={styles.item + ' ' + styles.list}>
        {block.links.map((item, i) => (
          <li key={i} className={styles.listItem}>
            {getPage(item.page)}
          </li>
        ))}
      </ul>
    </nav>
  )
}
