import React, { useContext, useEffect, useState } from 'react'

import { Context } from '../context/context'
import { CallButton, ContactButton, ContactFormWithVideoBackground, ContactInfo, FavoritePage, FeaturedPage, FillSpace, Logo, Navigation, Search, QuoteMenu, UserMenu } from './blocks'

import styles from './header.module.scss'

import headerConfig from '../../../.forestry/content/settings/header.json'
import contactInfo from '../../../.forestry/content/settings/contact.json'

export default ({ images, pages, menuOpen, setMenuOpen }) => {
  const context = useContext(Context)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState(0)
  const [levelOne, setLevelOne] = useState(0)
  const [levelTwo, setLevelTwo] = useState(0)

  useEffect(() => {
    console.log('levelOne', levelOne)
  }, [levelOne])

  useEffect(() => {
    console.log('levelTwo', levelTwo)
  }, [levelTwo])

  useEffect(() => {
    console.log('category', category)
  }, [category])

  return typeof window ? (
    <header className={styles.header}>
      {/* {!menuOpen && <img className={styles.menuButton} alt='Open menu' src='' onClick={() => setMenuOpen(!menuOpen)} />}
    {menuOpen && <img className={styles.menuButton + ` ${styles.closeButton}`} alt='Close menu' src='' onClick={() => setMenuOpen(!menuOpen)} />} */}
      <div className={styles.menu + `${menuOpen ? ` ${styles.active}` : ''}`}>
        {headerConfig.blocks.map((block, i: number) => {
          return block.template === 'header-call-button' ? (
            <CallButton key={i} block={block} />
          ) : block.template === 'header-contact-button' ? (
            <ContactButton key={i} block={block} images={images} />
          ) : block.template === 'header-contact-form-with-video-background' ? (
            <ContactFormWithVideoBackground key={i} block={block} images={images} menuOpen={menuOpen} />
          ) : block.template === 'header-contact-info' ? (
            <ContactInfo key={i} contactInfo={contactInfo} />
          ) : block.template === 'header-favorite-page' ? (
            <FavoritePage key={i} block={block} images={images} pages={pages} />
          ) : block.template === 'header-featured-page' ? (
            <FeaturedPage key={i} block={block} pages={pages} />
          ) : block.template === 'header-fill-space' ? (
            <FillSpace key={i} />
          ) : block.template === 'header-logo' ? (
            <Logo key={i} block={block} images={images} />
          ) : block.template === 'header-links' ? (
            <Navigation key={i} block={block} pages={pages} setMenuOpen={setMenuOpen} />
          ) : block.template === 'header-search' ? (
            <Search key={i} block={block} images={images} />
          ) : block.template === 'header-quote-menu' ? (
            <QuoteMenu key={i} block={block} images={images} />
          ) : block.template === 'header-user-menu' ? (
            <UserMenu key={i} block={block} images={images} />
          ) : <p key={i}>{block.template} not defined</p>
        })}
      </div>
      <div className={styles.megaMenu + `${menuOpen ? ` ${styles.open}` : ''}`}>
        <div className={styles.search}>
          <p className={styles.label}>Know exactly what you're looking for?</p>
          <input className={styles.input + `${searchTerm ? ` ${styles.filled}` : ''}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className={styles.menu}>
          {context && context.menu.map((category, i) => {
            const handleSetCategory = () => {
              setCategory(i)
              setLevelOne(0)
              setLevelTwo(0)
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
                        const handleSetLevelTwo = () => setLevelTwo(i)

                        return (
                          <div key={submenu.id} className={styles.menuItem + `${i === levelTwo ? ` ${styles.active}` : ''}`} onMouseOver={handleSetLevelTwo}>
                            <p className={styles.name}>{submenu.name || 'All'}</p>
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
                  {context && context.menu[i] && context && context.menu[i].menus[levelOne] && context && context.menu[i].menus[levelOne].submenus[levelTwo] && context && context.menu[i].menus[levelOne].submenus[levelTwo] ? (
                    <>
                      {context && context.menu[i].menus[levelOne].submenus[levelTwo].image && <div className={styles.image} style={{ backgroundImage: `url(${context && context.menu[i].menus[levelOne].submenus[levelTwo].image})` }} />}
                      <p className={styles.description}>{context && context.menu[i].menus[levelOne].submenus[levelTwo].description}</p>
                      <div className={styles.button}>View {context && context.menu[i] ? context && context.menu[i].name.toLowerCase() : 'products'}</div>
                    </>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.results} />
      </div>
    </header>
  ) : null
}
