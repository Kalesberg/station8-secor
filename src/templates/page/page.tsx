import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../../components'

import 'animate.css/animate.min.css'

export default props => {
  const { location, data: { pagesJson: page }, pageContext: { careers, pages, articles, menu, options, forms } } = props

  return (
    <Layout title={page.title} pages={pages} blocks={page.blocks} articles={articles} careers={careers} menu={menu} location={location} options={options} forms={forms} />
  )
}

export const pageQuery = graphql`
query ($title: String!) {
  pagesJson(title: {eq: $title }) {
    title
    type
    blocks {
      contactFullPageHeading
      contactFullPageSubheading
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
        mapImage
        mapLink
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
