import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import styles from './forms.module.scss'

export default () => {
  const { allMarkdownRemark: { nodes: forms } } = useStaticQuery(graphql`{
    allMarkdownRemark(filter: {frontmatter: {type: {eq: "form"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          title
          heroImage {
            publicURL
          }
          form {
            publicURL
          }
        }
        fileAbsolutePath
      }
    }
  }`)

  return forms && forms.length ? (
    <div className={styles.forms}>
      {forms.map(form => (
        <a key={form.fileAbsolutePath} className={styles.form} style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${form.frontmatter.heroImage.publicURL})` }} href={form.frontmatter.form.publicURL} download={form.frontmatter.title}>
          <h2>{form.frontmatter.title}</h2>
        </a>
      ))}
    </div>
  ) : null
}
