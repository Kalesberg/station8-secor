import React, { useContext, useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'

import { Context } from '../../../context/context'
import Register from './register/register'
import Login from './login/login'
import Recover from './recover/recover'

import styles from './account.module.scss'

export default ({ location }) => {
  const context = useContext(Context)
  const [path] = useState(location.pathname.split('/').filter(i => i))

  useEffect(() => {
    if (path && path.length && context && context.userFetched) {
      if (context.user && path.length < 2) {
        navigate('/account/info')
      } else if (!context.user && path.length < 2) {
        navigate('/account/login')
      } else if (context.user && path.length === 2) {
        if (path[1] === 'login' || path[1] === 'register' || path[1] === 'recover') {
          navigate('/account/info')
        }
      } else if (!context.user && path.length === 2) {
        if (path[1] === 'info' || path[1] === 'quotes' || path[1] === 'forms') {
          navigate('/account/login')
        }
      }
    }
  }, [path, context])

  return path && path[1] && context && context.userFetched ? (
    <section className={styles.section}>
      {path[1] === 'register' && !context.user && (
        <Register />
      )}
      {path[1] === 'login' && !context.user && (
        <Login />
      )}
      {path[1] === 'recover' && !context.user && (
        <Recover />
      )}
      {path[1] === 'info' && context.user && (
        <p>info</p>
      )}
      {path[1] === 'quotes' && context.user && (
        <p>quotes</p>
      )}
      {path[1] === 'forms' && context.user && (
        <p>forms</p>
      )}
      <p><Link to='/account/info'>Info</Link></p>
      <p><Link to='/account/forms'>forms</Link></p>
      <p><Link to='/account/quotes'>quotes</Link></p>
    </section>
  ) : <div>Please wait</div>
}
