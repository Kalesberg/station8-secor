import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

import { Accessories, Account, ArticlesGrid, BasicContactForm, Blank, CareersCTA, CareersGrid, ContactForm, ContactFullPage, FabAnimation, FullInteractiveMarkets, Hero, HistorySlider, InteractiveMarkets, InteractiveTools, JoinTeam, Locations, PipeSlider, PipeVideo, ProductDescrip, ProductIndex, Quote, SimpleImageText, SimpleText, Stats, Training } from '../../components/main/blocks'

import styles from './main.module.scss'

export default ({ blocks, children, menuOpen, setMenuOpen, setUserMenuOpen, scrollListener, scrollPosition, menu, location, options, careers }) => {
  const closeMenu = () => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }

  const animationStyle = 'animate__fadeIn'

  return (
    <main onScroll={scrollListener} onMouseOver={closeMenu} className={styles.main + `${menuOpen ? ` ${styles.hidden}` : ''}`} id='main'>
      {blocks && blocks.length ? (
        <div className={styles.blocks}>
          {blocks && blocks.map((block, i) => {
            return block.template === 'main-account' ? (
              <Account key={i} location={location} options={options} search={location.search} />
            ) : block.template === 'main-articles-grid' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <ArticlesGrid block={block} search={location.search} />
              </ScrollAnimation>
            ) : block.template === 'main-basic-contact-form' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <BasicContactForm block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-block-accessories' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <Accessories block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-block-full-interactive-markets' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <FullInteractiveMarkets block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-block-history-slider' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <HistorySlider block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-block-join-our-team' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <JoinTeam block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-block-pipe-slide' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <PipeSlider block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-block-pipe-video' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <PipeVideo block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-block-simple-image-text' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <SimpleImageText block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-block-stats' ? (
              <Stats key={i} block={block} scrollPosition={scrollPosition} />
            ) : block.template === 'main-block-simple-text' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <SimpleText block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-block-training' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <Training block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-blank' ? (
              <Blank key={i} />
            ) : block.template === 'main-contact-form' ? (
              <ContactForm key={i} block={block} />
            ) : block.template === 'main-contact-full-page' ? (
              <ContactFullPage key={i} block={block} />
            ) : block.template === 'main-careers-cta' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <CareersCTA block={block} careers={careers} />
              </ScrollAnimation>
            ) : block.template === 'main-careers-grid' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <CareersGrid careers={careers} search={location.search} />
              </ScrollAnimation>
            ) : block.template === 'main-fabrication-animation' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <FabAnimation block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-hero' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <Hero block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-interactive-markets' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <InteractiveMarkets block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-interactive-tools' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <InteractiveTools block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-locations' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <Locations block={block} search={location.search} />
              </ScrollAnimation>
            ) : block.template === 'main-product-descriptions' ? (
              <ScrollAnimation key={i} animateIn={animationStyle} animateOnce scrollableParentSelector='#main' offset={150}>
                <ProductDescrip block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-product-index' ? (
              <ProductIndex menu={menu} key={i} location={location} />
            ) : block.template === 'main-quote' ? (
              <Quote key={i} options={options} menu={menu} />
            ) : <h1 key={i} className={styles.title}>{block.template} under development</h1>
          })}
        </div>
      )
        : null}
      {children}
    </main>
  )
}
