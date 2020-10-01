import React from 'react'

import { classNames } from '../../../../functions'

import styles from './articlesSlider.module.scss'

export default ({ block }) => {
  const blockValues = Object.entries(block).filter(([name, value]) => value !== null)
    .map(([name, value]) => ({ name, value }))
  return (
    <section className={classNames(block, styles)}>
      <p>{block.template}</p>
    </section>
  )
}
