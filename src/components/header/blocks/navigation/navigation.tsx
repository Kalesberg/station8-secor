import React from 'react'
import { Link } from 'gatsby'

import styles from './navigation.module.scss'

export default ({ block, pages, setMenuOpen, location }) => {
  const closeMenu = () => setMenuOpen(false)
  const openMenu = () => setMenuOpen(true)

  const getPage = filePath => {
    const page = pages.find(page => filePath.includes(page.relativePath))
    return page && page.filePath ? (
      <Link activeClassName={styles.active} className={styles.link} partiallyActive={page.filePath !== '/'} to={page.filePath} onClick={closeMenu} onMouseOver={closeMenu}>
        <p className={styles.label}>{page.title}</p>
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
              <div className={styles.menu + `${location.pathname.split('/')[1] === 'equipment' || location.pathname.split('/')[1] === 'products' ? ` ${styles.active}` : ''}`} onMouseOver={openMenu}>
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
