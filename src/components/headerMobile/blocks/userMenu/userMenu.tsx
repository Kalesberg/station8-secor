import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { Context } from '../../../context/context'
import LoggedIn from './loggedIn/loggedIn'
import LoggedOut from './loggedOut/loggedOut'
import { Image } from '../../../../functions'

import styles from './userMenu.module.scss'

export default ({ block, userMenuOpen, setUserMenuOpen, location }) => {
  const pathMatch = location.pathname.split('/').filter(i => i)[0] === 'account'
  const [width, setWidth] = useState(window.innerWidth)
  const context = useContext(Context)
  const handleOpenUserMenu = () => setUserMenuOpen(true)

  const sizeCheck = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', sizeCheck)
    return () => {
      window.removeEventListener('resize', sizeCheck)
    }
  })

  return context && (
    <div className={styles.container + `${pathMatch ? ` ${styles.active}` : ''}`} onMouseOver={handleOpenUserMenu}>
      <Link to='/account' className={styles.link}>
        <Image className={styles.icon} src={block.icon} />
      </Link>
      <span className={styles.underline} />
      <div className={styles.userMenu + `${userMenuOpen && width > 600 ? ` ${styles.open}` : ''}` + `${context && !context.user ? ` ${styles.loggedOut}` : ` ${styles.loggedIn}`}`}>
        {context.user ? <LoggedIn /> : <LoggedOut />}
      </div>
    </div>
  )
}
