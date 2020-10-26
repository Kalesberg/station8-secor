import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './fullInteractiveMarkets.module.scss'

export default ({ block, images }) => {
  
  return (
    <section className={styles.section}>
      <div className={styles.backgroundContainer}>
        {block.markets && block.markets.map((market,i) => {
          return (
            <div key={i} className={styles.background + ` ${selected === market.market ? `${styles.backgroundShow}` : "" }`}>
              <Image className={styles.image} src={market.image && market.image} images={images} />
            </div>
          ) 
        })}
      </div>
      
    </section>
  )
}
