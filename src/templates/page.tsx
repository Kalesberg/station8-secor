import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layout'
import { graphql } from 'gatsby'
import camelcase from 'camelcase'
import { enabled, mainBlock } from '../forestry-tools'
import queryString from 'query-string'

import { page as styles } from '../styles/templates'
import blockStyles from '../styles/blocks/main'

export default ({ location: { search }, data: { pagesJson: page }, pageContext: { pages, images, articles } }) => {
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
    <Layout title={page.title} pages={pages} images={images} formOpen={formOpen} toggleForm={toggleForm}>
      {enabled(page.rows).map((row, i) => (
        <div key={i} className={styles.row}>
          {enabled(row.columns).map((column, i) => (
            <div key={i} className={styles.column}>
              {enabled(column.blocks).map((block, i) => {
                return mainBlock(block, i, images, blockStyles[camelcase(block.template.replace('main-', ''))], articles, pages, tag, toggleForm)
              })}
              <div className={styles.cover} />
            </div>
          ))}
        </div>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($title: String!) {
    pagesJson(title: {eq: $title }) {
      title
      type
      rows {
        settings {
          disabled
        }
        columns {
          settings {
            disabled
          }
          blocks {
            title
            mobileTitle
            template
            settings {
              disabled
              class
            }
            showRedBar
            showButton
            animatedElement
            articles
            backgrounds {
              alt
              class
              description
              image
              settings {
                disabled
              }
              title
            }
            body
            button {
              label
              settings {
                disabled
              }
              direction
            }
            cities {
              nativeLanguageName
              name
              image {
                alt
                description
                image
                settings {
                  disabled
                }
                title
              }
              settings {
                disabled
              }
            }
            companies {
              description
              link
              logo {
                alt
                description
                image
                settings {
                  disabled
                }
                title
              }
              settings {
                disabled
              }
            }
            features {
              name
              data {
                label
                value
                percent
              }
              list {
                feature
                icon
                settings {
                  disabled
                }
              }
              settings {
                disabled
              }
            }
            heading
            heading1
            heading2
            highlights {
              body
              image {
                alt
                description
                image
                settings {
                  disabled
                }
                title
              }
              title
              settings {
                disabled
              }
              button {
                direction
                label
              }
            }
            image {
              alt
              description
              image
              settings {
                disabled
              }
              title
            }
            largeHeading
            mediumHeading
            subheading
            leaders {
              biography
              name
              photo {
                alt
                description
                image
                settings {
                  disabled
                }
                title
              }
              settings {
                disabled
              }
              title
            }
            columns
            pageDownIcon {
              alt
              description
              image
              settings {
                disabled
              }
              title
            }
            smallHeading
            text
            subtitle
            videos
          }
        }
      }
      settings {
        disabled
      }
    }
  }
`
