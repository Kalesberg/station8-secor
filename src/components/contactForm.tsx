import React from 'react'
import { Button } from '../forestry-tools/shared'

import contactFormConfig from '../../.forestry/content/settings/contactForm.json'

import { contactFormStyles as styles } from '../styles/components'

import closeButton from '../../.forestry/content/images/close.svg'

export const ContactForm = ({ formOpen, toggleForm }) => (
  <section className={styles.default + `${formOpen ? ` ${styles.open}` : ''}`}>
    <div className={styles.closeArea} onClick={toggleForm} />
    <form className={styles.form + ' pageclip-form'} action={contactFormConfig.url} method='post'>
      <button className={styles.closeButton} onClick={toggleForm}><img alt='Close button' src={closeButton} /></button>
      <h1 className={styles.heading}>{contactFormConfig.heading}</h1>
      <h2 className={styles.subheading}>{contactFormConfig.subheading}</h2>
      <fieldset className={styles.nameSet}>
        <label htmlFor='name' className={styles.nameLabel}>{contactFormConfig.nameLabel}</label>
        <input id='name' name='name' className={styles.name} type='text' required />
      </fieldset>
      <fieldset className={styles.methodSet}>
        <label htmlFor='email' className={styles.methodLabel}>{contactFormConfig.phoneLabel}</label>
        <input id='email' type='email' name='email' className={styles.method} required />
      </fieldset>
      <fieldset className={styles.messageSet}>
        <label htmlFor='message' className={styles.messageLabel}>{contactFormConfig.messageLabel}</label>
        <textarea id='message' name='message' className={styles.message} rows={1} required />
      </fieldset>
      <Button text='Send' direction='right' styles={styles} className='pageclip-form__submit' type='submit' />
    </form>
  </section>
)
