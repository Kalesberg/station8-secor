import React from 'react'
import { Link } from 'gatsby'

import { classNames, Image } from '../exports'
import { Button } from '../shared'

export const FeaturedArticles = ({ block, styles, articles, pages, images }) => {
  const getPage = filePath => pages.find(page => filePath.includes(page.relativePath))
  const featured = block.articles.map(filename => {
    const article = articles.find(article => article.fileAbsolutePath.includes(filename))
    const page = getPage(article.frontmatter.parent)
    return ({
      title: article.frontmatter.title,
      excerpt: article.excerpt,
      image: article.frontmatter.heroImage.relativePath,
      path: page.filePath + '/' + article.fields.slug
    })
  })
  const scrollDown = () => {
    document.getElementById('main').scroll({
      left: 0,
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className={classNames(block, styles)}>
      <h1 className={styles.title}>{block.title}</h1>
      <h1 className={styles.mobileTitle}>{block.mobileTitle}</h1>
      <div className={styles.sidebar}>
        <div className={styles.text}>
          <h2 className={styles.subtitle}>{block.subtitle}</h2>
          <p className={styles.body}>{block.body}</p>
        </div>
        <Button onClick={scrollDown} styles={styles} text={block.button.label} direction={block.button.direction} />
      </div>
      <div className={styles.articles}>
        {featured.map((article, i) => {
          return (
            <Link key={i} to={article.path} className={styles.link}>
              <Image images={images} className={styles.article} container='div' src={article.image}>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <div className={styles.overlay} />
              </Image>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
