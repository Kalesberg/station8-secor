import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import queryString from 'query-string'
import marked from 'marked'
import parse from 'html-react-parser'

import Layout from '../../components/layout/layout'
import styles from './product.module.scss'

export default ({ location, pageContext: { menu, product, title, images, articles, pages } }) => {
  console.log(product)
  const [tag, setTag] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const toggleForm = e => {
    e.preventDefault()
    setFormOpen(!formOpen)
  }

  useEffect(() => {
    const tag = queryString.parse(location.search)
    tag.tag ? setTag(tag.tag.toString()) : setTag('')
  }, [location])

  return (
    <Layout title={title} pages={pages} images={images} toggleForm={toggleForm} blocks={[]} articles={articles} tag={tag} menu={menu} location={location}>
      <section className={styles.section}>
        <aside className={styles.aside}>
          {/*  */}
        </aside>
        <div className={styles.content}>
          <div className={styles.product}>
            <div className={styles.images}>
              {product.images && product.images.length ? (
                <div className={styles.selectedImage} style={{ backgroundImage: `url(${product.images[activeImage]})` }} />
              ) : (
                <div className={styles.selectedImage}>
                  No image
                </div>
              )}
              {product.images && product.images.length > 0 ? (
                <div className={styles.otherImages}>
                  {product.images.map((image, i) => {
                    const handleSetActiveImage = () => setActiveImage(i)
                    return (
                      <div onClick={handleSetActiveImage} key={image} className={styles.otherImage + `${i === activeImage ? ` ${styles.active}` : ''}`} style={{ backgroundImage: `url(${image})` }} />
                    )
                  })}
                </div>
              ) : null}
            </div>
            <div className={styles.details}>
              {product.name && <p className={styles.name}>{product.name}</p>}
              {product.description && <div className={styles.description}>{parse(marked(product.description))}</div>}
            </div>
          </div>
          <div className={styles.quoteBuilder}>
            <h2 className={styles.title}>Quote builder</h2>
            <div className={styles.quoteItems}>
              <div className={styles.quoteItem}>
                <div className={styles.image} />
                <div className={styles.details}>
                  <p className={styles.title}>Sample Item</p>
                  <p className={styles.specs}>SDR: 7,9,11,17</p>
                </div>
              </div>
              <div className={styles.quoteItem}>
                <div className={styles.image} />
                <div className={styles.details}>
                  <p className={styles.title}>Sample Item</p>
                  <p className={styles.specs}>SDR: 7,9,11,17</p>
                </div>
              </div>
              <Link className={styles.quoteItem} to='/products'>
                <svg className={styles.image + ' ' + styles.pad} viewBox='0 0 500 500' fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit={2}>
                  <path d='M250 0c137.979 0 250 112.021 250 250 0 137.979-112.021 250-250 250C112.021 500 0 387.979 0 250 0 112.021 112.021 0 250 0zm0 33.333c119.582 0 216.667 97.085 216.667 216.667 0 119.582-97.085 216.667-216.667 216.667-119.582 0-216.667-97.085-216.667-216.667 0-119.582 97.085-216.667 216.667-216.667z' fill='#212121' />
                  <path fill='#212121' d='M220.5 123.5h59v253h-59z' />
                  <path fill='#212121' d='M376.5 220.5v59h-253v-59z' />
                </svg>
                <div className={styles.details}>
                  <p className={styles.title}>Add more items</p>
                </div>
              </Link>
            </div>
            <div className={styles.reviewOrderButtonContainer}>
              <button className={styles.reviewOrderButton}>Review order</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
