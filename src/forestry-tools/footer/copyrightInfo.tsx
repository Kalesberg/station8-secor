import React from 'react'
import { Link } from 'gatsby'

import { enabled } from '../exports'

export const CopyrightInfo = ({ block, styles, pages }) => {
  const getPage = filePath => {
    const page = pages.find(page => filePath.includes(page.relativePath))
    return page && page.filePath ? (
      <Link className={styles.link} to={page.filePath}>{page.title}</Link>
    ) : 'Link Missing'
  }
  return (
    <section className={styles.default}>
      {enabled(block.blocks).map((block, i) => {
        return block.template === 'copyright-info-link' ? (
          <React.Fragment key={i}>
            {i ? <p className={styles.divider}>|</p> : null}
            <p className={styles.paragraph}>{getPage(block.page)}</p>
          </React.Fragment>
        ) : block.template === 'copyright-info-text' ? (
          <React.Fragment key={i}>
            {i ? <p className={styles.divider}>|</p> : null}
            <p className={styles.paragraph}>{block.text}</p>
          </React.Fragment>
        ) : null
      })}
      <p className={styles.divider}>|</p>
      <p className={styles.paragraph}>
        <a className={styles.link} href='http://fireupyourbrand.com' target='_blank' rel='noopener noreferrer'>Web design by Station8</a>
      </p>
    </section>
  )
}
