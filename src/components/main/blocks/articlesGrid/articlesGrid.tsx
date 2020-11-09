import React, { useEffect, useState } from 'react'
import { navigate, Link } from 'gatsby'
import Moment from 'react-moment'
import queryString from 'query-string'

import { Image } from '../../../../functions'

import styles from './articlesGrid.module.scss'

export default ({ block, search, limit = undefined, slug = '', articles, root = '/news-and-resources' }) => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('All')
  const [userSearch, setUserSearch] = useState('')
  const [featuredArticle, setFeaturedArticle] = useState(undefined)

  useEffect(() => {
    const query = queryString.parse(search)
    query.category ? setCategory(query.category.toString()) : setCategory('All')
    query.search ? setUserSearch(query.search.toString()) : setUserSearch('')
  }, [search])

  useEffect(() => {
    if (block && block.featuredArticle && articles && articles.length) {
      setFeaturedArticle(articles.find(article => article.fileAbsolutePath.includes(block.featuredArticle)))
    }
  }, [block, articles])

  const handleSearch = e => {
    navigate(`${root}${slug ? '/' + slug : ''}${category !== 'All' || e.target.value ? '?' : ''}${category !== 'All' ? `category=${category}${e.target.value ? '&' : ''}` : ''}${e.target.value ? `search=${e.target.value}` : ''}`)
    setUserSearch(e.target.value)
  }

  useEffect(() => {
    const categories = []
    articles.forEach(article => article.frontmatter.tags.forEach(articleTag => categories.push(articleTag.toLowerCase())))
    categories.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)
    setCategories(['all', 'forms', ...new Set(categories)])
  }, [articles])

  useEffect(() => {
    const query = queryString.parse(search)
    query.category ? setCategory(query.category.toString()) : setCategory('All')
    query.search ? setUserSearch(query.search.toString()) : setUserSearch('')
  }, [search])

  return (
    <section className={styles.section}>
      {featuredArticle && (
        <Image className={styles.featured} src={featuredArticle.frontmatter.heroImage.relativePath} container='div'>
          <Link to={featuredArticle.path} className={styles.text}>
            <p className={styles.date}>
              <span>Posted&nbsp;
                <Moment date={featuredArticle.frontmatter.date} format='MM/DD' />
              </span>
            </p>
            <h1 className={styles.title}>{featuredArticle.frontmatter.title}</h1>
            <p className={styles.excerpt}>{featuredArticle.frontmatter.summary}</p>
          </Link>
        </Image>
      )}
      <div className={styles.index}>
        <div className={styles.header}>
          <div className={styles.categories}>
            {categories.map((categoryItem, i) => {
              return (
                <React.Fragment key={i}>
                  {i ? <span className={styles.divider}> | </span> : null}
                  <Link to={`${slug}${slug ? '/' + slug : ''}${categoryItem.toString() === 'all' ? '' : `?category=${categoryItem}`}`} className={styles.category} activeClassName={styles.active}>{categoryItem}</Link>
                </React.Fragment>
              )
            })}
          </div>
          <div className={styles.search}>
            <input className={styles.input} type='text' name='search' id='search' value={userSearch} onChange={handleSearch} />
          </div>
        </div>
        <div className={styles.articles}>
          {articles
            .filter(article => category === 'all' ? true : article.frontmatter.tags.find(articleCategory => articleCategory.toLowerCase() === category.toLowerCase()))
            .filter(article => !userSearch ? true : article.frontmatter.title.toLowerCase().replace(/\W/g, '').includes(userSearch.toLowerCase().replace(/\W/g, '')) || article.frontmatter.summary.toLowerCase().replace(/\W/g, '').includes(userSearch.toLowerCase().replace(/\W/g, '')) || article.html.toLowerCase().replace(/\W/g, '').includes(userSearch.toLowerCase().replace(/\W/g, '')))
            .slice(0, limit)
            .map(article => {
              console.log('article', article.html)
              return (
                <div key={article.path} className={styles.article}>
                  <Link to={article.path}>
                    <Image className={styles.image} src={article.frontmatter.heroImage.relativePath} container='div' />
                  </Link>
                  <Link to={article.path}>
                    <div className={styles.articleDetail}>
                      <h3 className={styles.date}>
                        {article.frontmatter.date && (
                          <>
                            <span>Posted </span>
                            <Moment date={article.frontmatter.date} format='MM/DD' />
                          </>
                        )}
                      </h3>
                      <h2 className={styles.title}>{article.frontmatter.title}</h2>
                      <p className={styles.excerpt}>{article.frontmatter.summary}</p>
                    </div>
                  </Link>
                </div>
              )
            }
            )}
        </div>
      </div>
    </section>
  )
}
