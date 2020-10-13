import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import styles from './interactiveTools.module.scss'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(block.tools && block.tools.length > 0 ? block.tools[0].category : "")
   
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <div className={styles.backgroundContainer}>
          {block.tools && block.tools.map((tool,i) => {
            return (
              <div key={i} className={styles.background + ` ${selected === tool.category ? `${styles.backgroundShow}` : "" }`}>
                <Image className={styles.image} src={tool.largeImage && tool.largeImage} images={images} />
              </div>
            ) 
          })}
        </div>  
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>{block.heading}</h1>
          <h3 className={styles.subHeading}>{block.subHeading}</h3>
          <p className={styles.paragraph}>{block.paragraph}</p>
          <div className={styles.buttonContainer}>
            {block.tools && block.tools.map((tool,i) => {
              return (
                <div key={i} className={styles.buttons + ` ${selected === tool.category ? `${styles.buttonsShow}` : ""}`}>
                  <Link to={tool.buttonLink}>
                    <button className={styles.button}>{tool.buttonText && tool.buttonText}
                      <span>
                        {block.buttonIcon && <Image className={styles.icon} src={block.buttonIcon} images={images} />}
                      </span>
                    </button>
                  </Link>
                  {tool.buttonTextTwo &&
                    <Link to={tool.buttonLink}>
                      <button className={styles.button}>{tool.buttonTextTwo && tool.buttonTextTwo}
                        <span>
                          {block.buttonIcon && <Image className={styles.icon} src={block.buttonIcon} images={images} />}
                        </span>
                      </button>
                    </Link>}
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.selectContainer}>
          <div className={styles.selectBoxes}>
            {block.tools && block.tools.map((tool, i) => {
              return (
                <div className={styles.selectBox + ` ${selected === tool.category ? `${styles.selectBoxSelected}` : ""}`} key={i} onClick={() => setSelected(tool.category)}>
                  {tool.smallImage && <Image className={styles.smallImage} src={tool.smallImage} images={images} />}
                  <div key={i} className={styles.selectCategory + ` ${selected === tool.category ? `${styles.selectCategorySelected}` : ""}`}>
                    {tool.category}<span className={styles.highlighter + ` ${selected === tool.category ? `${styles.highlighterSelected}` : ""}`}></span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
