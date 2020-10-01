import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'

import styles from './navigation.module.scss'

export default ({ block, pages, setMenuOpen }) => {
  const closeMenu = () => setMenuOpen(false)
  const openMenu = () => setMenuOpen(true)

  const getPage = filePath => {
    const page = pages.find(page => filePath.includes(page.relativePath))
    return page && page.filePath ? (
      <Link activeClassName={styles.active} className={styles.link} partiallyActive={page.filePath !== '/'} to={page.filePath} onClick={closeMenu} onMouseOver={closeMenu}>
        <p className={styles.label}>{page.title}</p>
      </Link>
    ) : 'Link Missing'
  }

  return (
    <nav className={styles.default} role='navigation' aria-label='main navigation'>
      <ul className={styles.item + ' ' + styles.list}>
        {block.links.map((item, i) => (
          <li key={i} className={styles.listItem}>
            {!item.megaMenu ? getPage(item.page) : (
              <div className={styles.menu} onMouseOver={openMenu}>
                <p className={styles.label}>{item.label}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
