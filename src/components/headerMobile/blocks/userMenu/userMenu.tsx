import React, { useContext } from 'react'

import { Context } from '../../../context/context'
import LoggedIn from './loggedIn/loggedIn'
import LoggedOut from './loggedOut/loggedOut'
import { Image } from '../../../../functions'

import styles from './userMenu.module.scss'

export default ({ block, images, userMenuOpen, setUserMenuOpen, location }) => {
  const pathMatch = location.pathname.split('/').filter(i => i)[0] === 'account'

  const context = useContext(Context)
  const handleOpenUserMenu = () => setUserMenuOpen(true)

  return context && (
    <div className={styles.container + `${pathMatch ? ` ${styles.active}` : ''}`} onMouseOver={handleOpenUserMenu}>
      <Image className={styles.icon} src={block.icon} images={images} />
      <span className={styles.underline} />
      <div className={styles.userMenu + `${userMenuOpen ? ` ${styles.open}` : ''}` + `${context && !context.user ? ` ${styles.loggedOut}` : ` ${styles.loggedIn}`}`}>
        {context.user ? <LoggedIn /> : <LoggedOut />}
      </div>
    </div>
  )
}
