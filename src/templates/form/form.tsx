import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Moment from 'react-moment'

import { Image } from '../../functions'

import { Layout } from '../../components'
import { ArticlesGrid } from '../../components/main/blocks'

import styles from './form.module.scss'

export default ({
  pageContext: { images, pages, articles, menu, slug },
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
}) => {
  const [formOpen, setFormOpen] = useState(false)

  const toggleForm = e => {
    e.preventDefault()
    setFormOpen(!formOpen)
  }

  return (
    <Layout title={title} pages={pages} images={images} toggleForm={toggleForm} menu={menu} location={location}>
      <article className={styles.articleContainer}>
        <Image src={heroImage.relativePath} className={styles.hero} images={images} container='div'>
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
            {/* <p className={styles.info}>
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
            </p> */}
            {/* <p className={styles.tags}>
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
            </p> */}
          </div>
          <div className={styles.fillSpace} />
        </section>
        <ArticlesGrid block={{}} images={images} articles={articles} limit={3} root={`/news-and-resources/${slug}`} search={location.search} />
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
    }
  }
}
`
