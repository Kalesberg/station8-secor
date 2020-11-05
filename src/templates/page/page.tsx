import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import queryString from 'query-string'

import { Layout } from '../../components'

import 'animate.css/animate.min.css'

export default props => {
  // console.log('props', props)
  const { location, data: { pagesJson: page }, pageContext: { careers, pages, images, articles, menu, options, forms } } = props
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
    <Layout title={page.title} pages={pages} images={images} toggleForm={toggleForm} blocks={page.blocks} articles={articles} careers={careers} tag={tag} menu={menu} location={location} options={options} forms={forms} />
  )
}

export const pageQuery = graphql`
query ($title: String!) {
  pagesJson(title: {eq: $title }) {
    title
    type
    blocks {
      video
      #text {
      #  text
      #  element
      #}
      heroText {
        text
        element
      }
      template
      locations {
        city
        image
        address
        phone
      }
      product {
        category
        description
        heading
        image
      }
      #button
      ctaText
      buttonType
      background
      ctaTitle
      cfBackground
      buttonIcon
      buttonLink
      buttonOne {
        buttonOneIcon
        buttonOneLink
        buttonOneText
        showButtonOne
      }
      buttonText
      buttonTwo {
        buttonTwoIcon
        buttonTwoLink
        buttonTwoText
        showButtonTwo
      }
      extraButtons {
        buttonText
        buttonLink
        buttonIcon
      }
      heading
      subHeading
      image
      showButton
      featuredArticle
      fittings {
        descriptions
        fittingHeading
        fittingSubHeading
        icon
      }
      paragraph
      tools {
        category
        smallImage
        largeImage
        buttonText
        buttonTextTwo
        buttonLink
        buttonLinkTwo
      }
      icon
      placeholderText
      market {
        title
        image
        description
      }
      markets {
        market
        image
        description
      }
      inputs {
        label
        icon
      }
      accessories {
        heading
        subHeading
        description
        buttonText
        buttonLink
        image
      }
      largeHeading
      stats {
        number
        description
        icon
        characters
      }
      left
      right
      histories {
        image
        year
        description
        yearText
      }
      images {
        image
      }
      categories {
        category
        description
        buttonText
        buttonLink
        image
        icon
      }
      description
      pipes {
        pipe
        heading
        subHeading
        description
      }
    }
  }
}
`
