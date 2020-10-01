import React, { createContext, useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Context = createContext(null)

const ContextProvider = ({ children }) => {
  const [menu, setMenu] = useState([])

  const { Categories, Menus, Submenus, Options, Products } = useStaticQuery(graphql`
  {
    Categories: allAirtable(filter: {table: {eq: "Categories"}}, sort: {fields: data___Order, order: ASC}) {
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
    Menus: allAirtable(filter: {table: {eq: "Menus"}}) {
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
    Submenus: allAirtable(filter: {table: {eq: "Submenus"}}) {
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
    Options: allAirtable(filter: {table: {eq: "Options"}}) {
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
    Products: allAirtable(filter: {table: {eq: "Products"}}, sort: {fields: data___Order, order: ASC}) {
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

  useEffect(() => {
    if (typeof window && Categories && Menus && Submenus && Products && Options) {
      setMenu(Categories.nodes.map(category => ({
        id: category.id,
        recordId: category.recordId,
        name: category.data.Name,
        order: category.data.Order,
        image: category.data.Image && category.data.Image[0].url,
        menus: Menus.nodes.filter(menu => menu.data.Category[0] === category.recordId).sort((a, b) => a.data.Order < b.data.Order ? -1 : 1).map(menu => ({
          id: menu.id,
          recordId: menu.recordId,
          order: menu.data.Order,
          name: menu.data.Menu_Label,
          submenus: Submenus.nodes.filter(submenu => submenu.data.Menu[0] === menu.recordId).sort((a, b) => a.data.Order < b.data.Order ? -1 : 1).map(submenu => ({
            id: submenu.id,
            recordId: submenu.recordId,
            order: submenu.data.Order,
            name: submenu.data.Submenu,
            image: submenu.data.Image && submenu.data.Image[0].url,
            description: submenu.data.Description,
            products: Products.nodes.filter(product => product.data.Menu[0] === submenu.recordId).sort((a, b) => a.data.Order < b.data.Order ? -1 : 1).map(product => ({
              id: product.id,
              recordId: product.recordId,
              order: product.data.Order,
              documents: product.data.Brochure_Manual && product.data.Brochure_Manual.length ? product.data.Brochure_Manual.map(document => document.url) : [],
              images: product.data.Images && product.data.Images.length ? product.data.Images.map(image => image.url) : [],
              name: product.data.Name,
              description: product.data.Description,
              summary: product.data.Short_Description,
              options: product.data.Options && product.data.Options.length ? product.data.Options.map(option => {
                const thisOption = Options.nodes.find(thisOption => thisOption.recordId === option)
                return {
                  id: thisOption.id,
                  recordId: thisOption.recordId,
                  name: thisOption.data.Label,
                  type: thisOption.data.Type,
                  choices: thisOption.data.Select_Choices
                }
              }) : []
            }))
          }))
        }))
      })))
    }
  }, [Categories, Menus, Submenus, Products, Options])

  return <Context.Provider value={{ menu }}>{children}</Context.Provider>
}

export { Context, ContextProvider }
