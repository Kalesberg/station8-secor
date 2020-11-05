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
  const context = useContext(Context)
  const [quantity, setQuantity] = useState(1)
  const [options, setOptions] = useState({})
  const [tag, setTag] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [showMessage, setShowMessage] = useState(false)

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
      const newQuote = [...context.quote]
      newQuote.push({
        id: product.id,
        recordId: product.recordId,
        name: product.name,
        image: product.images && product.images.length && product.images[0],
        options,
        notes: '',
        path: product.path,
        quantity
      })
      context.setQuote(newQuote)
      initOptions()
      setShowMessage(true)
    }
  }

  const handleSetOptions = e => {
    setOptions({
      ...options,
      [camelcase(e.target.name)]: e.target.value
    })
  }
  const handleQuantity = e => setQuantity(e.target.value)
  console.log(product)

  return context && (
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
              {product.documents && product.documents.length && (
                <div className={styles.pdfContainer}>
                  <Link className={styles.pdf} to={product.documents[0]}>PDF</Link>
                </div>
              )}
              <div className={styles.options}>
                {product.options && product.options.length ? product.options.map((option, i) => (
                  <div key={i} className={styles.option}>
                    <label className={styles.label} htmlFor={camelcase(option.name)}>{option.label}</label>
                    {option.type === 'Text' ? (
                      <input type='text' className={styles.input} name={camelcase(option.name)} onChange={handleSetOptions} value={options[camelcase(option.name)]} required />
                    ) : option.type === 'Select' ? (
                      <select className={styles.select} name={camelcase(option.name)} onChange={handleSetOptions} value={options[camelcase(option.name)]} required>
                        {option.choices.map((choice, key) => <option className={styles.selectOption} key={key}>{choice}</option>)}
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
              <button className={styles.mobileButton} type='submit' onClick={handleAddToQuote}>
                <svg className={styles.add} viewBox='0 0 500 500' fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit={2}>
                  <path d='M250 0c137.979 0 250 112.021 250 250 0 137.979-112.021 250-250 250C112.021 500 0 387.979 0 250 0 112.021 112.021 0 250 0zm0 33.333c119.582 0 216.667 97.085 216.667 216.667 0 119.582-97.085 216.667-216.667 216.667-119.582 0-216.667-97.085-216.667-216.667 0-119.582 97.085-216.667 216.667-216.667z' fill='#EBE5E5' />
                  <path fill='#d50f0a' d='M220.5 123.5h59v253h-59z' />
                  <path fill='#d50f0a' d='M376.5 220.5v59h-253v-59z' />
                </svg>
                Add to quote
              </button>
              {showMessage &&
                <p className={styles.success}>Added!<span className={styles.span}><Link className={styles.link} to='/get-a-quote'>Go to cart</Link></span></p>}
            </form>
          </div>
          <div className={styles.quoteBuilder}>
            <h2 className={styles.title}>Quote builder</h2>
            <div className={styles.quoteItems}>
              {context.quote.map((item, i) => {
                const updateQuantity = e => {
                  const updatedQuote = [...context.quote]
                  updatedQuote[i].quantity = e.target.value
                  context.setQuote(updatedQuote)
                }
                const removeItem = () => {
                  const updatedQuote = [...context.quote]
                  updatedQuote.splice(i, 1)
                  context.setQuote(updatedQuote)
                }
                return (
                  <div key={i} className={styles.quoteItem}>
                    <Link to={item.path}>
                      <div className={styles.image} style={{ background: `url(${item.image})` }} />
                    </Link>
                    <div className={styles.details}>
                      <Link to={item.path}>
                        <p className={styles.title}>{item.name}</p>
                      </Link>
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
              <Link className={styles.reviewOrderButton} to='/get-a-quote'>Review order</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
