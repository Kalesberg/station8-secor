import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

import { Accessories, Account, AnimatedImage, ArticlesGrid, ArticlesSlider, BasicContactForm, Blank, CareersCTA, CareersGrid, Cities, CompanyMerger, ContactForm, ContentColumns, ContentTabs, FabAnimation, FeaturedArticles, FilteredImagesSlider, FullInteractiveMarkets, Gallery, Hero, HeroSlider, Highlights, HistorySlider, ImageBar, Images, Infographic, InteractiveMarkets, InteractiveTools, JoinTeam, KnowledgeBase, Leadership, Map, PipeSlider, PipeVideo, ProductDescrip, ProductIndex, Posts, Quote, RecentArticles, RichText, SimpleImageText, SimpleText, Slideshow, StaticImage, Stats, Testimonial, Training } from '../../components/main/blocks'

import styles from './main.module.scss'

export default ({ blocks, children, images, menuOpen, setMenuOpen, setUserMenuOpen, scrollListener, scrollPosition, articles, pages, toggleForm, menu, location, options, careers }) => {
  const closeMenu = () => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }

  return (
    <main onScroll={scrollListener} onMouseOver={closeMenu} className={styles.main + `${menuOpen ? ` ${styles.hidden}` : ''}`} id='main'>
      {blocks && blocks.length ? (
        <div className={styles.blocks}>
          {blocks && blocks.map((block, i) => {
            return block.template === 'main-account' ? (
              <Account key={i} location={location} options={options} search={location.search} />
            ) : block.template === 'main-animated-image' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <AnimatedImage block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-articles-grid' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <ArticlesGrid block={block} images={images} articles={articles} search={location.search} />
              </ScrollAnimation>
            ) : block.template === 'main-articles-slider' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <ArticlesSlider block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-basic-contact-form' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <BasicContactForm block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-block-accessories' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Accessories block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-block-full-interactive-markets' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <FullInteractiveMarkets block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-block-history-slider' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <HistorySlider block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-block-join-our-team' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <JoinTeam block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-block-pipe-slide' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <PipeSlider block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-block-pipe-video' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <PipeVideo block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-block-simple-image-text' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <SimpleImageText block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-block-stats' ? (
              // <ScrollAnimation key={i} animateIn='animate__fadeInDown' animateOnce scrollableParentSelector='#main' offset={150}>
              <Stats key={i} block={block} images={images} scrollPosition={scrollPosition} />
            ) : block.template === 'main-block-simple-text' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <SimpleText block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-block-training' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Training block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-blank' ? (
              <Blank key={i} />
            ) : block.template === 'main-contact-form' ? (
              <ContactForm key={i} block={block} images={images} />
            ) : block.template === 'main-careers-cta' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <CareersCTA block={block} images={images} careers={careers} />
              </ScrollAnimation>
            ) : block.template === 'main-careers-grid' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <CareersGrid careers={careers} search={location.search} />
              </ScrollAnimation>
            ) : block.template === 'main-cities' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Cities block={block} images={images} toggleForm={toggleForm} />
              </ScrollAnimation>
            ) : block.template === 'main-company-merger' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <CompanyMerger block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-content-columns' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <ContentColumns block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-content-tabs' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <ContentTabs block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-fabrication-animation' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <FabAnimation block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-featured-articles' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <FeaturedArticles block={block} images={images} articles={articles} pages={pages} />
              </ScrollAnimation>
            ) : block.template === 'main-filtered-images-slider' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <FilteredImagesSlider block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-gallery' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Gallery block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-hero' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Hero block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-hero-slider' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <HeroSlider block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-highlights' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Highlights block={block} images={images} toggleForm={toggleForm} />
              </ScrollAnimation>
            ) : block.template === 'main-image-bar' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <ImageBar block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-images' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Images block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-infographic' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Infographic block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-interactive-markets' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <InteractiveMarkets block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-interactive-tools' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <InteractiveTools block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-knowledge-base' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <KnowledgeBase block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-leadership' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Leadership block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-map' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Map block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-posts' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Posts block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-product-descriptions' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <ProductDescrip block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-product-index' ? (
              <ProductIndex menu={menu} key={i} location={location} />
            ) : block.template === 'main-quote' ? (
              <Quote key={i} options={options} menu={menu} />
            ) : block.template === 'main-recent-articles' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <RecentArticles block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-rich-text' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <RichText block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-slideshow' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Slideshow block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-static-image' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <StaticImage block={block} images={images} pages={pages} toggleForm={toggleForm} />
              </ScrollAnimation>
            ) : block.template === 'main-testimonial' ? (
              <ScrollAnimation key={i} animateIn='animate__zoomIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Testimonial block={block} images={images} />
              </ScrollAnimation>
            ) : <h1 key={i} className={styles.title}>{block.template} under development</h1>
          })}
        </div>
      )
        : null}
      {children}
    </main>
  )
}
