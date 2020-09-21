import React from 'react'
import { navigate } from 'gatsby'
import { Image } from '../forestry-tools'
import { OilPriceTicker } from '../forestry-tools/main'

import { logoStyles as styles } from '../styles/components'

import headerConfig from '../../.forestry/content/settings/header.json'

export const Logo = ({ images, menuOpen }) => {
  const homeButton = () => {
    navigate('/')
    typeof window !== 'undefined' && document.getElementById('main').scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  return (
    <div className={styles.logoContainer + `${menuOpen ? ` ${styles.menuOpen}` : ''}`}>
      <Image onClick={homeButton} className={styles.logo} src={headerConfig.logo.image} images={images} alt={headerConfig.logo.alt} title={headerConfig.logo.title} container='div' />
      <Image onClick={homeButton} className={styles.floatingLogo} src={headerConfig.floatingLogo.image} images={images} alt={headerConfig.floatingLogo.alt} title={headerConfig.floatingLogo.title} container='div' />
      <div className={styles.ticker}>
        <OilPriceTicker styles={styles} />
      </div>
    </div>
  )
}
