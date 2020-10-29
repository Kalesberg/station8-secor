import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'

import Info from './info/info'
import Forms from './forms/forms'
import Quotes from './quotes/quotes'

import styles from './authenticated.module.scss'

export default ({ path, user, options, search }) => {
  const [activeQuote, setActiveQuote] = useState(undefined)
  const handleClearActiveQuote = () => {
    navigate('/account/quotes')
    setActiveQuote(undefined)
  }

  return (
    <section className={styles.section}>
      <div className={styles.navigation}>
        <h1 className={styles.title}>{user.company}</h1>
        <div className={styles.tabs}>
          <Link className={styles.tab} activeClassName={styles.active} to='/account/quotes' onClick={handleClearActiveQuote}><p className={styles.label}>Quotes</p><div className={styles.underline} /></Link>
          <Link className={styles.tab} activeClassName={styles.active} to='/account/forms'><p className={styles.label}>Forms</p><div className={styles.underline} /></Link>
          <Link className={styles.tab} activeClassName={styles.active} to='/account/info'><p className={styles.label}>Account info</p><div className={styles.underline} /></Link>
        </div>
      </div>
      {path === 'info' && <Info user={user} />}
      {path === 'quotes' && <Quotes options={options} user={user} search={search} activeQuote={activeQuote} setActiveQuote={setActiveQuote} handleClearActiveQuote={handleClearActiveQuote} />}
      {path === 'forms' && <Forms />}
    </section>
  )
}
