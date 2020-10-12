import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './fabAnimation.module.scss'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(block.fittings && block.fittings.length > 0 ? block.fittings[0].fittingHeading : "");
  const handleClick = (e) => {
    e.target.classList.add("active");
  }
  console.log(block.fittings[0].fittingHeading)
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{block.heading && block.heading}</h2>
      <p className={styles.subHeading}>{block.subHeading && block.subHeading}</p>
      <div className={styles.animationContainer}>
        <div className={styles.infoContainer}>
          {block.fittings && block.fittings.map((fitting, i) => {
            return (
              <div key={i} className={styles.info + ` ${selected === fitting.fittingHeading ? `${styles.infoShow}` : ""}`}>
                <h3>{fitting.fittingHeading && fitting.fittingHeading}</h3>
                <p>{fitting.fittingSubHeading && fitting.fittingSubHeading}</p>
                <ul>
                  {fitting.descriptions && fitting.descriptions.map((descrip, i) => {
                    return (<li key={i}>{descrip}</li>)
                  })}
                </ul>
              </div>
            )
          })}
        </div>
        <div className={styles.imageContainer}>{block.image && 
          <Image className={styles.image} src={block.image} images={images} />}
        </div>
        <div className={styles.buttons}>
          {block.fittings && block.fittings.map((fitting, i) => {
            return (
              <div onClick={() => setSelected(fitting.fittingHeading)} 
                className={styles.iconContainer + ` ${selected === fitting.fittingHeading ? `${styles.iconContainerActive}` : ""}`}>
                  {fitting.icon && <Image className={styles.icon} 
                  style={{backgroundSize: "contain"}} src={fitting.icon} images={images} />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
