import React from 'react'
import { graphql, Link } from 'gatsby'
import Moment from 'react-moment'

import { Image } from '../../functions'

import { Layout } from '../../components'
import { ArticlesGrid } from '../../components/main/blocks'

import styles from './article.module.scss'

export default ({
  pageContext: { pages, articles, menu, slug },
  data: {
    markdownRemark: {
      frontmatter: {
        date,
        heroImage,
        title,
        summary
      },
      html
    }
  },
  location
}) => (
  <Layout title={title} pages={pages} menu={menu} location={location}>
    <article className={styles.articleContainer}>
      <Image src={heroImage.relativePath} className={styles.hero} container='div'>
        <div className={styles.text}>
          <p className={styles.date}>
            <span>Posted&nbsp;
              <Moment date={date} format='MM/DD' />
            </span>
          </p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.excerpt}>{summary}</p>
        </div>
      </Image>
      <section className={styles.article}>
        <Link className={styles.back} to='/press' />
        <div className={styles.container}>
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <div className={styles.fillSpace} />
      </section>
      <ArticlesGrid block={{}} articles={articles} limit={3} root={`/news-and-resources/${slug}`} search={location.search} />
    </article>
  </Layout>
)

export const pageQuery = graphql`
query ($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    frontmatter {
      parent
      title
      date
      heroImage {
        relativePath
      }
      summary
      tags
    }
    html
  }
}
`
