import React from 'react'
import camelcase from 'camelcase'
import { enabled, footerBlock } from '../forestry-tools'

import { footerStyles as styles } from '../styles/components'
import blockStyles from '../styles/blocks/footer'

import footerConfig from '../../.forestry/content/settings/footer.json'
import contactInfo from '../../.forestry/content/settings/contact.json'

export const Footer = ({ images, pages, toggleForm }) => {
  return (
    <footer className={styles.default}>
      {enabled(footerConfig.blocks).map((block, i: number) => (
        footerBlock(block, i, images, blockStyles[camelcase(block.template.replace('footer-', ''))], pages, contactInfo, toggleForm)
      ))}
    </footer>
  )
}
