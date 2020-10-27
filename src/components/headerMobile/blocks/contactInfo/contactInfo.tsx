import React from 'react'

import styles from './contactInfo.module.scss'

export default ({ contactInfo }) => (
  <section className={styles.default}>
    <div className={styles.redBar} />
    <div className={styles.contactInfo}>
      {contactInfo.phoneNumber && (
        <a className={styles.phoneNumber} href={`tel:+1${contactInfo.phoneNumber}`}>
          {`+1.${contactInfo.phoneNumber.substr(0, 3)}.${contactInfo.phoneNumber.substr(3, 3)}.${contactInfo.phoneNumber.substr(6, 4)}`}
        </a>
      )}
      {contactInfo.email && (
        <a className={styles.email} href={'mailto:' + contactInfo.email}>{contactInfo.email}</a>
      )}
      {contactInfo.address && (
        <p className={styles.address} dangerouslySetInnerHTML={{ __html: contactInfo.address.split('\n').join('<br />') }} />
      )}
    </div>
  </section>
)
