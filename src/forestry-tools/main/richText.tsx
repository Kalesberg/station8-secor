import React from 'react'
import parse from 'html-react-parser'

import { classNames } from '../exports'

export const RichText = ({ block, styles }) => (
  <section className={classNames(block, styles)}>
    {block.body && parse(block.body)}
  </section>
)
