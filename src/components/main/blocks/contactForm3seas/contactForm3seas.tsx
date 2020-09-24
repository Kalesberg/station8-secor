import React from 'react'

import { classNames } from '../../../../functions'

import styles from './contactForm3seas.module.scss'

export default ({ block }) => {
  return (
    <section className={classNames(block, styles)}>
      <div className={styles.contactForm}>
        {block.title && <h2 className={styles.title}>{block.title}</h2>}
        {block.subtitle && <h3 className={styles.subtitle}>{block.subtitle}</h3>}
        <form className={styles.form + ' pageclip-form'} action={block.action} method='post'>
          <fieldset className={styles.inputFieldset}>
            <label className={styles.nameLabel}>{block.nameLabel}:</label>
            <input className={styles.name} type='text' name='name' id='name' />
          </fieldset>
          <fieldset className={styles.inputFieldset}>
            <label className={styles.methodLabel}>{block.methodLabel}:</label>
            <div className={styles.methodContainer}>
              <div className={styles.methodDropdown} />
              <input className={styles.method} type='text' name='method' id='method' />
            </div>
          </fieldset>
          <fieldset className={styles.checkboxFieldset}>
            <input type='checkbox' name='termsAndConditionsLabel' id='termsAndConditionsLabel' />
            <label htmlFor='termsAndConditionsLabel'>{block.termsAndConditionsLabel}</label>
          </fieldset>
          <button type='submit' className={styles.button + ' pageclip-form__submit'}>{block.buttonLabel}</button>
        </form>
      </div>
    </section>
  )
}
