import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../../components'

import 'animate.css/animate.min.css'

export default ({ location, data: { pagesJson: page }, pageContext: { careers, articles, menu, options, forms } }) => <Layout title={page.title} blocks={page.blocks} articles={articles} careers={careers} menu={menu} location={location} options={options} forms={forms} />

export const pageQuery = graphql`
query ($title: String!) {
  pagesJson(title: {eq: $title }) {
    title
    type
    blocks {
      contactFullPageHeading
      contactFullPageSubheading
      video
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
