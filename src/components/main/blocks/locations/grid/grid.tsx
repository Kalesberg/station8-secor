import React from 'react'
import { Link } from 'gatsby'
import slugify from 'slugify'

import { Image } from '../../../../../functions'

import styles from './grid.module.scss'

export default ({ block, images }) => (
  <section className={styles.grid}>
    {block.locations.map((location, i) => {
      return (
        <Image key={i} className={styles.location} src={location.image} images={images} container='div' gradient='linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'>
          <div className={styles.address}>
            {location.address.split('\n').map((line, i) => (
              <p className={styles.line} key={i}>{line}</p>
            ))}
          </div>
          <a className={styles.phone} href={`tel:+1${location.phone}`}>Office: {location.phone.substring(0, 3)}-{location.phone.substring(3, 6)}-{location.phone.substring(6, 10)}</a>
          <a className={styles.directions} href={location.mapLink} target='_blank' rel='noopener noreferrer'>
            <div className={styles.icon} />
            <p className={styles.text}>Get directions</p>
          </a>
          <h1 className={styles.title}>{location.city.toUpperCase()}</h1>
          <div className={styles.underlineContainer}>
            <div className={styles.underline} />
          </div>
          <Link className={styles.link} to={`/locations?city=${slugify(location.city).toLowerCase()}`}>
            <Image className={styles.map} src={location.mapImage} images={images} container='div' gradient='linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))' />
          </Link>
        </Image>
      )
    })}
  </section>
)
