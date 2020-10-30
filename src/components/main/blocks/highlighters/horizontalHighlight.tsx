import React, { useEffect, useState, useRef } from 'react'
import styles from './horizontalHighlight.module.scss'

export default ({ target, container }) => {
  const highlighter = useRef(null);
  const [width, setWidth] = useState(null);
  const [highlightLeft, setHighlightLeft] = useState(null)
  const [highlightRight, setHighlightRight] = useState(null)

  useEffect(() => {
    if (target) {
      setWidth(target.offsetWidth)
      const targetWidth = target.offsetWidth;
      const highlightBoundary = highlighter.current.getBoundingClientRect();
      const selectedBoundary = target.getBoundingClientRect();
      const containerBoundary = container.current.getBoundingClientRect();
      
      if (highlightBoundary.left < selectedBoundary.left) {
        setHighlightLeft(`${(highlightBoundary.left - containerBoundary.left) / window.innerWidth * 100}vw`);
        setHighlightRight('auto');
        setWidth(`${(selectedBoundary.right - highlightBoundary.left) / window.innerWidth * 100}vw`);
        setTimeout(() => {
          setHighlightLeft(`${(selectedBoundary.left - containerBoundary.left) / window.innerWidth * 100}vw`);
          setWidth(`${targetWidth / window.innerWidth * 100}vw`)
        }, 400)  
      } else if (highlightBoundary.left > selectedBoundary.left) {
        setHighlightLeft('auto');
        setHighlightRight(`${(containerBoundary.right - highlightBoundary.right) / window.innerWidth * 100}vw`);
        setWidth(`${(highlightBoundary.right - selectedBoundary.left) / window.innerWidth * 100}vw`);
        setTimeout(() => {
          setHighlightRight(`${(containerBoundary.right - selectedBoundary.right) / window.innerWidth * 100}vw`);
          setWidth(`${targetWidth / window.innerWidth * 100}vw`);
        }, 400)
      }
    }   
  }, [target, container, highlighter])

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (highlighter.current) {
        highlighter.current.style.left = '0';
        highlighter.current.style.width = `${container.current.firstElementChild.offsetWidth / window.innerWidth * 100}vw`;
      }
    })
  },[])

  return (
    <div className={styles.highlighter} ref={highlighter} 
      style={{width: width, left: highlightLeft ? highlightLeft : "", right: highlightRight ? highlightRight : ""}}>
    </div>
  )
}  