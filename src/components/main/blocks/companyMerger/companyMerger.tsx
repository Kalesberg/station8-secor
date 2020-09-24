import React from 'react'

import { classNames, Image } from '../../../../functions'

import styles from './companyMerger.module.scss'

export default ({ block, images }) => {
  return (
    <section className={classNames(block, styles)}>
      <div className={styles.textContainer}>
        {block.heading && <h1 className={styles.heading}>{block.heading}</h1>}
        {block.body && <p className={styles.body}>{block.body}</p>}
      </div>
      <div className={styles.companies}>
        {block.companies.map((company, i) => {
          return (
            <React.Fragment key={i}>
              {i > 0 && <p className={styles.plusSymbol}>+</p>}
              <a href={company.link} className={styles.company} target='_blank' rel='noopener noreferrer'>
                <div className={styles.imageContainer}>
                  <Image className={styles.image} images={images} src={company.logo.image} title={company.logo.title} alt={company.logo.alt} container='div' style={{ backgroundSize: 'contain' }} />
                </div>
                {company.description && <p className={styles.description}>{company.description}</p>}
              </a>
            </React.Fragment>
          )
        })}
      </div>
    </section>
  )
}
