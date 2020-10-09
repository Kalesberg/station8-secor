import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'gatsby'
import styles from './productDescrip.module.scss'
import { Image, link } from '../../../../functions'
import productIndex from '../productIndex/productIndex'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(block.product && block.product.length > 0 ? block.product[0].category : "");
  const [height, setHeight] = useState(null);
  const highlighter = useRef(null);
  const container = useRef(null);
  const [highlightTop, setHighlightTop] = useState(null)
  const [highlightBottom, setHighlightBottom] = useState(null)

  const handleClick = (e) => {
    setSelected(e.target.innerText);
    const targetHeight = e.target.offsetHeight;
    const highlightBoundary = highlighter.current.getBoundingClientRect();
    const selectedBoundary = e.target.getBoundingClientRect();
    const containerBoundary = container.current.getBoundingClientRect();
    
    if (highlightBoundary.bottom < selectedBoundary.bottom) {
      setHighlightTop(`${(highlightBoundary.top - containerBoundary.top) / window.innerWidth * 100}vw`);
      setHighlightBottom('auto')
      setHeight(`${(selectedBoundary.bottom - highlightBoundary.top) / window.innerWidth * 100}vw`);
      setTimeout(() => {
        setHighlightTop(`${(selectedBoundary.top - containerBoundary.top) / window.innerWidth * 100}vw`);
        setHeight(`${targetHeight / window.innerWidth * 100}vw`)
      }, 400)  
    } else if (highlightBoundary.top > selectedBoundary.top) {
      setHighlightTop('auto');
      setHighlightBottom(`${(containerBoundary.bottom - highlightBoundary.bottom) / window.innerWidth * 100}vw`);
      setHeight(`${(highlightBoundary.bottom - selectedBoundary.top) / window.innerWidth * 100}vw`);
      setTimeout(() => {
        setHighlightBottom(`${(containerBoundary.bottom - selectedBoundary.bottom) / window.innerWidth * 100}vw`);
        setHeight(`${targetHeight / window.innerWidth * 100}vw`);
      }, 400)
    }  
  }

  useEffect(() => {
    window.addEventListener('resize', () => {

    })
  })

  return (
    <div className={styles.container} ref={container}>
      <h2 className={styles.heading}>{block.heading && block.heading}</h2>
      <div className={styles.products}>
        <div className={styles.scroll} ref={highlighter} 
          style={{height: height, top: highlightTop ? highlightTop : "", bottom: highlightBottom ? highlightBottom : ""}}></div>
        <div className={styles.categories}>
          {block.product && block.product.length > 0 && block.product.map((prod, i) => {
            return (
              <div key={i}  className={styles.category + ` ${prod.category && 
                (selected === prod.category || (!selected && i === 0))  ? `${styles.categorySelected}` : ""}`} 
                onClick={handleClick}>{prod.category && prod.category}</div>
            )
          })}
        </div>
        <div className={styles.infoContainer}>
          {block.product && block.product.length > 0 && block.product.map((prod, i) => {
            return (
              <div key={i} className={styles.info + ` ${prod.category && selected === prod.category ? `${styles.infoShow}` : ""}`}>
                <div className={styles.imgContainer}><Image className={styles.image} src={prod.image && prod.image} images={images} /></div>
                <div className={styles.descripContainer}>
                  <div className={styles.categoryHeading}>{prod.category && prod.category}</div>
                  <div className={styles.heading}>{prod.heading && prod.heading}</div>
                  <div className={styles.description}>{prod.description && prod.description}</div>
                </div>
              </div>  
            )
            })}
        </div>
      </div>
    </div>
  )
}  
