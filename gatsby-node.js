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
  const { data: { articles: { nodes: articles }, careers: { nodes: careers }, pages: { nodes: pages }, images: { nodes: images }, pageFiles: { nodes: pageFiles }, categories: { nodes: categories }, menus: { nodes: menus }, submenus: { nodes: submenus }, options: { nodes: options }, products: { nodes: products } } } = await graphql(`
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
          summary
        }
        fileAbsolutePath
        excerpt
        html
      }
    }
    careers: allCareersJson {
      nodes {
        type
        title
        slug
        location
        description
        id
        body {
          heading
          text
        }
        department
        openings
      }
    }
    categories: allAirtable(filter: {table: {eq: "Categories"}}, sort: {fields: data___Order, order: ASC}) {
      nodes {
        id
        recordId
        data {
          Name
          Order
          Image {
            url
          }
        }
      }
    }
    menus: allAirtable(filter: {table: {eq: "Menus"}}) {
      nodes {
        id
        recordId
        data {
          Category
          Name
          Order
          Menu_Label
        }
      }
    }
    submenus: allAirtable(filter: {table: {eq: "Submenus"}}) {
      nodes {
        id
        recordId
        data {
          Name
          Order
          Menu
          Submenu
          Description
          Image {
            url
          }
        }
      }
    }
    options: allAirtable(filter: {table: {eq: "Options"}}) {
      nodes {
        id
        recordId
        data {
          Name
          Label
          Type
          Select_Choices
        }
      }
    }
    products: allAirtable(filter: {table: {eq: "Products"}}, sort: {fields: data___Order, order: ASC}) {
      nodes {
        id
        recordId
        data {
          Name
          Order
          Images {
            url
          }
          Brochure_Manual {
            url
          }
          Menu
          Options
          Short_Description
          Description
        }
      }
    }
  }
  `)

  const productMenu = categories.map(category => ({
    id: category.id,
    recordId: category.recordId,
    name: category.data.Name,
    slug: slugify(category.data.Name).toLowerCase(),
    path: '/products-and-equipment/' + slugify(category.data.Name).toLowerCase(),
    order: category.data.Order,
    image: category.data.Image && category.data.Image[0].url,
    menus: menus.filter(menu => menu.data.Category[0] === category.recordId).sort((a, b) => a.data.Order < b.data.Order ? -1 : 1).map(menu => ({
      id: menu.id,
      recordId: menu.recordId,
      order: menu.data.Order,
      name: menu.data.Menu_Label,
      slug: slugify(menu.data.Menu_Label).toLowerCase(),
      path: '/' + slugify(category.data.Name).toLowerCase() + '/' + slugify(menu.data.Menu_Label).toLowerCase(),
      submenus: submenus.filter(submenu => submenu.data.Menu[0] === menu.recordId).sort((a, b) => a.data.Order < b.data.Order ? -1 : 1).map(submenu => ({
        id: submenu.id,
        recordId: submenu.recordId,
        order: submenu.data.Order,
        name: submenu.data.Submenu,
        slug: submenu.data.Submenu ? slugify(submenu.data.Submenu).toLowerCase() : '',
        path: submenu.data.Submenu ? '/' + slugify(category.data.Name).toLowerCase() + '/' + slugify(menu.data.Menu_Label).toLowerCase() + '/' + slugify(submenu.data.Submenu).toLowerCase() : '/' + slugify(category.data.Name).toLowerCase() + '/' + slugify(menu.data.Menu_Label).toLowerCase(),
        image: submenu.data.Image && submenu.data.Image[0].url,
        description: submenu.data.Description,
        products: products.filter(product => product.data.Menu[0] === submenu.recordId).sort((a, b) => a.data.Order < b.data.Order ? -1 : 1).map(product => ({
          id: product.id,
          recordId: product.recordId,
          order: product.data.Order,
          documents: product.data.Brochure_Manual && product.data.Brochure_Manual.length ? product.data.Brochure_Manual.map(document => document.url) : [],
          images: product.data.Images && product.data.Images.length ? product.data.Images.map(image => image.url) : [],
          name: product.data.Name,
          slug: slugify(product.data.Name).toLowerCase(),
          path: `/${slugify(category.data.Name).toLowerCase()}/${slugify(menu.data.Menu_Label).toLowerCase()}/${submenu.data.Submenu ? slugify(submenu.data.Submenu).toLowerCase() + '/' : ''}${slugify(product.data.Name).toLowerCase()}`,
          description: product.data.Description,
          summary: product.data.Short_Description,
          options: product.data.Options && product.data.Options.length ? product.data.Options.map(option => {
            const thisOption = options.find(thisOption => thisOption.recordId === option)
            return {
              id: thisOption.id,
              recordId: thisOption.recordId,
              name: thisOption.data.Name,
              label: thisOption.data.Label,
              type: thisOption.data.Type,
              choices: thisOption.data.Select_Choices
            }
          }) : []
        }))
      }))
    }))
  }))

  const articlesWithExtras = articles.map(article => ({
    ...article,
    path: `/news-and-resources/${article.fileAbsolutePath.split('/').pop().replace('.md', '')}`
  }))

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
        articles: articlesWithExtras,
        menu: productMenu,
        options,
        careers
      }
    })

    if (page.filePath === '/account') {
      ['info', 'quotes', 'forms', 'login', 'register', 'recover'].forEach(view => createPage({
        component: pageTemplate,
        path: page.filePath + '/' + view,
        context: {
          title: page.title,
          images,
          pages: pagesWithExtras,
          articles: articlesWithExtras,
          menu: productMenu
        }
      }))
    }
  })

  careers.forEach(career => {
    const slug = career.slug || slugify(career.title).toLowerCase()
    createPage({
      component: careerTemplate,
      path: `/careers/${slug}-${slugify(career.location).toLowerCase()}`,
      context: {
        slug,
        images,
        pages: pagesWithExtras,
        articles: articlesWithExtras,
        menu: productMenu,
        career: career
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
        articles: articlesWithExtras,
        menu: productMenu
      }
    })
  })

  productMenu.forEach(category => {
    createPage({
      component: pageTemplate,
      path: category.path,
      context: {
        title: category.name,
        images,
        pages: pagesWithExtras,
        articles: articlesWithExtras,
        menu: productMenu
      }
    })
    category.menus.forEach(menu => {
      createPage({
        component: pageTemplate,
        path: menu.path,
        context: {
          title: category.name,
          images,
          pages: pagesWithExtras,
          articles: articlesWithExtras,
          menu: productMenu
        }
      })
      menu.submenus.forEach(submenu => {
        submenu.slug && createPage({
          component: pageTemplate,
          path: submenu.path,
          context: {
            title: category.name,
            images,
            pages: pagesWithExtras,
            articles: articlesWithExtras,
            menu: productMenu
          }
        })
        submenu.products.forEach(product => {
          // console.log(product)
          createPage({
            component: productTemplate,
            path: product.path,
            context: {
              title: product.name,
              menu: productMenu,
              product,
              images,
              pages: pagesWithExtras,
              articles: articlesWithExtras,
              options
            }
          })
        })
      })
    })
  })
}
