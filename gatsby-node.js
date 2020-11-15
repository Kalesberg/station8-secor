const path = require('path')
const slugify = require('slugify')

const articleTemplate = path.resolve('./src/templates/article/article.tsx')
const formTemplate = path.resolve('./src/templates/form/form.tsx')
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
  const { data: { articles: { nodes: articles }, careers: { nodes: careers }, forms: { nodes: forms }, pages: { nodes: pages }, pageFiles: { nodes: pageFiles }, categories: { nodes: categories }, menus: { nodes: menus }, submenus: { nodes: submenus }, options: { nodes: options }, products: { nodes: products } } } = await graphql(`
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
    articles: allMarkdownRemark(filter: {frontmatter: {type: {eq: "article"}}}) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          parent
        }
      }
    }
    careers: allCareersJson {
      nodes {
        title
        slug
        location
      }
    }
    forms: allMarkdownRemark(filter: {frontmatter: {type: {eq: "form"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          title
          heroImage {
            publicURL
          }
          form {
            publicURL
          }
        }
        fileAbsolutePath
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

  const getFilePath = page => `/${page.slug === '/' ? '' : page.slug || slugify(page.title).toLowerCase()}`

  pages.forEach(page => {
    createPage({
      component: pageTemplate,
      path: getFilePath(page),
      context: {
        title: page.title,
        menu: productMenu,
        options
      }
    })

    if (getFilePath(page) === '/account') {
      ['info', 'quotes', 'forms', 'login', 'register', 'recover'].forEach(view => createPage({
        component: pageTemplate,
        path: getFilePath(page) + '/' + view,
        context: {
          title: page.title,
          menu: productMenu,
          options
        }
      }))
    }
  })

  forms.forEach(form => {
    createPage({
      component: formTemplate,
      path: `/news-and-resources/forms/${form.fileAbsolutePath.split('/').pop().replace('.md', '')}`,
      context: {
        title: form.frontmatter.title,
        menu: productMenu
      }
    })
  })

  careers.forEach(career => {
    const slug = career.slug || slugify(career.title).toLowerCase()
    createPage({
      component: careerTemplate,
      path: `/careers/${slug}-${slugify(career.location).toLowerCase()}`,
      context: {
        title: career.title,
        location: career.location,
        menu: productMenu
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
        menu: productMenu
      }
    })
    category.menus.forEach(menu => {
      createPage({
        component: pageTemplate,
        path: menu.path,
        context: {
          title: category.name,
          menu: productMenu
        }
      })
      menu.submenus.forEach(submenu => {
        submenu.slug && createPage({
          component: pageTemplate,
          path: submenu.path,
          context: {
            title: category.name,
            menu: productMenu
          }
        })
        submenu.products.forEach(product => {
          createPage({
            component: productTemplate,
            path: product.path,
            context: {
              title: product.name,
              menu: productMenu,
              product,
              options
            }
          })
        })
      })
    })
  })
}
