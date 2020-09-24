import React from 'react'
import { Link } from 'gatsby'

import { getPage } from '../../../../functions'

import styles from './featuredPage.module.scss'

export default ({ block, pages }) => {
  return (
    <Link className={styles.default} to={block.page.replace('.forestry/content/pages', '').replace('.json', '')}>
      {getPage(block.page, pages) && getPage(block.page, pages).title}
    </Link>
  )
}
