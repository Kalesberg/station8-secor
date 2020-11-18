import React, { useEffect, useState } from 'react'
import { graphql, Link, navigate, useStaticQuery } from 'gatsby'
import Moment from 'react-moment'
import queryString from 'query-string'

import { Image } from '../../../../functions'

import styles from './articlesGrid.module.scss'

export default ({ block, location: { search, pathname }, limit = undefined, slug = '', root = '/news-and-resources', menu = true }) => {
  const { allMarkdownRemark: { nodes: posts } } = useStaticQuery(graphql`{
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {date: {ne: null}}}) {
      nodes {
        fileAbsolutePath
        frontmatter {
          type
          title
          summary
          date
          video
          heroImage {
            publicURL
          }
        }
        fields {
          url
        }
        html
      }
    }
  }`)

  const [category, setCategory] = useState('All')
  const [userSearch, setUserSearch] = useState('')
  const [featuredArticle, setFeaturedArticle] = useState(undefined)
  const [items, setItems] = useState([])

  useEffect(() => {
    const category = pathname.charAt(pathname.length - 1) === '/' ? pathname.substr(1, pathname.length - 2) : pathname.slice(1)
    setCategory(category.split('/')[1])
  }, [pathname])

  useEffect(() => {
    if (category) {
      const type = category === 'blog' ? 'article' : category === 'forms' ? 'form' : category === 'videos' ? 'video' : category
      setItems(posts.filter(post => post.frontmatter.type === type))
    } else {
      setItems(posts)
    }
  }, [category])

  useEffect(() => {
    if (category && search) {

    } else if (category) {

    } else if (search) {

    }
  }, [search, category])

  useEffect(() => {
    if (search) {
      const query = queryString.parse(search)
      query.search ? setUserSearch(query.search.toString()) : setUserSearch('')
      console.log(query.search.toString())
      if (category) {
        const type = category === 'blog' ? 'article' : category === 'forms' ? 'form' : category === 'videos' ? 'video' : category
        setItems(posts.filter(post => post.frontmatter.type === type).filter(post => post.frontmatter.title.toLowerCase().includes(query.search.toString()) || post.frontmatter.summary.toLowerCase().includes(query.search.toString()) || post.html.toLowerCase().includes(query.search.toString())))
      } else {
        setItems(posts.filter(post => post.frontmatter.title.toLowerCase().includes(query.search.toString()) || post.frontmatter.summary.toLowerCase().includes(query.search.toString()) || post.html.toLowerCase().includes(query.search.toString())))
      }
    } else {
      setUserSearch('')
    }
  }, [search])

  useEffect(() => {
    if (block && block.featuredArticle && posts && posts.length) {
      setFeaturedArticle(posts.find(article => article.fileAbsolutePath.includes(block.featuredArticle)))
    }
  }, [block, posts])

  const handleSearch = e => {
    navigate(`${pathname}${e.target.value ? `?search=${encodeURI(e.target.value)}` : ''}`)
  }

  return (
    <section className={styles.section}>
      {featuredArticle && (
        <div className={styles.featured} style={{ backgroundImage: `url(${featuredArticle.frontmatter.heroImage.publicURL})` }}>
          <Link to={featuredArticle.fields.url} className={styles.text}>
            <p className={styles.date}>
              <span>Posted&nbsp;
                <Moment date={featuredArticle.frontmatter.date} format='MM/DD' />
              </span>
            </p>
            <h1 className={styles.title}>{featuredArticle.frontmatter.title}</h1>
            <p className={styles.excerpt}>{featuredArticle.frontmatter.summary}</p>
          </Link>
        </div>
      )}
      <div className={styles.index}>
        {menu && (
          <div className={styles.header}>
            <div className={styles.categories}>
              {['all', 'blog', 'forms', 'videos'].map((categoryItem, i) => {
                return (
                  <React.Fragment key={i}>
                    {i ? <span className={styles.divider}> | </span> : null}
                    <Link className={styles.category} activeClassName={styles.active} to={`/news-and-resources${categoryItem !== 'all' ? '/' + categoryItem : ''}`}>{categoryItem}</Link>
                  </React.Fragment>
                )
              })}
            </div>
            <div className={styles.search}>
              <input className={styles.input} type='text' name='search' id='search' value={userSearch} onChange={handleSearch} />
            </div>
          </div>
        )}
        <div className={styles.articles}>
          {items.slice(0, limit).map(item => {
            return item.frontmatter.type === 'article' ? (
              <div key={item.fields.url} className={styles.article}>
                <Link to={item.fields.url}>
                  <Image className={styles.image} src={item.frontmatter.heroImage.publicURL} container='div' />
                </Link>
                <Link to={item.fields.url}>
                  <div className={styles.articleDetail}>
                    <h3 className={styles.date}>
                      {item.frontmatter.date && (
                        <>
                          <span>Posted </span>
                          <Moment date={item.frontmatter.date} format='MM/DD' />
                        </>
                      )}
                    </h3>
                    <h2 className={styles.title}>{item.frontmatter.title}</h2>
                    <p className={styles.excerpt}>{item.frontmatter.summary}</p>
                  </div>
                </Link>
              </div>
            ) : item.frontmatter.type === 'form' ? (
              <div key={item.fields.url} className={styles.article}>
                <Link to={item.fields.url}>
                  <Image className={styles.image} src={item.frontmatter.heroImage.publicURL} container='div' gradient='linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))' />
                </Link>
                <Link to={item.fields.url}>
                  <div className={styles.articleDetail}>
                    <h3 className={styles.date}>
                      {item.frontmatter.date && (
                        <>
                          <span>Posted </span>
                          <Moment date={item.frontmatter.date} format='MM/DD' />
                        </>
                      )}
                    </h3>
                    <h2 className={styles.title}>{item.frontmatter.title}</h2>
                    <p className={styles.excerpt}>{item.frontmatter.summary}</p>
                  </div>
                </Link>
              </div>
            ) : item.frontmatter.type === 'video' ? (
              <div key={item.fields.url} className={styles.article}>
                <Link to={item.fields.url}>
                  <div className={styles.image + ' ' + styles.video} style={{ backgroundImage: `url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+CiAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI0OTgxLDAsMCwxLjI2NjA5LDM1LjAwMjMsMzQuODA2OSkiPgogICAgICAgIDxwYXRoIGQ9Ik01LDNMMTksMTJMNSwyMUw1LDNaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLW9wYWNpdHk6MC43O2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgICAgIDxwYXRoIGQ9Ik02LjA5OSwxLjMzNUM1LjQ4LDAuOTM3IDQuNjksMC45MDYgNC4wNDEsMS4yNTNDMy4zOTEsMS42IDIuOTg3LDIuMjcxIDIuOTg3LDNMMi45ODcsMjFDMi45ODcsMjEuNzI5IDMuMzkxLDIyLjQgNC4wNDEsMjIuNzQ3QzQuNjksMjMuMDk0IDUuNDgsMjMuMDYzIDYuMDk5LDIyLjY2NUwyMC4wOTksMTMuNjY1QzIwLjY2OSwxMy4yOTggMjEuMDEzLDEyLjY3MiAyMS4wMTMsMTJDMjEuMDEzLDExLjMyOCAyMC42NjksMTAuNzAyIDIwLjA5OSwxMC4zMzVMNi4wOTksMS4zMzVaTTUsM0wxOSwxMkw1LDIxTDUsM1oiIHN0eWxlPSJmaWxsOndoaXRlO2ZpbGwtb3BhY2l0eTowLjc7Ii8+CiAgICA8L2c+Cjwvc3ZnPgo="), url(${item.frontmatter.video.replace('https://youtu.be/', 'https://i.ytimg.com/vi/') + '/hqdefault.jpg'})` }} />
                </Link>
                <Link to={item.fields.url}>
                  <div className={styles.articleDetail}>
                    <h3 className={styles.date}>
                      {item.frontmatter.date && (
                        <>
                          <span>Posted </span>
                          <Moment date={item.frontmatter.date} format='MM/DD' />
                        </>
                      )}
                    </h3>
                    <h2 className={styles.title}>{item.frontmatter.title}</h2>
                    <p className={styles.excerpt}>{item.frontmatter.summary}</p>
                  </div>
                </Link>
              </div>
            ) : null
          })}
        </div>
      </div>
    </section>
  )
}
