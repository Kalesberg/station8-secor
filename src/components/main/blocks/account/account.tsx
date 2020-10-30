import React, { useContext, useEffect, useState } from 'react'
import { navigate } from 'gatsby'

import { Context } from '../../../context/context'
import Authenticated from './authenticated/authenticated'
import Register from './register/register'
import Login from './login/login'
import Recover from './recover/recover'

import styles from './account.module.scss'

export default ({ location, options, search }) => {
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
      {context.user && (path[1] === 'info' || path[1] === 'quotes' || path[1] === 'forms') && (
        <Authenticated path={path[1]} user={context.user} options={options} search={search} />
      )}
    </section>
  ) : <div>Please wait</div>
}
