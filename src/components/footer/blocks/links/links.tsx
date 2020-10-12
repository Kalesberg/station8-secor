import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { Context } from '../../../context/context'

import styles from './links.module.scss'

export default ({ block, pages }) => {
  const context = useContext(Context)

  const getPage = (link, i) => {
    const page = pages.find(page => link.page.includes(page.relativePath))
    return page && page.filePath ? (
      <Link key={i} activeClassName={styles.active} className={styles.link} partiallyActive={page.filePath !== '/'} to={page.filePath}>
        <p className={styles.label + `${link.bold ? ` ${styles.bold}` : ''}`}>{!link.replaceLabel ? link.label : context && context.user ? 'My Account' : 'Login'}</p>
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
