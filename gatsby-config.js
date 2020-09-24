const config = require('./.forestry/content/settings/config.json')
const contact = require('./.forestry/content/settings/contact.json')
const header = require('./.forestry/content/settings/header.json')
const footer = require('./.forestry/content/settings/footer.json')

module.exports = {
  siteMetadata: {
    title: config.title,
    description: config.description,
    contact,
    config,
    header,
    footer,
    ...config
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 100
      }
    },
    {
      resolve: 'gatsby-transformer-sharp',
      options: {
        checkSupportedExtensions: false
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.title,
        start_url: '/',
        background_color: '#F92A35',
        theme_color: '#F92A35',
        display: 'standalone',
        icon: `${__dirname}${config.favicon}`
      }
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-minify-classnames',
      options: {
        dictionary: 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ0123456789',
        enableOnDevelopment: false
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          'gatsby-remark-normalize-paths',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/.forestry/content`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/.forestry/content/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/.forestry/content/pages`
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '',
        head: true,
        respectDNT: false,
        pageTransitionDelay: 0,
        defer: false
      }
    },
    'gatsby-plugin-remove-console',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline'
  ]
}
