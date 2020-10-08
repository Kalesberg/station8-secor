import React, { useContext } from 'react'

import { Context } from '../../../context/context'

import styles from './quote.module.scss'

export default () => {
  const appContext = useContext(Context)
  console.log(appContext && appContext.quote)
  return appContext && (
    <section className={styles.section}>
      <div className={styles.customerInfo}>
        <p className={styles.label}>Customer Info</p>
      </div>
      <div className={styles.productsTable}>
        <p className={styles.label}>Quote builder</p>
        <div className={styles.labels}>
          <p>Product</p>
          <p>Specifications</p>
        </div>
        <div className={styles.products}>
          {appContext.quote.map((product, i) => {
            return (
              <div className={styles.product} key={i}>
                <div key={i} className={styles.productDetails}>
                  <div className={styles.productImage} />
                  <div className={styles.productDescription}>
                    <p className={styles.productName}>{product.name}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
