import React from 'react'

import { Image } from '../exports'

export const CallButton = ({ block, styles, images }) => {
  return (
    <a className={styles.default} href={`tel:+${block.phoneNumber}`}>
      <Image className={styles.icon} src={block.icon.image} alt={block.icon.alt} title={block.icon.title} images={images} />
      <div className={styles.text}>
        <span className={styles.label}>
          {block.text}
        </span>
        <br />
        <span className={styles.phoneNumber}>
          {block.phoneNumber.slice(0, 3) + '-' + block.phoneNumber.slice(3, 6) + '-' + block.phoneNumber.slice(6)}
        </span>
      </div>
    </a>
  )
}
