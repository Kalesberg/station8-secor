import React from 'react'
import { Link } from 'gatsby'

import styles from './navigation.module.scss'

export default ({ block, pages, setMenuOpen, location, bottom }) => {
  const closeMenu = () => setMenuOpen(false)
  const openMenu = () => setMenuOpen(true)

  const getPage = filePath => {
    const page = pages.find(page => filePath.includes(page.relativePath))
    return page && page.filePath ? (
      <Link activeClassName={styles.active} className={styles.link} partiallyActive={page.filePath !== '/'} to={page.filePath} onClick={closeMenu} onMouseOver={closeMenu}>
        <p className={styles.label + ` ${bottom ? `${styles.labelBlack}` : ""}`}>{page.title}</p>
      </Link>
    ) : 'Link Missing'
  }

  return (
    <nav className={styles.default} role='navigation' aria-label='main navigation'>
      <ul className={styles.item + ' ' + styles.list}>
        {block.links.map((item, i) => (
          <li key={i} className={styles.listItem}>
            {getPage(item.page)
              // <div className={styles.menu + `${location && (location.pathname.split('/')[1] === 'equipment' || location.pathname.split('/')[1] === 'products') ? ` ${styles.active}` : ''}`} onMouseOver={openMenu}>
              //   <p className={styles.label}>{item.label}</p>
              // </div>
            }
          </li>
        ))}
      </ul>
    </nav>
  )
}
