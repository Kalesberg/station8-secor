import React from 'react'

import styles from './textAndLinks.module.scss'

export default ({ block }) => {
  console.log(block)
  return (
    <div className={styles.items}>
      {block.items.map((item, i) => {
        return (
          <React.Fragment key={i}>
            {i > 0 ? <p className={styles.divider}>|</p> : null}
            {item.link ? (
              <a href={item.link} target='_blank' rel='noopener noreferrer'>
                <p className={styles.text}>{item.text}</p>
              </a>
            ) : (
              <p className={styles.text}>{item.text}</p>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
