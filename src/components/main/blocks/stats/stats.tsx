import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'gatsby'
import styles from './stats.module.scss'
import { Image, link } from '../../../../functions'
import CountUp from 'react-countup';

export default ({ block, images, scrollPosition }) => {
  const [numOne, setNumOne] = useState(0);
  const [numTwo, setNumTwo] = useState(0);
  const [numThree, setNumThree] = useState(0);
  const nums = [numOne, numTwo, numThree];
  const statNums = block.stats && block.stats.map((stat => stat.number))
  const [scrolled, setScrolled] = useState(false);
  
  const ref = useRef(null);

  useEffect(() => {
    if (!scrolled && ref.current) {
      if (ref.current.getBoundingClientRect().top < (scrollPosition)) {
        setScrolled(true);
      }
    }  
  
  },[scrollPosition])

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={ref}>
        {block.stats && scrolled && block.stats.map((stat,i) => {
          return (
            <div key ={i} className={styles.statContainer}>
              {stat.icon && <Image className={styles.icon} src={stat.icon} images={images} />}
              <p className={styles.number}><CountUp useEasing={false} duration={4} end={stat.number} />
                {stat.characters && stat.characters}</p>
              <p className={styles.description}>{stat.description && stat.description}</p>
            </div> 
          )
        })}
      </div>
    </section>
  )
}