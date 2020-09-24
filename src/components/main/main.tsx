import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

import { AnimatedImage, ArticlesGrid, ArticlesSlider, Cities, CompanyMerger, ContactForm3seas, ContentColumns, ContentTabs, FeaturedArticles, FilteredImagesSlider, Gallery, Hero3Seas, HeroSlider, Highlights, ImageBar, Images, Infographic, KnowledgeBase, Leadership, Map, Posts, RecentArticles, RichText, Slideshow, StaticImage, Testimonial } from '../../components/main/blocks'

import styles from './main.module.scss'

export default ({ blocks, children, images, menuOpen, scrollListener, articles, pages, tag, toggleForm }) => (
  <main onScroll={scrollListener} className={styles.main + `${menuOpen ? ` ${styles.hidden}` : ''}`} id='main'>
    <div className={styles.blocks}>
      {blocks && blocks.map((block, i) => {
        return block.template === 'main-animated-image' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <AnimatedImage key={i} block={block} images={images} />
          </ScrollAnimation>
        ) : block.template === 'main-articles-grid' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <ArticlesGrid key={i} block={block} images={images} articles={articles} pages={pages} tag={tag} />
          </ScrollAnimation>
        ) : block.template === 'main-articles-slider' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <ArticlesSlider key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-cities' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <Cities key={i} block={block} images={images} toggleForm={toggleForm} />
          </ScrollAnimation>
        ) : block.template === 'main-company-merger' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <CompanyMerger key={i} block={block} images={images} />
          </ScrollAnimation>
        ) : block.template === 'main-contact-form-3seas' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <ContactForm3seas key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-content-columns' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <ContentColumns key={i} block={block} images={images} />
          </ScrollAnimation>
        ) : block.template === 'main-content-tabs' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <ContentTabs key={i} block={block} images={images} />
          </ScrollAnimation>
        ) : block.template === 'main-featured-articles' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <FeaturedArticles key={i} block={block} images={images} articles={articles} pages={pages} />
          </ScrollAnimation>
        ) : block.template === 'main-filtered-images-slider' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <FilteredImagesSlider key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-gallery' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <Gallery key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-hero-3-seas' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <Hero3Seas key={i} block={block} images={images} />
          </ScrollAnimation>
        ) : block.template === 'main-hero-slider' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <HeroSlider key={i} block={block} images={images} />
          </ScrollAnimation>
        ) : block.template === 'main-highlights' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <Highlights key={i} block={block} images={images} toggleForm={toggleForm} />
          </ScrollAnimation>
        ) : block.template === 'main-image-bar' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <ImageBar key={i} block={block} images={images} />
          </ScrollAnimation>
        ) : block.template === 'main-images' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <Images key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-infographic' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <Infographic key={i} block={block} images={images} />
          </ScrollAnimation>
        ) : block.template === 'main-knowledge-base' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <KnowledgeBase key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-leadership' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <Leadership key={i} block={block} images={images} />
          </ScrollAnimation>
        ) : block.template === 'main-map' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <Map key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-posts' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <Posts key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-recent-articles' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <RecentArticles key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-rich-text' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <RichText key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-slideshow' ? (
          <ScrollAnimation animateIn='animate__fadeIn' animateOnce scrollableParentSelector='#main' offset={150}>
            <Slideshow key={i} block={block} />
          </ScrollAnimation>
        ) : block.template === 'main-static-image' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <StaticImage key={i} block={block} images={images} pages={pages} toggleForm={toggleForm} />
          </ScrollAnimation>
        ) : block.template === 'main-testimonial' ? (
          <ScrollAnimation animateIn='animate__fadeInUp' animateOnce scrollableParentSelector='#main' offset={150}>
            <Testimonial key={i} block={block} images={images} />
          </ScrollAnimation>
        ) : <p key={i}>{block.template} not defined</p>
      })}
    </div>
    {children}
  </main>
)