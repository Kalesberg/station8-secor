import React, { useEffect } from 'react'

import styles from './forms.module.scss'

export default ({ forms }) => {
  useEffect(() => {
    console.log('forms', forms)
  }, [forms])

  return (
    <div className={styles.forms}>
      {forms.map(form => {
        console.log(form.frontmatter.heroImage.childImageSharp.original.src)
        return (
          <div key={form.path} className={styles.form} style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${form.frontmatter.heroImage.childImageSharp.original.src})` }}>
            <h2>{form.frontmatter.title}</h2>
          </div>
        )
      })}
    </div>
  )
}
