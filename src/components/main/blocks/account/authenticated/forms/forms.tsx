import React from 'react'

import styles from './forms.module.scss'

export default ({ forms }) => (
  <div className={styles.forms}>
    {forms.map(form => (
      <a key={form.path} className={styles.form} style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${form.frontmatter.heroImage.childImageSharp.original.src})` }} href={form.frontmatter.form.publicURL} download={form.frontmatter.title}>
        <h2>{form.frontmatter.title}</h2>
      </a>
    ))}
  </div>
)
