const path = require('path')
const slugify = require('slugify')

const articleTemplate = path.resolve('./src/templates/article/article.tsx')
const careerTemplate = path.resolve('./src/templates/career/career.tsx')
const pageTemplate = path.resolve('./src/templates/page/page.tsx')
const productTemplate = path.resolve('./src/templates/product/product.tsx')

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md')
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

module.exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const { data: { articles: { nodes: articles }, pages: { nodes: pages }, images: { nodes: images }, pageFiles: { nodes: pageFiles } } } = await graphql(`
  {
    pages: allPagesJson {
      nodes {
        title
        slug
      }
    }
    pageFiles: allFile(filter: {relativeDirectory: {eq: "pages"}}) {
      nodes {
        relativePath
        childPagesJson {
          slug
          title
        }
      }
    }
    images: allFile(filter: {relativeDirectory: {eq: "images"}}) {
      nodes {
        publicURL
        relativePath
        childImageSharp {
          fluid(quality: 100) {
            aspectRatio
            base64
            originalImg
            originalName
            presentationHeight
            presentationWidth
            sizes
            # src
            # srcSet
            srcSetWebp
            srcWebp
            # tracedSVG
          }
        }
      }
    }
    articles: allMarkdownRemark(filter: {frontmatter: {type: {eq: "article"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          parent
          heroImage {
            relativePath
          }
          title
          tags
          date
        }
        fileAbsolutePath
        excerpt(pruneLength: 56)
      }
    }
  }
  `)

  const pagesWithExtras = pages.map(page => {
    const file = pageFiles.find(file => file.childPagesJson.slug === page.slug && file.childPagesJson.title === page.title)
    const filePath = `/${page.slug === '/' ? '' : page.slug || slugify(page.title).toLowerCase()}`
    return {
      ...page,
      relativePath: file.relativePath,
      filePath
    }
  })
  pagesWithExtras.forEach(page => {
    page.filePath !== '/demo' &&
    createPage({
      component: pageTemplate,
      path: page.filePath,
      context: {
        title: page.title,
        images,
        pages: pagesWithExtras,
        articles
      }
    })
  })

  articles.forEach(article => {
    const slug = article.fields.slug
    const parent = pageFiles.find(page => article.frontmatter.parent.includes(page.relativePath)).childPagesJson
    const path = `/${parent.slug === '/' ? '' : parent.slug || slugify(parent.title).toLowerCase()}` + `${parent.slug === '/' ? '' : '/'}` + slug
    createPage({
      component: articleTemplate,
      path,
      context: {
        slug,
        parent: article.frontmatter.parent,
        images,
        pages: pagesWithExtras,
        articles
      }
    })
  })
}
