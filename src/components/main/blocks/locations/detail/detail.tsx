import React from 'react'
import { Link } from 'gatsby'
import slugify from 'slugify'

import { Image } from '../../../../../functions'

import styles from './detail.module.scss'

export default ({ block, images, selectedLocation }) => (
  <section className={styles.detail}>
    <div className={styles.links}>
      {block.locations.map((location, i) => {
        return (
          <Link key={i} className={styles.link + `${location.city === selectedLocation.city ? ` ${styles.active}` : ''}`} to={`/locations?city=${slugify(location.city).toLowerCase()}`}>
            <h1 className={styles.title}>{location.city.toUpperCase()}</h1>
          </Link>
        )
      })}
    </div>
    <Image className={styles.map} src={selectedLocation.mapImage} images={images} container='div' gradient='linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1))'>
      <div className={styles.address}>
        {selectedLocation.address.split('\n').map((line, i) => (
          <p className={styles.line} key={i}>{line}</p>
        ))}
      </div>
      <a className={styles.phone} href={`tel:+1${selectedLocation.phone}`}>Office: {selectedLocation.phone.substring(0, 3)}-{selectedLocation.phone.substring(3, 6)}-{selectedLocation.phone.substring(6, 10)}</a>
      <a className={styles.directions} href={selectedLocation.mapLink} target='_blank' rel='noopener noreferrer'>
        <div className={styles.icon} />
        <p className={styles.text}>Get directions</p>
      </a>
    </Image>
    <Image className={styles.location} src={selectedLocation.image} images={images} container='div' gradient='' />
  </section>
)
