import React, { useContext, useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import camelcase from 'camelcase'

import { Context } from '../../../../context/context'

import styles from './mobile.module.scss'

export default ({ location }) => {
  const context = useContext(Context)
  const [path] = useState(() => {
    const string = location.pathname.charAt(location.pathname.length - 1) === '/' ? location.pathname.substr(1, location.pathname.length - 2) : location.pathname.substr(1, location.pathname.length - 1)
    return string.split('/')
  })
  const [productMenu, setProductMenu] = useState(undefined)
  const [submenu, setSubmenu] = useState(undefined)
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [all, setAll] = useState(location.pathname === '/products')
  const [items, setItems] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(path.length === 1)
  const [activeMenu, setActiveMenu] = useState(null)

  useEffect(() => {
    if (all) {
      const results = []
      context.menu.forEach(category => category.menus.forEach(menu => menu.submenus.forEach(submenu => submenu.products.forEach(product => results.push(product)))))
      setItems(results)
    } else if (searchResults.length > 0) {
      setItems(searchResults)
    } else {
      const getCategory = () => context.menu.find(category => category.slug === path[0])
      const getProductMenu = category => category && context.menu.find(category => category.slug === path[0]).menus.find(menu => menu.slug === path[1])
      const getSubMenu = productMenu => {
        if (productMenu && productMenu.submenus.length > 1) {
          return productMenu.submenus.find(submenu => submenu.slug === path[2])
        } else if (productMenu && productMenu.submenus.length === 1) {
          return productMenu.submenus[0]
        } else {
          return null
        }
      }

      const invalidCategory = () => navigate(context.menu[0].menus[0].submenus[0].path)
      const invalidMenu = category => navigate(category.menus[0].submenus[0].path)
      const invalidSubmenu = productMenu => navigate(productMenu.submenus[0].path)

      if (context && context.menu && context.menu.length) {
        if (path && path.length === 3) {
          const category = getCategory()
          const productMenu = getProductMenu(category)
          const submenu = getSubMenu(productMenu)

          if (submenu) {
            setSubmenu(submenu)
            setItems(submenu.products)
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
            setItems(productMenu.submenus[0].products)
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
      }
    }
  }, [path, searchResults, context])

  const handleSetSearchTerm = e => {
    setSearchTerm(e.target.value)
    if (!e.target.value) {
      setSearchResults([])
    }
  }

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    if (searchTerm) {
      setAll(false)
      const results = []
      context.menu.forEach(category => category.menus.forEach(menu => menu.submenus.forEach(submenu => submenu.products.forEach(product => {
        if (product.name.replace(/\W/g, '').toLowerCase().includes(searchTerm.replace(/\W/g, '').toLowerCase())) results.push(product)
      }))))
      setSearchResults(results)
    }
  }, [searchTerm])

  return context && context.menu && context.menu.length ? (
    <section className={styles.section}>
      <div className={styles.sidebarContainer + ` ${sidebarOpen ? `${styles.sidebarOpen}` : ''}`}>
        <div className={styles.sidebar}>
          {context.menu.map(category => (
            <div key={category.slug} className={styles.category}>
              <p className={styles.categoryName}>{category.name}</p>
              <div className={styles.menuItems}>
                {category.menus.map((menu, i) => (
                  <div key={i}>
                    {menu.submenus.length > 1 && (
                      <div className={styles.dropdownContainer}>
                        <button
                          className={styles.menuItem + ' ' + styles.dropdown + ` ${activeMenu === menu.name || (path.length >= 2 && path[1] === menu.slug) ? `${styles.active}` : ''}`}
                          style={{ backgroundImage: 'url(/chevron-down.svg' }} onClick={() => setActiveMenu(activeMenu === menu.name ? null : menu.name)}
                        >{menu.name}
                        </button>
                        <div className={styles.submenus + ` ${activeMenu === menu.name || (path.length >= 2 && path[1] === menu.slug) ? `${styles.active}` : ''}`}>
                          {menu.submenus.map(submenu => {
                            return (
                              <Link
                                key={submenu.recordId}
                                className={styles.link}
                                activeClassName={styles.active}
                                to={submenu.path}
                              >
                                {submenu.name}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    {menu.submenus.length <= 1 &&
                      <Link key={menu.id} to={menu.path} className={styles.menuItem} activeClassName={styles.active} partiallyActive>
                        {menu.name}
                      </Link>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.search}>
        <button className={styles.menuButton} onClick={handleSideBar}>
          {!sidebarOpen &&
            <img className={styles.menuIcon} src='/grid.svg' alt='' />}
          {sidebarOpen &&
            <img className={styles.menuIcon} src='/grid-open.svg' alt='' />}
        </button>
        <input className={styles.input + `${searchTerm ? ` ${styles.filled}` : ''}`} value={searchTerm} onChange={handleSetSearchTerm} />
      </div>
      {(all || searchResults || ((productMenu && submenu) || (productMenu && productMenu.submenus.length === 0))) ? (
        <div className={styles.items}>
          <div className={styles.header}>
            {searchResults.length > 0 ? (
              <h1 className={styles.title}>Search results</h1>
            ) : productMenu && submenu.name ? (
              <h1 className={styles.title}>{productMenu.name} // <span className={styles.span}>{submenu.name}</span></h1>
            ) : productMenu ? (
              <h1 className={styles.title}>{productMenu.name}</h1>
            ) : all ? (
              <h1 className={styles.title}>All products & equipment</h1>
            ) : null}
          </div>
          <div className={styles.products}>
            {items.map(product => {
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
              // const handleAddToQuote = e => {
              //   e.preventDefault()
              //   const newQuote = [...context.quote]
              //   newQuote.push({
              //     id: product.id,
              //     recordId: product.recordId,
              //     name: product.name,
              //     image: product.images && product.images.length && product.images[0],
              //     options: initOptions(),
              //     notes: '',
              //     path: product.path,
              //     quantity: 1
              //   })
              //   context.setQuote(newQuote)
              // }
              return (
                <div key={product.recordId} className={styles.product}>
                  <Link to={product.path}><div className={styles.image} style={{ backgroundImage: `url(${product.images && product.images[0]})` }} /></Link>
                  <div className={styles.detail}>
                    <Link className={styles.name} to={product.path}>{product.name}</Link>
                    <p className={styles.description}>{product.summary}</p>
                    {product.documents && product.documents[0] && <a className={styles.download} href={product.documents[0]} target='_blank' rel='noopener noreferrer'>PDF</a>}
                  </div>
                  <Link to={product.path} className={styles.button}>
                    {/* <svg className={styles.add} viewBox='0 0 500 500' fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit={2} onClick={handleAddToQuote}>
                      <path d='M250 0c137.979 0 250 112.021 250 250 0 137.979-112.021 250-250 250C112.021 500 0 387.979 0 250 0 112.021 112.021 0 250 0zm0 33.333c119.582 0 216.667 97.085 216.667 216.667 0 119.582-97.085 216.667-216.667 216.667-119.582 0-216.667-97.085-216.667-216.667 0-119.582 97.085-216.667 216.667-216.667z' fill='#EBE5E5' />
                      <path fill='#d50f0a' d='M220.5 123.5h59v253h-59z' />
                      <path fill='#d50f0a' d='M376.5 220.5v59h-253v-59z' />
                    </svg> */}
                    select details
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </section>
  ) : null
}
