import React, { useContext, useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import camelcase from 'camelcase'

import { Context } from '../../../context/context'

import styles from './productsIndexMobile.module.scss'

export default ({ location, menu }) => {
  const context = useContext(Context)
  const [path] = useState(location.pathname.slice(1).split('/'))
  const [productMenu, setProductMenu] = useState(undefined)
  const [submenu, setSubmenu] = useState(undefined)
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  console.log(path);
  // useEffect(() => {
  //   console.log('submenu', submenu)
  // }, [submenu])
  useEffect(() => {
    const getCategory = () => menu.find(category => category.slug === path[0])
    const getProductMenu = category => category && menu.find(category => category.slug === path[0]).menus.find(menu => menu.slug === path[1])
    const getSubMenu = productMenu => {
      if (productMenu && productMenu.submenus.length > 1) {
        // console.log(productMenu)
        return productMenu.submenus.find(submenu => submenu.slug === path[2])
      } else if (productMenu && productMenu.submenus.length === 1) {
        // console.log(productMenu)
        return productMenu.submenus[0]
      } else {
        // console.log(productMenu)
        return null
      }
    }

    const invalidCategory = () => {
      const path = menu[0].menus[0].submenus[0].path
      // console.log('invalid category', path)
      navigate(path)
    }
    const invalidMenu = category => {
      const path = category.menus[0].submenus[0].path
      // console.log('invalid menu', path)
      navigate(path)
    }
    const invalidSubmenu = productMenu => {
      // console.log(productMenu)
      const path = productMenu.submenus[0].path
      // console.log('invalid submenu', path)
      navigate(path)
    }

    if (path && path.length === 3) {
      const category = getCategory()
      const productMenu = getProductMenu(category)
      const submenu = getSubMenu(productMenu)

      if (submenu) {
        setSubmenu(submenu)
        setProductMenu(productMenu)
      } else if (productMenu) {
        invalidSubmenu(productMenu)
      } else if (category) {
        invalidMenu(category)
      } else {
        invalidCategory()
      }
    } else if (path && path.length === 2) {
      const category = getCategory()
      const productMenu = getProductMenu(category)

      if (productMenu && productMenu.submenus.length === 1) {
        setSubmenu(productMenu.submenus[0])
        setProductMenu(productMenu)
      } else if (productMenu) {
        invalidSubmenu(productMenu)
      } else if (category) {
        invalidMenu(category)
      } else {
        invalidCategory()
      }
    } else if (path && path.length === 1) {
      const category = getCategory()

      if (category) {
        invalidMenu(category)
      } else {
        invalidCategory()
      }
    } else {
      invalidCategory()
    }
  }, [path])

  // useEffect(() => {
  //   console.log('menu', productMenu)
  // }, [productMenu])
 

  const handleSetSearchTerm = e => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (searchTerm) {
      const results = []
      menu.forEach(category => category.menus.forEach(menu => menu.submenus.forEach(submenu => submenu.products.forEach(product => {
        if (product.name.replace(/\W/g, '').toLowerCase().includes(searchTerm.replace(/\W/g, '').toLowerCase())) {
          results.push(product)
        }
      }))))
      setSearchResults(results)
    }
  }, [searchTerm])
  
  return context && (
    <section className={styles.section}>
      <div className={styles.search}>
        <input className={styles.input} value={searchTerm} onChange={handleSetSearchTerm} />
        <h3 className={styles.category}>Category</h3>
      </div>
      <div className={styles.mobile}>
        {menu[0].menus.map(menu => {
          return menu.submenus.map((submenu, i) => {
            return <div key={i} className={styles.products}>
            {submenu.products.map(product => {
                const initOptions = () => {
                  const options = {}
                  product.options.map(option => {
                    if (option.type === 'Text') {
                      options[camelcase(option.name)] = ''
                    } else if (option.type === 'Toggle') {
                      options[camelcase(option.name)] = false
                    } else if (option.type === 'Select' && option.choices && option.choices.length) {
                      options[camelcase(option.name)] = option.choices[0]
                    }
                  })
                  return options
                }
                const handleAddToQuote = e => {
                  e.preventDefault()
                  const newQuote = [...context.quote]
                  newQuote.push({
                    id: product.id,
                    recordId: product.recordId,
                    name: product.name,
                    image: product.images && product.images.length && product.images[0],
                    options: initOptions(),
                    notes: '',
                    path: product.path,
                    quantity: 1
                  })
                  context.setQuote(newQuote)
                }
                return (
                  <div key={product.recordId} className={styles.product}>
                    <div className={styles.image} style={{ backgroundImage: `url(${product.images && product.images[0]})` }}></div>
                    <div className={styles.detail}>
                      <Link className={styles.name} to={product.path}>{product.name}</Link>
                      <p className={styles.description}>{product.summary}</p>
                      {product.documents && product.documents[0] && <a className={styles.download} href={product.documents[0]} target='_blank' rel='noopener noreferrer'>PDF</a>}
                    </div>
                    <Link to={product.path} className={styles.button}>
                      <svg className={styles.add} viewBox='0 0 500 500' fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit={2} onClick={handleAddToQuote}>
                        <path d='M250 0c137.979 0 250 112.021 250 250 0 137.979-112.021 250-250 250C112.021 500 0 387.979 0 250 0 112.021 112.021 0 250 0zm0 33.333c119.582 0 216.667 97.085 216.667 216.667 0 119.582-97.085 216.667-216.667 216.667-119.582 0-216.667-97.085-216.667-216.667 0-119.582 97.085-216.667 216.667-216.667z' fill='#EBE5E5' />
                        <path fill='#d50f0a' d='M220.5 123.5h59v253h-59z' />
                        <path fill='#d50f0a' d='M376.5 220.5v59h-253v-59z' />
                      </svg>
                      select details
                    </Link>
                  </div>
                )
              })}
            </div>
          })
        })}
      </div>
    </section>
  )
}

