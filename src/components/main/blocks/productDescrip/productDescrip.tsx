import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'gatsby'
import styles from './productDescrip.module.scss'
import { Image, link } from '../../../../functions'
import productIndex from '../productIndex/productIndex'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(block.product && block.product.length > 0 ? block.product[0].category : "");
  const [element, setElement] = useState(null);
  const [height, setHeight] = useState(null);
  const highlighter = useRef(null);
  const container = useRef(null);
  const [highlightTop, setHighlightTop] = useState(null)
  const [highlightBottom, setHighlightBottom] = useState(null)
  const pageLinkOne = block.buttonOne ? link(block.buttonOne.buttonOneLink) : null;
  const pageLinkTwo = block.buttonTwo ? link(block.buttonTwo.buttonTwoLink) : null;
  
  const handleClick = (e) => {
    setSelected(e.target.innerText);
    const targetHeight = e.target.offsetHeight;
    const highlightBoundary = highlighter.current.getBoundingClientRect();
    const selectedBoundary = e.target.getBoundingClientRect();
    const containerBoundary = container.current.getBoundingClientRect();
    
    if (highlightBoundary.bottom < selectedBoundary.bottom) {
      setHighlightTop(`${(highlightBoundary.top - containerBoundary.top) / window.innerWidth * 100}vw`);
      setHighlightBottom('auto');
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
      setSelected(block.product && block.product.length > 0 ? block.product[0].category : "");
      if (highlighter.current) {
        if (window.innerWidth <= 1023)
          highlighter.current.style.top = '19vw';
        else {
          highlighter.current.style.top = '16.2vw';
          highlighter.current.style.transform = 'translateY(0px)';
        }
      }
    })
  },[selected])

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
          {block.buttonOne && pageLinkOne &&
          <Link to={pageLinkOne}>
            <button className={styles.button}>{block.buttonOne.buttonOneText}
              <span>
                {block.buttonOne.buttonOneIcon && <Image className={styles.icon} src={block.buttonOne.buttonOneIcon} images={images} />}
              </span>
            </button>
          </Link>}
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
            {block.buttonTwo && pageLinkTwo && 
              <Link className={styles.buttonContainer} to={pageLinkTwo}>
                <button className={styles.buttonTwo}>{block.buttonTwo.buttonTwoText}
                  <span>
                    {block.buttonTwo.buttonTwoIcon && <Image className={styles.icon} src={block.buttonTwo.buttonTwoIcon} images={images} />}
                  </span>
                </button>
              </Link>}
        </div>
      </div>
    </div>
  )
}  
