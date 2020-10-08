import React, { useContext } from 'react'
import { Link } from 'gatsby'

import { Context } from '../../../context/context'

import { Image } from '../../../../functions'

import styles from './quoteMenu.module.scss'

export default ({ block, images }) => {
  const appContext = useContext(Context)
  return appContext && (
    <Link to='/get-a-quote' className={styles.container}>
      <p className={styles.label}>{block.label}</p>
      <Image className={styles.icon} src={block.icon} images={images} />
      <div className={styles.quantityContainer}>
        <p className={styles.quantity}>{appContext.quantity}</p>
      </div>
      <span className={styles.underline} />
    </Link>
  )
}
