import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import queryString from 'query-string'

import { Layout } from '../../components'

import 'animate.css/animate.min.css'

export default props => {
  // console.log('props', props)
  const { location, data: { pagesJson: page }, pageContext: { pages, images, articles, menu } } = props
  const [tag, setTag] = useState('')
  const [formOpen, setFormOpen] = useState(false)

  const toggleForm = e => {
    e.preventDefault()
    setFormOpen(!formOpen)
  }

  useEffect(() => {
    const tag = queryString.parse(location.search)
    tag.tag ? setTag(tag.tag.toString()) : setTag('')
  }, [location])

  return (
    <Layout title={page.title} pages={pages} images={images} toggleForm={toggleForm} blocks={page.blocks} articles={articles} tag={tag} menu={menu} location={location} />
  )
}

export const pageQuery = graphql`
query ($title: String!) {
  pagesJson(title: {eq: $title }) {
    title
    type
    blocks {
      template
      image
      video
      text {
        text
      }
      buttonText
      buttonLink
      buttonIcon
    }
  }
}
`
