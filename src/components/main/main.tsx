import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

import { Account, AnimatedImage, ArticlesGrid, ArticlesSlider, Blank, Cities, CompanyMerger, ContentColumns, ContentTabs, FabAnimation, FeaturedArticles, FilteredImagesSlider, Gallery, Hero, HeroSlider, Highlights, ImageBar, Images, Infographic, KnowledgeBase, Leadership, Map, ProductDescrip, ProductIndex, Posts, Quote, RecentArticles, RichText, Slideshow, StaticImage, Testimonial } from '../../components/main/blocks'

import styles from './main.module.scss'

export default ({ blocks, children, images, menuOpen, setMenuOpen, setUserMenuOpen, scrollListener, articles, pages, tag, toggleForm, menu, location }) => {
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
              <Account key={i} location={location} />
            ) : block.template === 'main-animated-image' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <AnimatedImage block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-articles-grid' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <ArticlesGrid block={block} images={images} articles={articles} pages={pages} tag={tag} />
              </ScrollAnimation>
            ) : block.template === 'main-articles-slider' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <ArticlesSlider block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-blank' ? (
              <Blank key={i} />
            ) : block.template === 'main-cities' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <Cities block={block} images={images} toggleForm={toggleForm} />
              </ScrollAnimation>
            ) : block.template === 'main-company-merger' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <CompanyMerger block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-content-columns' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <ContentColumns block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-content-tabs' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <ContentTabs block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-featured-articles' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <FeaturedArticles block={block} images={images} articles={articles} pages={pages} />
              </ScrollAnimation>
            ) : block.template === 'main-filtered-images-slider' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <FilteredImagesSlider block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-gallery' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <Gallery block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-hero' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <Hero block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-hero-slider' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <HeroSlider block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-highlights' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <Highlights block={block} images={images} toggleForm={toggleForm} />
              </ScrollAnimation>
            ) : block.template === 'main-image-bar' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <ImageBar block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-images' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <Images block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-infographic' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <Infographic block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-knowledge-base' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <KnowledgeBase block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-leadership' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <Leadership block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-map' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <Map block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-posts' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <Posts block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-fabrication-animation' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <FabAnimation block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-product-descriptions' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <ProductDescrip block={block} images={images} />
              </ScrollAnimation>
            ) : block.template === 'main-product-index' ? (
              <ProductIndex menu={menu} key={i} location={location} />
            ) : block.template === 'main-quote' ? (
              <Quote key={i} />
            ) : block.template === 'main-recent-articles' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <RecentArticles block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-rich-text' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <RichText block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-slideshow' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeIn' animateOnce scrollableParentSelector='#main' offset={150}>
                <Slideshow block={block} />
              </ScrollAnimation>
            ) : block.template === 'main-static-image' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
                <StaticImage block={block} images={images} pages={pages} toggleForm={toggleForm} />
              </ScrollAnimation>
            ) : block.template === 'main-testimonial' ? (
              <ScrollAnimation key={i} animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
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
