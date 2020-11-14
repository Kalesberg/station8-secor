import React, { useContext } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import slugify from 'slugify'

import { Context } from '../../../context/context'

import styles from './links.module.scss'

export default ({ block }) => {
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
  const context = useContext(Context)

  const getPage = (filePath, i) => {
    const page = pages.find(page => filePath.page.includes(page.relativePath))
    return page ? (
      <Link key={i} activeClassName={styles.active} className={styles.link} partiallyActive={page.filePath !== '/'} to={page.childPagesJson.slug === '/' ? '/' : page.childPagesJson.slug ? `/${page.childPagesJson.slug}` : '/' + slugify(page.childPagesJson.title).toLowerCase()}>
        <p className={styles.label + `${filePath.bold ? ` ${styles.bold}` : ''}`}>{!filePath.replaceLabel ? filePath.label : context && context.user ? 'My Account' : 'Login'}</p>
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
