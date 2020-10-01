import React from 'react'
import { Link } from 'gatsby'

import styles from './links.module.scss'

export default ({ block, pages }) => {
  const getPage = (link, i) => {
    const page = pages.find(page => link.page.includes(page.relativePath))
    return page && page.filePath ? (
      <Link key={i} activeClassName={styles.active} className={styles.link} partiallyActive={page.filePath !== '/'} to={page.filePath}>
        <p className={styles.label + `${link.bold ? ` ${styles.bold}` : ''}`}>{link.label}</p>
      </Link>
    ) : null
  }

  return (
    <div className={styles.default}>
      <h1 className={styles.label}>{block.label}</h1>
      <div className={styles.columns}>
        {block.columns.map((column, i) => (
          <div key={i} className={styles.column}>
            {column.links.map((link, i) => (
              getPage(link, i)
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
