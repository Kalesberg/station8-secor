import React from 'react'
import { graphql, Link } from 'gatsby'
import Moment from 'react-moment'
import ReactPlayer from 'react-player'

import { Layout } from '../../components'

import styles from './video.module.scss'

export default ({
  data: {
    markdownRemark: {
      frontmatter: {
        date,
        title,
        summary,
        video
      },
      html
    }
  },
  location
}) => (
  <Layout title={title} location={location}>
    <article className={styles.articleContainer}>
      <div className={styles.hero}>
        <div className={styles.text}>
          <p className={styles.date}>
            <span>Posted&nbsp;
              <Moment date={date} format='MM/DD' />
            </span>
          </p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.excerpt}>{summary}</p>
        </div>
      </div>
      <section className={styles.article}>
        <div className={styles.container}>
          <ReactPlayer style={{ objectFit: 'contain' }} wrapper={styles.videoContainer} className={styles.reactPlayer} url={video} width='100%' height='100%' />
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    </article>
  </Layout>
)

export const pageQuery = graphql`
query ($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    fields {
      slug
    }
    frontmatter {
      title
      date
      summary
      video
    }
    html
  }
}
`
