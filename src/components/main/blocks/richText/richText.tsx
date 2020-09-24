import React from 'react'
import parse from 'html-react-parser'

import { classNames } from '../../../../functions'

import styles from './richText.module.scss'

export default ({ block }) => (
  <section className={classNames(block, styles)}>
    {block.body && parse(block.body)}
  </section>
)
