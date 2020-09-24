import React from 'react'

import { classNames } from '../../../../functions'

import styles from './posts.module.scss'

export default ({ block }) => {
  const blockValues = Object.entries(block).filter(([name, value]) => value !== null)
    .map(([name, value]) => ({ name, value }))
  console.log(block.template, blockValues)
  return (
    <section className={classNames(block, styles)}>
      <p>{block.template}</p>
    </section>
  )
}
