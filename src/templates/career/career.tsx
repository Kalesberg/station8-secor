import React, { useState } from 'react'
import { Link } from 'gatsby'
import parse from 'html-react-parser'

import { Layout } from '../../components'
import { CareersCTA } from '../../components/main/blocks'

import styles from './career.module.scss'

import background from '../../../.forestry/content/images/careers.png'
import arrow from '../../../.forestry/content/images/arrow-right.svg'

export default ({ pageContext: { images, career, menu, pages, careers }, location }) => {
  const [formOpen, setFormOpen] = useState(false)

  const scrollDown = () => {
    document.getElementById('cfform').scrollIntoView({ behavior: 'smooth' })
  }

  const toggleForm = e => {
    e.preventDefault()
    setFormOpen(!formOpen)
  }

  return (
    <Layout title={career.title} pages={pages} images={images} toggleForm={toggleForm} menu={menu} location={location}>
      <article className={styles.articleContainer}>
        <div className={styles.hero} style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url(${background})` }}>
          <div className={styles.text}>
            <p className={styles.location}>{career.location}</p>
            <h1 className={styles.title}>{career.title}</h1>
            <p className={styles.excerpt}>{career.description}</p>
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.button} onClick={scrollDown}>
              <p className={styles.label}>Apply now</p>
              <div className={styles.arrow} style={{ backgroundImage: `url(${arrow})` }} />
            </div>
          </div>
        </div>
        <section className={styles.article}>
          <Link className={styles.back} to='/press' />
          <div className={styles.container}>
            <div className={styles.body}>
              {career.body.map((block, i) => {
                return (
                  <div key={i} className={styles.block}>
                    <h2 className={styles.heading}>{block.heading}</h2>
                    {block.text && parse(block.text)}
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.fillSpace} />
        </section>
        <CareersCTA images={images} careers={careers} position={career.title} />
      </article>
    </Layout>
  )
}
