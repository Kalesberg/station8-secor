import React from 'react'
import camelcase from 'camelcase'
import { enabled, headerBlock } from '../forestry-tools'

import { headerStyles as styles } from '../styles/components'
import blockStyles from '../styles/blocks/header'

import headerConfig from '../../.forestry/content/settings/header.json'
import contactInfo from '../../.forestry/content/settings/contact.json'

import menuButton from '../../.forestry/content/images/menu.svg'
import closeButton from '../../.forestry/content/images/close.svg'

export const Header = ({ images, pages, menuOpen, setMenuOpen, toggleForm }) => {
  return (
    <header className={styles.header}>
      {!menuOpen && <img className={styles.menuButton} alt='Open menu' src={menuButton} onClick={() => setMenuOpen(!menuOpen)} />}
      {menuOpen && <img className={styles.menuButton + ` ${styles.closeButton}`} alt='Close menu' src={closeButton} onClick={() => setMenuOpen(!menuOpen)} />}
      <div className={styles.menu + `${menuOpen ? ` ${styles.active}` : ''}`}>
        {enabled(headerConfig.blocks).map((block, i: number) => headerBlock(block, i, images, blockStyles[camelcase(block.template.replace('header-', ''))], pages, contactInfo, setMenuOpen, toggleForm, menuOpen))}
      </div>
    </header>
  )
}
