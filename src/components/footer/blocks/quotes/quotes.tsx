import React, { useState } from 'react'

import styles from './quotes.module.scss'

export default ({ block }) => {
  const [active, setActive] = useState(0)

  return (
    <div className={styles.default}>
      {block.quote.map((quote, i) => {
        return (
          <div key={i} className={styles.quote + `${i === active ? ` ${styles.active}` : ''}`}>
            <p className={styles.text}>{'"' + quote.text + '"'}</p>
            <p className={styles.author}>{'- ' + quote.author + '.'}</p>
          </div>
        )
      })}
    </div>
  )
}
