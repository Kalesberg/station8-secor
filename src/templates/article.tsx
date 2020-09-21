import React, { useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import { Image } from '../forestry-tools'
import Moment from 'react-moment'
import queryString from 'query-string'

import { Layout } from '../components'
import { ArticlesGrid } from '../forestry-tools/main'

import { article as styles, articleIndex as articleIndexStyles } from '../styles/templates'

const Article = ({
  pageContext: { images, pages, authors, articles },
  data: {
    markdownRemark: {
      frontmatter: {
        date,
        heroImage,
        title,
        tags
      },
      html
    }
  },
  location: { search }
}) => {
  const [tag, setTag] = useState('')
  const [formOpen, setFormOpen] = useState(false)

  const toggleForm = e => {
    e.preventDefault()
    setFormOpen(!formOpen)
  }

  useEffect(() => {
    const tag = queryString.parse(search)
    tag.tag ? setTag(tag.tag.toString()) : setTag('')
  }, [search])

  return (
    <Layout title={title} pages={pages} images={images} formOpen={formOpen} toggleForm={toggleForm}>
      <article className={styles.articleContainer}>
        <Image src={heroImage.relativePath} className={styles.hero} images={images} container='div'>
          <h1 className={styles.title}>{title}</h1>
        </Image>
        <section className={styles.article}>
          <Link className={styles.back} to='/press' />
          <div className={styles.container}>
            <div className={styles.body} dangerouslySetInnerHTML={{ __html: html }} />
            <p className={styles.info}>
              {date && <span className={styles.date}><Moment date={date} format='MM/DD/YY' /></span>}
              <span className={styles.divider}> // </span>
              <span className={styles.authors}>
                by {authors.map((author, i) => {
                  const name = author.firstName && author.lastName ? author.firstName + ' ' + author.lastName : author.firstName + author.lastName
                  return (
                    i > 0 ? (
                      <React.Fragment key={i}>
                        <span className={styles.comma}>, </span>
                        <span key={i} className={styles.author}>{name}</span>
                      </React.Fragment>
                    ) : (
                      <span key={i} className={styles.author}>{name}</span>
                    )
                  )
                })}
              </span>
            </p>
            <p className={styles.tags}>
              <span className={styles.in}>in </span>
              {tags.map((tag, i) => (
                i > 0 ? (
                  <React.Fragment key={i}>
                    <span className={styles.separator}> / </span>
                    <Link to={`/press?tag=${tag}`} className={styles.link}>
                      <span className={styles.tag}>{tag}</span>
                    </Link>
                  </React.Fragment>
                ) : (
                  <Link key={i} to={`/press?tag=${tag}`} className={styles.link}>
                    <span key={i} className={styles.tag}>{tag}</span>
                  </Link>
                )
              ))}
            </p>
          </div>
          <div className={styles.fillSpace} />
        </section>
        <ArticlesGrid block={{}} styles={articleIndexStyles} images={images} pages={pages} articles={articles} tag={tag} limit={5} />
      </article>
    </Layout>
  )
}

export default Article

export const pageQuery = graphql`
query ($slug: String!) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    frontmatter {
      parent
      title
      date
      authors
      heroImage {
        relativePath
      }
      tags
    }
    html
  }
}
`
