import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import queryString from 'query-string'
import slugify from 'slugify'

import styles from './careersGrid.module.scss'

export default ({ careers, search }) => {
  const [locations, setLocations] = useState([])
  const [location, setLocation] = useState('All')
  const [userSearch, setUserSearch] = useState('')
  const [filteredCareers, setFilteredCareers] = useState([])

  useEffect(() => {
    setFilteredCareers(careers.filter(career => location === 'All' ? true : career.location === location).filter(career => !userSearch ? true : career.title.toLowerCase().replace(/\W/g, '').includes(userSearch.toLowerCase().replace(/\W/g, '')) || career.description.toLowerCase().replace(/\W/g, '').includes(userSearch.toLowerCase().replace(/\W/g, '')) || career.department.toLowerCase().replace(/\W/g, '').includes(userSearch.toLowerCase().replace(/\W/g, '')) || career.location.toLowerCase().replace(/\W/g, '').includes(userSearch.toLowerCase().replace(/\W/g, ''))))
  }, [location, userSearch])

  useEffect(() => {
    const query = queryString.parse(search)
    query.location ? setLocation(query.location.toString()) : setLocation('All')
    query.search ? setUserSearch(query.search.toString()) : setUserSearch('')
  }, [search])

  const handleSearch = e => {
    navigate(`/careers${location !== 'All' || e.target.value ? '?' : ''}${location !== 'All' ? `location=${location}${e.target.value ? '&' : ''}` : ''}${e.target.value ? `search=${e.target.value}` : ''}`)
    setUserSearch(e.target.value)
  }

  useEffect(() => {
    const categories = []
    careers.forEach(career => categories.push(career.location))
    categories.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)
    setLocations(['All', ...new Set(categories)])
  }, [careers])

  useEffect(() => {
    const query = queryString.parse(search)
    query.location ? setLocation(query.location.toString()) : setLocation('All')
    query.search ? setUserSearch(query.search.toString()) : setUserSearch('')
  }, [search])

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.categories}>
          {locations.map((locationItem, i) => {
            const handleFilter = () => {
              navigate(`/careers${locationItem === 'All' ? '' : `?location=${locationItem}`}`)
            }
            return (
              <React.Fragment key={i}>
                {i ? <span className={styles.divider}> // </span> : null}
                <p className={styles.category + `${locationItem === location ? ` ${styles.active}` : ''}`} onClick={handleFilter}>{locationItem}</p>
              </React.Fragment>
            )
          })}
        </div>
        <div className={styles.search}>
          <input className={styles.input} type='text' name='search' id='search' value={userSearch} onChange={handleSearch} />
        </div>
      </div>
      {filteredCareers.length ? (
        <div className={styles.careers}>
          {filteredCareers.map(career => {
            return (
              <Link key={career.id} to={`/careers/${career.slug || slugify(career.title).toLowerCase()}-${slugify(career.location).toLowerCase()}`} className={styles.career}>
                <div className={styles.bar} />
                <p className={styles.department}>{career.department}</p>
                <p className={styles.title}>{career.title}.</p>
                <p className={styles.description}>{career.description}</p>
                <p className={styles.openings}>{career.openings}{parseInt(career.openings) === 1 ? ' opening' : ' openings'}</p>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2 className={styles.alert}>No careers found</h2>
        </div>
      )}
    </section>
  )
}
