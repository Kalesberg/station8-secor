import React from 'react'
import { Link } from 'gatsby'

import styles from './authenticated.module.scss'

export default ({ path, user }) => {
  console.log(path, user)
  return (
    <section className={styles.section}>
      <div className={styles.navigation}>
        <h1 className={styles.title}>{user.company}</h1>
        <div className={styles.tabs}>
          <Link className={styles.tab} activeClassName={styles.active} to='/account/quotes'><p className={styles.label}>Quotes</p><div className={styles.underline} /></Link>
          <Link className={styles.tab} activeClassName={styles.active} to='/account/forms'><p className={styles.label}>Forms</p><div className={styles.underline} /></Link>
          <Link className={styles.tab} activeClassName={styles.active} to='/account/info'><p className={styles.label}>Account info</p><div className={styles.underline} /></Link>
        </div>
      </div>
      <div className={styles.quotes}>
        {/*  */}
      </div>
      <div className={styles.forms}>
        {/*  */}
      </div>
      <div className={styles.info}>
        <div className={styles.column}>
          <h2 className={styles.sectionTitle}>Company</h2>
          <div className={styles.field}>
            <div className={styles.icon} />
            <p className={styles.value}>{user.company}</p>
            <label htmlFor='company' className={styles.label}>Edit</label>
          </div>
          <div className={styles.field}>
            <div className={styles.icon} />
            <p className={styles.value}>
              {user.address1 && (
                <>
                  <span>{user.address1}</span>
                  <br />
                </>
              )}
              {user.address2 && (
                <>
                  <span>{user.address2}</span>
                  <br />
                </>
              )}
              {user.city && <span>{user.city}, </span>}
              {user.state && <span>{user.state} </span>}
              {user.zipCode && <span>{user.zipCode}</span>}
            </p>
            <label htmlFor='company' className={styles.label} style={{ gridRow: 4 }}>Edit</label>
          </div>
        </div>
        <div className={styles.column}>
          <h2 className={styles.sectionTitle}>Contact</h2>
        </div>
        <div className={styles.column}>
          <h2 className={styles.sectionTitle}>Password</h2>
        </div>
      </div>
    </section>
  )
}
