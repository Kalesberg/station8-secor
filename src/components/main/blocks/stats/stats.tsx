import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'gatsby'
import styles from './stats.module.scss'
import { Image, link } from '../../../../functions'
import Recaptcha from 'react-google-recaptcha'

export default ({ block, images, scrollPosition }) => {
 const [numOne, setNumOne] = useState(0);
  const [numTwo, setNumTwo] = useState(0);
  const [numThree, setNumThree] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const nums = [numOne, numTwo, numThree];
  const statNums = block.stats && block.stats.map((stat => stat.number))

  const ref = useRef(null);
   
  useEffect(() => {
  
      if (ref.current) {
        if (ref.current.getBoundingClientRect().top < (scrollPosition)) {
          setIsVisible(true);
        }
      }
    
      
      if (isVisible && numOne < statNums[0]){
        // window.removeEventListener('scroll', checkPosition)
        setTimeout(() => {
          setNumOne(numOne + 1);
        }, 25)
      }
      if (isVisible && numTwo < statNums[1]){
        setTimeout(() => {
          if (statNums[1] - numTwo <= 10)
            setNumTwo(numTwo + 1);
          else 
            setNumTwo(numTwo + 10);
        }, 0)
      }
      if (isVisible && numThree < statNums[2]){
        setTimeout(() => {
          setNumThree(numThree + 1);
        }, 25)
      }
  
  },[isVisible, scrollPosition, numOne, numTwo, numThree])

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={ref}>
        {block.stats && block.stats.map((stat,i) => {
          return (
            <div key ={i} className={styles.statContainer}>
              {stat.icon && <Image className={styles.icon} src={stat.icon} images={images} />}
              <p className={styles.number}>{nums[i]}
                {stat.characters && stat.characters}</p>
              <p className={styles.description}>{stat.description && stat.description}</p>
            </div> 
          )
        })}
      </div>
    </section>
  )
}