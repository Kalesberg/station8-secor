import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from 'gatsby'
import { Image, link } from '../../../../functions'
import Registered from './registered'
import styles from './accessories.module.scss'
import HorizontalHighlight from '../highlighters/horizontalHighlight'

export default ({ block, images }) => {
  const [selected, setSelected] = useState(block.accessories && block.accessories.length > 0 ? block.accessories[0].heading : '')
  const [target, setTarget] = useState(null)
  const [dropdown, setDropdown] = useState(false)
  const container = useRef(null)

  const handleClick = (e) => {
    setSelected(e.target.innerText)
    setTarget(e.target)
    setDropdown(false)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSelected(block.accessories && block.accessories.length > 0 ? block.accessories[0].heading : '')
      setTarget(container.current && container.current.firstElementChild)
    })
  }, [selected])

  return (
    <section className={styles.section}>
      <div className={styles.dropdown}>
        <h2 className={styles.dropdownSelected}>{selected}<span><button onClick={() => setDropdown(!dropdown)}><img src='/chevron-down-black.svg' alt='' /></button></span></h2>
        <div className={styles.selections + ` ${dropdown ? `${styles.active}` : ''}`}>
          {block.accessories && block.accessories.filter(acc => acc.heading !== selected).map((acc, i) => {
            return (
              <button key={i} onClick={handleClick} className={styles.selection}>{acc.heading}</button>
            )
          })}
        </div>
      </div>
      <div className={styles.accessoryContainer}>
        {block.accessories && block.accessories.map((acc, i) => {
          return (
            <div key={i} className={styles.accessory + ` ${selected.toLowerCase() === acc.heading.toLowerCase() ? `${styles.accessoryShow}` : ''}`}>
              {acc.image && <Image className={styles.image} src={acc.image} images={images} />}
              <div className={styles.infoContainer}>
                <h1>{acc.heading && acc.heading}</h1>
                <p className={styles.subHeading}>{acc.subHeading && acc.subHeading}</p>
                {acc.description && acc.description.includes('®')
                  ? <Registered text={acc.description} />
                  : <p className={styles.description}>{acc.description && acc.description}</p>}
                <div className={styles.buttonContainer}>
                  {acc.buttonText && acc.buttonLink &&
                    <Link to={acc.buttonLink}>
                      <button className={styles.button}>{acc.buttonText}
                      </button>
                    </Link>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.selectorContainer}>
        <div className={styles.selectors} ref={container}>
          {block.accessories && block.accessories.map((acc, i) => {
            return (
              <button onClick={handleClick} className={styles.heading + ` ${selected.toLowerCase() === acc.heading.toLowerCase() ? `${styles.headingShow}` : ''}`} key={i}>{acc.heading}</button>
            )
          })}
          <HorizontalHighlight container={container} target={target} />
        </div>
      </div>
    </section>
  )
}
