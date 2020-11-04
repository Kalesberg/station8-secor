import React, { useEffect, useRef, useState } from 'react'
import { graphql, navigate } from 'gatsby'
import Moment from 'react-moment'

import { Image } from '../../functions'

import { Layout } from '../../components'
import { ArticlesGrid } from '../../components/main/blocks'

import styles from './form.module.scss'

export default ({
  pageContext: { images, pages, menu },
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
  const [formOpen, setFormOpen] = useState(false)
  const file = useRef()

  useEffect(() => {
    if (typeof window !== 'undefined' && file && file.current) {
      setTimeout(() => {
        file.current.click()
      }, 3000)
    }
  }, [file])

  const toggleForm = e => {
    e.preventDefault()
    setFormOpen(!formOpen)
  }

  return (
    <Layout title={title} pages={pages} images={images} toggleForm={toggleForm} menu={menu} location={location}>
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
        childImageSharp {
          original {
            src
          }
        }
      }
      summary
      form {
        publicURL
      }
    }
  }
}
`
