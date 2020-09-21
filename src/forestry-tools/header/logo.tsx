import React from 'react'
import { Link } from 'gatsby'

import { Image } from '../exports'

export const Logo = ({ block, styles, images }) => (
  <Link to='/'>
    <Image className={styles.default} src={block.image} alt={block.alt} title={block.title} images={images} />
  </Link>
)
