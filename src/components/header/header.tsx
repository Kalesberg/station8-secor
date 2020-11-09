import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'

import { Burger, CallButton, ContactButton, FillSpace, Logo, Navigation, QuoteMenu, UserMenu } from './blocks'

import styles from './header.module.scss'

import headerConfig from '../../../.forestry/content/settings/header.json'

export default ({ pages, menuOpen, setMenuOpen, menu, location, userMenuOpen, setUserMenuOpen, mobileMenuOpen, setMobileMenuOpen }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [levelOne, setLevelOne] = useState(0)
  const [levelTwo, setLevelTwo] = useState(0)
  const [activeSubcategory, setActiveSubcategory] = useState(undefined)
  const [searchResults, setSearchResults] = useState([])

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

  const handleCloseMenus = () => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <Burger mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} handleCloseMenus={handleCloseMenus} />
      <div className={styles.menu + `${menuOpen ? ` ${styles.active}` : ''}`}>
        {headerConfig.blocks.map((block, i: number) => {
          return block.template === 'header-call-button' ? (
            <CallButton key={i} block={block} handleCloseMenus={handleCloseMenus} />
          ) : block.template === 'header-contact-button' ? (
            <ContactButton key={i} block={block} handleCloseMenus={handleCloseMenus} />
          ) : block.template === 'header-fill-space' ? (
            <FillSpace key={i} handleCloseMenus={handleCloseMenus} />
          ) : block.template === 'header-logo' ? (
            <Logo key={i} block={block} />
          ) : block.template === 'header-links' ? (
            <Navigation key={i} block={block} pages={pages} setMenuOpen={setMenuOpen} location={location} />
          ) : block.template === 'header-quote-menu' ? (
            <QuoteMenu key={i} block={block} handleCloseMenus={handleCloseMenus} />
          ) : block.template === 'header-user-menu' ? (
            <UserMenu key={i} block={block} userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} location={location} />
          ) : <p key={i}>{block.template} not defined</p>
        })}
      </div>
      <div className={styles.megaMenu + `${menuOpen ? ` ${styles.open}` : ''}` + `${searchTerm ? ` ${styles.searching}` : ''}`}>
        <div className={styles.search}>
          <p className={styles.label}>Know exactly what you're looking for?</p>
          <input className={styles.input + `${searchTerm ? ` ${styles.filled}` : ''}`} value={searchTerm} onChange={handleSetSearchTerm} />
        </div>
        <div className={styles.resultsContainer}>
          {searchTerm && (
            <>
              <div className={styles.resultsHeader}>
                <p className={styles.resultsText}>we have found {searchResults.length} result{searchResults.length !== 1 && 's'} for <strong>"{searchTerm}"</strong></p>
              </div>
              <div className={styles.results}>
                {searchResults.map(product => {
                  // console.log('product', product)
                  return (
                    <div key={product.recordId} className={styles.product}>
                      <Link to={product.path} className={styles.image} style={{ backgroundImage: `url(${product.images && product.images[0]})` }}>
                        <svg className={styles.add} viewBox='0 0 500 500' fillRule='evenodd' clipRule='evenodd' strokeLinejoin='round' strokeMiterlimit={2}>
                          <path d='M250 0c137.979 0 250 112.021 250 250 0 137.979-112.021 250-250 250C112.021 500 0 387.979 0 250 0 112.021 112.021 0 250 0zm0 33.333c119.582 0 216.667 97.085 216.667 216.667 0 119.582-97.085 216.667-216.667 216.667-119.582 0-216.667-97.085-216.667-216.667 0-119.582 97.085-216.667 216.667-216.667z' fill='#d50f0a' />
                          <path fill='#d50f0a' d='M220.5 123.5h59v253h-59z' />
                          <path fill='#d50f0a' d='M376.5 220.5v59h-253v-59z' />
                        </svg>
                      </Link>
                      <div className={styles.detail}>
                        <Link className={styles.name} to={product.path}>{product.name}</Link>
                        <p className={styles.description}>{product.summary}</p>
                        {product.documents && product.documents[0] && <a className={styles.download} href={product.documents[0]} target='_blank' rel='noopener noreferrer'>PDF</a>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
        <div className={styles.menu}>
          {menu.map((category, i) => {
            const handleSetCategory = () => {
              setLevelOne(0)
              setLevelTwo(0)
              setActiveSubcategory(category.menus[0].submenus[0])
            }
            return (
              <div key={category.id} className={styles.categoryContainer}>
                <div className={styles.cover} style={{ backgroundImage: `url(${category.image})` }} onMouseOver={handleSetCategory}>
                  <p className={styles.name}>{category.name}</p>
                </div>
                <div className={styles.left}>
                  <p className={styles.title}>{category.name}</p>
                  <div className={styles.menus}>
                    <div className={styles.menuOne}>
                      {category.menus.map((menu, i) => {
                        const handleSetLevelOne = () => {
                          setLevelOne(i)
                          setLevelTwo(0)
                          setActiveSubcategory(menu.submenus[0])
                        }
                        return (
                          <div key={menu.id} className={styles.menuItem + `${i === levelOne ? ` ${styles.active}` : ''}`} onMouseOver={handleSetLevelOne}>
                            <p className={styles.name}>{menu.name}</p>
                            <svg className={styles.chevron} viewBox='0 0 14 14' fillRule='evenodd' clipRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
                              <path d='M4 13l6-6-6-6' fill='none' strokeWidth={2} />
                            </svg>
                          </div>
                        )
                      })}
                    </div>
                    <div className={styles.menuTwo}>
                      {category.menus[levelOne] && category.menus[levelOne].submenus.map((submenu, i) => {
                        const handleSetLevelTwo = () => {
                          setLevelTwo(i)
                          setActiveSubcategory(submenu)
                        }

                        return (
                          <div key={submenu.id} className={styles.menuItem + `${i === levelTwo ? ` ${styles.active}` : ''}`} onMouseOver={handleSetLevelTwo}>
                            <Link to={submenu.path} className={styles.name}>{submenu.name || 'All'}</Link>
                            <svg className={styles.chevron} viewBox='0 0 14 14' fillRule='evenodd' clipRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
                              <path d='M4 13l6-6-6-6' fill='none' strokeWidth={2} />
                            </svg>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  {menu[i] && menu[i].menus[levelOne] && menu[i].menus[levelOne].submenus[levelTwo] && menu[i].menus[levelOne].submenus[levelTwo] && (
                    <>
                      {menu[i].menus[levelOne].submenus[levelTwo].image && <div className={styles.image} style={{ backgroundImage: `url(${menu[i].menus[levelOne].submenus[levelTwo].image})` }} />}
                      <p className={styles.description}>{menu[i].menus[levelOne].submenus[levelTwo].description}</p>
                      {activeSubcategory && activeSubcategory.path && <Link to={activeSubcategory.path} className={styles.button}>View {menu[i] ? menu[i].name.toLowerCase() : 'products'}</Link>}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </header>
  )
}
