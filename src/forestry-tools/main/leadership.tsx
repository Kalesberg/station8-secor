import React, { useState } from 'react'
import Select from 'react-select'

import 'animate.css/animate.min.css'

import { classNames, enabled, Image } from '../exports'

export const Leadership = ({ block, styles, images }) => {
  const [array, setArray] = useState(block.leaders)
  const [desktopIndex, setDesktopIndex] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(undefined)

  const Detail = ({ className, index, setIndex, required }) => (
    <div className={styles[className]}>
      <div className={styles.leaders}>
        {enabled(array).map((leader, i) => <Leader key={i} leader={leader} i={i} index={index} setIndex={setIndex} required={required} />)}
      </div>
      {index !== undefined && array[index] && (
        <div className={styles.detail}>
          {array[index].name && <h2 className={styles.name}>{array[index].name}</h2>}
          {array[index].title && <h3 className={styles.title}>{array[index].title}</h3>}
          {array[index].biography && (
            <div className={styles.biography}>
              {array[index].biography.split('\n').map((paragraph, i) => (
                <p key={i} className={styles.paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )

  const Leader = ({ leader, i, index, setIndex, required }) => {
    const setActiveIndex = () => {
      setIndex(!required && index === i ? undefined : i)
    }

    return leader && i !== undefined ? (
      <div className={styles.leader + `${index === i ? ` ${styles.active}` : ''}`} onClick={setActiveIndex}>
        <Image className={styles.image} images={images} container='div' src={leader.photo.image} alt={leader.photo.alt} title={leader.photo.title}>
          <p className={styles.name}>{leader.name}</p>
          <p className={styles.title}>{leader.title}</p>
        </Image>
      </div>
    ) : null
  }

  return (
    <section className={classNames(block, styles)}>
      <button className={styles.heading + `${array === block.leaders ? ` ${styles.active}` : ''}`}>Team</button>
      <Detail className='mobile' index={mobileIndex} setIndex={setMobileIndex} required={false} />
      <Detail className='desktop' index={desktopIndex} setIndex={setDesktopIndex} required />
    </section>
  )
}
