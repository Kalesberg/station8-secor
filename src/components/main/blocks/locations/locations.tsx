import React, { useEffect, useState } from 'react'
import slugify from 'slugify'
import queryString from 'query-string'

import Grid from './grid/grid'
import Detail from './detail/detail'
import Mobile from './mobile/mobile'

import styles from './locations.module.scss'

export default ({ block, search }) => {
  const [selectedLocation, setSelectedLocation] = useState('')

  useEffect(() => {
    if (search) {
      const query = queryString.parse(search)
      if (query.city) {
        setSelectedLocation(block.locations.find(location => slugify(location.city).toLowerCase() === query.city))
      }
    } else {
      setSelectedLocation('')
    }
  })

  useEffect(() => {
    console.log(selectedLocation)
  }, [selectedLocation])

  return (
    <section className={styles.section}>
      <Mobile block={block} selectedLocation={selectedLocation} />
      {!selectedLocation ? (
        <Grid block={block} />
      ) : (
        <Detail block={block} selectedLocation={selectedLocation} />
      )}
    </section>
  )
}
