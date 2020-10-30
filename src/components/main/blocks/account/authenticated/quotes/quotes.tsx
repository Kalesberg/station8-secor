import React, { useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import Moment from 'react-moment'
import queryString from 'query-string'
import camelcase from 'camelcase'

import styles from './quotes.module.scss'

export default ({ options, search, user, activeQuote, setActiveQuote, handleClearActiveQuote }) => {
  useEffect(() => {
    if (search) {
      const query = queryString.parse(search)
      if (query.id) {
        setActiveQuote(user.quotes.find(quote => quote.id.toString() === query.id.toString()))
      }
    }
  }, [search])

  return user.quotes.length ? (
    activeQuote ? (
      <div className={styles.quoteDetail}>
        <div className={styles.header}>
          <div className={styles.quoteInfo}>
            <div className={styles.back} onClick={handleClearActiveQuote} />
            <h1 className={styles.detail}>Quote: #{activeQuote.id}</h1>
            <h2 className={styles.timestamp}>Date: {activeQuote.timestamp && <Moment date={activeQuote.timestamp} format='MM/DD/YY' />}</h2>
          </div>
          <div className={styles.labels}>
            <p className={styles.label}>Product</p>
            <p className={styles.label}>Notes</p>
            <p className={styles.quantity}>Quantity</p>
            <p className={styles.qty}>QTY</p>
          </div>
        </div>
        {activeQuote.JSON.map(product => {
          console.log(product)
          return (
            <div key={product.id} className={styles.quote}>
              <>
                <div className={styles.products}>
                  <div className={styles.product}>
                    <div className={styles.productDetails}>
                      <div className={styles.productImage + `${!product.image ? ` ${styles.noImage}` : ''}`} style={{ backgroundImage: `url(${product.image})` }}>
                        {!product.image && 'No image'}
                      </div>
                      <div className={styles.productDescription}>
                        <Link to={product.path}>
                          <p className={styles.productName}>{product.name}</p>
                        </Link>
                        <div className={styles.options}>
                          {Object.keys(product.options).map((option, i) => {
                            const opt = options.find(opt => camelcase(opt.data.Name) === option)

                            return opt && (
                              <p key={i} className={styles.option}>
                                {`${opt.data.Label}: ${product.options[option]}`}
                              </p>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <div className={styles.specifications}>
                      <p className={styles.notes}>{product.notes}</p>
                    </div>
                    <div className={styles.quantityContainer}>
                      <p className={styles.quantity}>{product.quantity}</p>
                    </div>
                  </div>
                </div>
              </>
            </div>
          )
        })}
      </div>
    ) : (
      <div className={styles.quotes}>
        {user.quotes.map(quote => {
          const handleSetActiveQuote = () => {
            navigate(`/account/quotes?id=${quote.id}`)
          }
          return (
            <div key={quote.record} className={styles.quote} style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${quote.JSON[0].image})` }} onClick={handleSetActiveQuote}>
              {quote.timestamp && <h1><Moment date={quote.timestamp} format='MM/DD/YY' /></h1>}
              <p>#{quote.id}</p>
            </div>
          )
        })}
      </div>
    )
  ) : (
    <div className={styles.emptyQuotes}>
      <h1 className={styles.title}>No quotes submitted yet!</h1>
    </div>
  )
}
