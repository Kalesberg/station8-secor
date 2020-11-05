import React from 'react'
import parse from 'html-react-parser'
import { Link } from 'gatsby'

import { Image } from '../../../../functions'

import styles from './locations.module.scss'

export default ({ block, images }) => {
  console.log('locations', block.locations)
  return (
    <section className={styles.section}>
      {block.locations.map((location, i) => {
        return (
          <Image key={i} className={styles.location} src={location.image} images={images} container='div' gradient='linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'>
            <div className={styles.address}>
              {location.address.split('\n').map((line, i) => (
                <p className={styles.line} key={i}>{line}</p>
              ))}
            </div>
            <p className={styles.phone}>Office: {location.phone.substring(0, 3)}-{location.phone.substring(3, 6)}-{location.phone.substring(6, 10)}</p>
            <a className={styles.directions} href=''>
              <div className={styles.icon} />
              <p className={styles.text}>Get directions</p>
            </a>
            <h1 className={styles.title}>{location.city.toUpperCase()}</h1>
            <div className={styles.underlineContainer}>
              <div className={styles.underline} />
            </div>
          </Image>
        )
      })}
    </section>
  )
}
