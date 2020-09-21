import React from 'react'
import { Link } from 'gatsby'

import { getPage, Image } from '../exports'

export const FavoritePage = ({ block, styles, pages, images }) => {
  return (
    <Link className={styles.default} to={block.page.replace('.forestry/content/pages', '').replace('.json', '')}>
      <Image className={styles.icon} src={block.icon.image} alt={block.icon.alt} title={block.icon.title} images={images} />
      <strong>{getPage(block.page, pages) && getPage(block.page, pages).title}</strong>
    </Link>
  )
}
