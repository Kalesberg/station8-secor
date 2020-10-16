import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './pipeSlider.module.scss'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(0);
  const ref = useRef(null);

  const moveRight = (e) => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollLeft + ref.current.offsetWidth;
      setSelected(selected + 1);
    }  
  }
  const moveLeft = (e) => {
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollLeft - ref.current.offsetWidth;
      setSelected(selected - 1);
    }  
  }
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (ref.current) {
        ref.current.scrollLeft = 0;
        setSelected(0);
      }
    })
  },[])

  return (
    <section className={styles.section}>
      
    </section>
  )
}
