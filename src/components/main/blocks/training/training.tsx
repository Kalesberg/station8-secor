import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'gatsby'
import styles from './training.module.scss'
import { Image, link } from '../../../../functions'
import HorizontalHighlight from '../highlighters/horizontalHighlight'
import articlesGrid from '../articlesGrid/articlesGrid'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(block.categories && block.categories.length > 0 ? block.categories[0].category : "")
  const [target, setTarget] = useState(null);
  const container = useRef(null);
  const pageLinkOne = block.buttonLink ? link(block.buttonLink) : null;
  
  const handleClick = (e) => {
    setSelected(e.target.innerText);
    setTarget(e.target);
  }
  function resetHighlight() {
    setSelected(block.categories && block.categories.length > 0 ? block.categories[0].category : "");
    setTarget(container.current && container.current.firstElementChild);
  }
  useEffect(() => {
    if (container.current)
      setTarget(container.current.children[0]);
    window.addEventListener('resize', resetHighlight);
    return () => {
      window.removeEventListener('resize', resetHighlight)
    }
  },[container])
  return (
    <section className={styles.section}>
      <div className={styles.categoryContainer}>
        <div className={styles.categories} ref={container}>
          {block.categories && block.categories.map((category, i) => {
            return (
              <div onClick={handleClick} key={i} className={styles.category + ` ${selected.toLowerCase() === category.category.toLowerCase() ? `${styles.categoryShow}` : ""}`}>
                {category.category}
              </div>
            )
          })}
          <HorizontalHighlight container={container} target={target} />
        </div>
      </div>  
        <div className={styles.first + ` ${selected.toLowerCase() === block.categories[0].category.toLowerCase() ? `${styles.firstShow}` : ""}` }>
          {block.image && <Image className={styles.image} src={block.image} images={images} />}
          <div className={styles.textContainer}>
            <p>{block.description && block.description}</p>
            {block.buttonText && block.buttonLink &&
            <Link to={block.buttonLink}>
              <button className={styles.button}>{block.buttonText}
                <span>
                  {block.icon && <Image className={styles.icon} src={block.icon} images={images} />}
                </span>
              </button>
            </Link>}
          </div>
        </div>
        {/* <div className={styles.articles + ` ${selected.toLowerCase() === 'articles' ? `${styles.articlesShow}` : ""}`}>
          {articles.filter(article => article.tags.includes('training')).map((article, i) => {

          })}
        </div> */}
    </section>
  )
}  