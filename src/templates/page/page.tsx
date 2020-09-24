import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import queryString from 'query-string'

import { Layout } from '../../components'

import 'animate.css/animate.min.css'

export default props => {
  console.log(props)
  const { location: { search }, data: { pagesJson: page }, pageContext: { pages, images, articles } } = props
  const [tag, setTag] = useState('')
  const [formOpen, setFormOpen] = useState(false)

  const toggleForm = e => {
    e.preventDefault()
    setFormOpen(!formOpen)
  }

  useEffect(() => {
    const tag = queryString.parse(search)
    tag.tag ? setTag(tag.tag.toString()) : setTag('')
  }, [search])

  return (
    <Layout title={page.title} pages={pages} images={images} toggleForm={toggleForm} blocks={page.blocks} articles={articles} tag={tag} />
  )
}

export const pageQuery = graphql`
query ($title: String!) {
  pagesJson(title: {eq: $title }) {
    title
    type
    blocks {
      template
    }
  }
}
`
