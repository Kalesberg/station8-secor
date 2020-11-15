import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../../components'

import styles from './form.module.scss'

export default ({
  data: {
    markdownRemark: {
      frontmatter: {
        title,
        form: {
          publicURL
        }
      }
    }
  },
  location
}) => {
  const file = useRef()

  useEffect(() => {
    if (typeof window !== 'undefined' && file && file.current) {
      setTimeout(() => {
        file.current.click()
      }, 3000)
    }
  }, [file])

  return (
    <Layout title={title} location={location}>
      <article className={styles.article}>
        <a ref={file} className={styles.download} href={publicURL} download={title}>Click here to download <strong>{title}</strong> if it is not automatically downloaded within three seconds.</a>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
query ($title: String!) {
  markdownRemark(frontmatter: {title: {eq: $title}, type: {eq: "form"}}) {
    frontmatter {
      title
      heroImage {
        publicURL
      }
      summary
      form {
        publicURL
      }
    }
  }
}
`
