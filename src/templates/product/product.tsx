import React, { useContext, useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import queryString from 'query-string'
import marked from 'marked'
import parse from 'html-react-parser'
import camelcase from 'camelcase'

import { Context } from '../../components/context/context'
import Layout from '../../components/layout/layout'
import styles from './product.module.scss'

export default ({ location, pageContext: { menu, product, title, images, articles, pages, options: allOptions } }) => {
  console.log(allOptions)
  const { quote, setQuote } = useContext(Context)
  const [quantity, setQuantity] = useState(1)
  const [options, setOptions] = useState({})
  const [tag, setTag] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const toggleForm = e => {
    e.preventDefault()
    setFormOpen(!formOpen)
  }

  const initOptions = () => {
    const options = {}
    product.options.map(option => {
      if (option.type === 'Text') {
        options[camelcase(option.name)] = ''
      } else if (option.type === 'Toggle') {
        options[camelcase(option.name)] = false
      } else if (option.type === 'Select' && option.choices && option.choices.length) {
        options[camelcase(option.name)] = option.choices[0]
      }
    })
    setOptions(options)
  }

  useEffect(() => {
    initOptions()
  }, [product])

  useEffect(() => {
    const tag = queryString.parse(location.search)
    tag.tag ? setTag(tag.tag.toString()) : setTag('')
  }, [location])

  useEffect(() => {
    console.log('options', options)
  }, [options])

  const handleGoBack = () => navigate(location.pathname.split('/').slice(0, -1).join('/'))

  const handleAddToQuote = e => {
    if (Object.entries(options).every(option => !!option[1]) && quantity) {
      e.preventDefault()
      const newQuote = [...quote]
      newQuote.push({
        id: product.id,
        recordId: product.recordId,
        name: product.name,
        image: product.images && product.images.length && product.images[0],
        options,
        quantity
      })
      setQuote(newQuote)
      initOptions()
    }
  }

  const handleSetOptions = e => {
    setOptions({
      ...options,
      [camelcase(e.target.name)]: e.target.value
    })
  }
  const handleQuantity = e => setQuantity(e.target.value)

  return (
    <Layout title={title} pages={pages} images={images} toggleForm={toggleForm} blocks={[]} articles={articles} tag={tag} menu={menu} location={location}>
      <section className={styles.section}>
        <aside className={styles.aside}>
          <div className={styles.back} onClick={handleGoBack} />
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
            <form className={styles.details}>
              {product.name && <p className={styles.name}>{product.name}</p>}
              {product.description && <div className={styles.description}>{parse(marked(product.description))}</div>}
              <div className={styles.options}>
                {product.options && product.options.length ? product.options.map((option, i) => (
                  <div key={i} className={styles.option}>
                    <label className={styles.label} htmlFor={camelcase(option.name)}>{option.label}</label>
                    {option.type === 'Text' ? (
                      <input type='text' className={styles.input} name={camelcase(option.name)} onChange={handleSetOptions} value={options[camelcase(option.name)]} required />
                    ) : option.type === 'Select' ? (
                      <select name={camelcase(option.name)} onChange={handleSetOptions} value={options[camelcase(option.name)]} required>
                        {option.choices.map((choice, key) => <option key={key}>{choice}</option>)}
                      </select>
                    ) : option.type === 'Toggle' ? (
                      <input className={styles.input} type='checkbox' name={camelcase(option.name)} value={options[camelcase(option.name)]} onChange={handleSetOptions} required />
                    ) : null}
                  </div>
                )) : null}
                <div className={styles.option}>
                  <label className={styles.label} htmlFor='quantity'>QTY</label>
                  <input className={styles.input} name='quantity' type='number' value={quantity} required min='1' onChange={handleQuantity} />
                </div>
              </div>
              <button className={styles.addToQuote} type='submit' onClick={handleAddToQuote}>
                <div className={styles.plus}>+</div>
                <div className={styles.text}>Add to quote</div>
                <div className={styles.fill} />
              </button>
            </form>
          </div>
          <div className={styles.quoteBuilder}>
            <h2 className={styles.title}>Quote builder</h2>
            <div className={styles.quoteItems}>
              {quote.map((item, i) => {
                const updateQuantity = e => {
                  const updatedQuote = [...quote]
                  updatedQuote[i].quantity = e.target.value
                  setQuote(updatedQuote)
                }
                const removeItem = () => {
                  const updatedQuote = [...quote]
                  updatedQuote.splice(i, 1)
                  setQuote(updatedQuote)
                }
                return (
                  <div key={i} className={styles.quoteItem}>
                    <div className={styles.image} style={{ background: `url(${item.image})` }} />
                    <div className={styles.details}>
                      <p className={styles.title}>{item.name}</p>
                      {Object.entries(item.options).map((option, i) => {
                        const optionLabel = allOptions.find(allOption => camelcase(allOption.data.Name) === option[0]).data.Label
                        return (
                          <p key={i} className={styles.specs}>{optionLabel}: {option[1]}</p>
                        )
                      })}

                      <div className={styles.modify}>
                        <p className={styles.label}>QTY:</p>
                        <input type='number' min='1' value={item.quantity} onChange={updateQuantity} className={styles.quantity} />
                      </div>
                    </div>
                    <div className={styles.remove} onClick={removeItem} />
                  </div>
                )
              })}
              <Link className={styles.quoteItem} to='/products'>
                <div className={styles.image + ' ' + styles.pad} />
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
