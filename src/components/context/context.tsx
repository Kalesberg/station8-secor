import React, { createContext, useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'

const Context = createContext(null)

const ContextProvider = ({ children }) => {
  const data = useStaticQuery(graphql`{
    categories: allAirtable(filter: {table: {eq: "Categories"}}, sort: {fields: data___Order, order: ASC}) {
      nodes {
        id
        recordId
        data {
          Name
          Order
          Image {
            localFiles {
              publicURL
            }
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
            localFiles {
              publicURL
            }
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
            localFiles {
              publicURL
            }
          }
          Brochure_Manual {
            localFiles {
              publicURL
            }
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
  }`)

  const [quote, setQuote] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [user, setUser] = useState(undefined)
  const [userFetched, setUserFetched] = useState(false)
  const [menu, setMenu] = useState([])

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    requirements: ''
  })

  const auth = el => user && user.id ? el : null

  const updateQuantity = () => {
    let quantity = 0
    quote.forEach(item => {
      quantity += parseInt(item.quantity)
    })
    setQuantity(quantity)
  }
  const handleAddQuoteItem = item => {
    const newQuote = quote
    newQuote.push(item)
    setQuote(newQuote)
  }
  const handleRemoveQuoteItem = index => {
    setQuote(quote.filter((lineItem, i) => i !== index))
  }
  const handleUpdateQuoteItem = (item, index) => {
    const newQuote = quote
    newQuote[index] = item
    setQuote(newQuote)
  }

  useEffect(() => {
    if (data) {
      console.log(data)
      setMenu(data.categories.nodes.map(category => ({
        id: category.id,
        recordId: category.recordId,
        name: category.data.Name,
        slug: slugify(category.data.Name).toLowerCase(),
        path: '/products-and-equipment/' + slugify(category.data.Name).toLowerCase(),
        order: category.data.Order,
        image: category.data.Image && category.data.Image.localFiles && category.data.Image.localFiles[0] && category.data.Image.localFiles[0].publicURL,
        menus: data.menus.nodes.filter(menu => menu.data.Category[0] === category.recordId).sort((a, b) => a.data.Order < b.data.Order ? -1 : 1).map(menu => ({
          id: menu.id,
          recordId: menu.recordId,
          order: menu.data.Order,
          name: menu.data.Menu_Label,
          slug: slugify(menu.data.Menu_Label).toLowerCase(),
          path: '/' + slugify(category.data.Name).toLowerCase() + '/' + slugify(menu.data.Menu_Label).toLowerCase(),
          submenus: data.submenus.nodes.filter(submenu => submenu.data.Menu[0] === menu.recordId).sort((a, b) => a.data.Order < b.data.Order ? -1 : 1).map(submenu => ({
            id: submenu.id,
            recordId: submenu.recordId,
            order: submenu.data.Order,
            name: submenu.data.Submenu,
            slug: submenu.data.Submenu ? slugify(submenu.data.Submenu).toLowerCase() : '',
            path: submenu.data.Submenu ? '/' + slugify(category.data.Name).toLowerCase() + '/' + slugify(menu.data.Menu_Label).toLowerCase() + '/' + slugify(submenu.data.Submenu).toLowerCase() : '/' + slugify(category.data.Name).toLowerCase() + '/' + slugify(menu.data.Menu_Label).toLowerCase(),
            image: submenu.data.Image && submenu.data.Image.localFiles && submenu.data.Image.localFiles[0] && submenu.data.Image.localFiles[0].publicURL,
            description: submenu.data.Description,
            products: data.products.nodes.filter(product => product.data.Menu[0] === submenu.recordId).sort((a, b) => a.data.Order < b.data.Order ? -1 : 1).map(product => ({
              id: product.id,
              recordId: product.recordId,
              order: product.data.Order,
              documents: product.data.Brochure_Manual && product.data.Brochure_Manual.localFiles && product.data.Brochure_Manual.localFiles.length ? product.data.Brochure_Manual.localFiles.map(document => document.publicURL) : [],
              images: product.data.Images && product.data.Images.localFiles && product.data.Images.localFiles.length ? product.data.Images.localFiles.map(image => image.publicURL) : [],
              name: product.data.Name,
              slug: slugify(product.data.Name).toLowerCase(),
              path: `/${slugify(category.data.Name).toLowerCase()}/${slugify(menu.data.Menu_Label).toLowerCase()}/${submenu.data.Submenu ? slugify(submenu.data.Submenu).toLowerCase() + '/' : ''}${slugify(product.data.Name).toLowerCase()}`,
              description: product.data.Description,
              summary: product.data.Short_Description,
              options: product.data.Options && product.data.Options.length ? product.data.Options.map(option => {
                const thisOption = data.options.nodes.find(thisOption => thisOption.recordId === option)
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
      })))
    }
  }, [data])

  useEffect(() => {
    const localStorage = window.localStorage.getItem('quote')
    setQuote(localStorage ? JSON.parse(localStorage) : [])
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleValidateUser()
    }
  }, [])

  const handleLogoutUser = async e => {
    e.preventDefault()
    setUser(undefined)
    const res = await window.fetch('/.netlify/functions/logout', {
      method: 'GET'
    })
    if (res.ok) {
      // const body = await res.json()
      // console.log(body)
    }
  }

  const handleValidateUser = async () => {
    setUserFetched(false)
    const res = await window.fetch('/.netlify/functions/authenticate')
    if (res.ok) {
      const body = await res.json()
      // console.log(body)
      setUser({
        id: body.userId,
        firstName: body.user['First Name'],
        lastName: body.user['Last Name'],
        email: body.user.Email,
        company: body.user.Company,
        phone: body.user['Phone Number'],
        address1: body.user['Address Line 1'],
        address2: body.user['Address Line 2'],
        city: body.user.City,
        state: body.user.State,
        zipCode: body.user.ZIP,
        quotes: JSON.parse(body.user.QuoteArray)
      })
    } else {
      setUser(undefined)
    }
    setUserFetched(true)
  }

  useEffect(() => {
    window.localStorage.setItem('quote', JSON.stringify(quote))
    updateQuantity()
  }, [quote])

  return (
    <Context.Provider value={{ auth, handleLogoutUser, handleValidateUser, menu, user, userFetched, quantity, quote, setQuote, handleAddQuoteItem, handleRemoveQuoteItem, handleUpdateQuoteItem, customerInfo, setCustomerInfo }}>
      {children}
    </Context.Provider>)
}

export { Context, ContextProvider }
