import React, { useEffect, useState } from 'react'

import Desktop from './desktop/desktop'
import Mobile from './mobile/mobile'

export default ({ location }) => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
  }, [])

  return width > 600 ? (
    <Desktop location={location} />
  ) : (
    <Mobile location={location} />
  )
}
