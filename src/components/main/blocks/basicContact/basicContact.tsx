import React, { useEffect, useState, createRef } from 'react'
import { Link } from 'gatsby'
import styles from './basicContact.module.scss'
import { Image, link } from '../../../../functions'
import Recaptcha from 'react-google-recaptcha'

export default ({ block, images }) => {
  const recaptchaRef = createRef()

  const [input, setInput] = useState('')
  const [recaptchaValue, setRecaptchaValue] = useState('')
  // const [recaptchaValue, setRecaptchaValue] = useState(true)
  const [submitFailed, setSubmitFailed] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const setInputData = e => setInput(e.target.value)

  const handleCaptchaChange = value => setRecaptchaValue(value)

  const handleSubmit = e => {
    e.preventDefault()
    if (!recaptchaValue) return setSubmitFailed(true)
    setSubmitting(true)
    window.fetch('/.netlify/functions/submit', {
      method: 'POST',
      body: JSON.stringify({ input })
    }).then(async res => {
      setSubmitting(false)
      if (res.ok) {
        setInput('')
        setRecaptchaValue('')
      } else {
        const response = await res.json()
        console.log(response.message)
      }
    })
  }

  useEffect(() => {
    if (submitFailed) {
      setTimeout(() => setSubmitFailed(false), 3000)
    }
  }, [submitFailed])

  return (
    <section className={styles.section}>
      {block.image &&
        <div className={styles.backgroundContainer}>
          <div className={styles.background}>
            <Image className={styles.image} src={block.image && block.image} images={images} />
          </div>
      </div>}
      <div className={styles.container}>
        {block.largeHeading &&
        <h2 className={styles.largeHeading + ` ${block.image ? `${styles.light}` : ""}`}>{block.largeHeading}</h2>}
        <h2 className={`${block.image && `${styles.light}`}`}>{block.heading && block.heading}</h2>
        <p className={`${block.image && `${styles.light}`}`}>{block.paragraph && block.paragraph}</p>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <input className={styles.input} name={block.heading} 
                placeholder={block.placeholderText && block.placeholderText} onChange={setInputData} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwzKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InVzZXItY2hlY2siPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTE1LDE4TDE1LDE2QzE1LDEzLjc5MSAxMy4yMDksMTIgMTEsMTJMNCwxMkMxLjc5MSwxMiAwLDEzLjc5MSAwLDE2TDAsMTgiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iNy41IiBjeT0iNCIgcj0iNCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZTEiIHNlcmlmOmlkPSJTaGFwZSIgZD0iTTE2LDhMMTgsMTBMMjIsNiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} />
              <button className={styles.button}>{block.buttonText && block.buttonText}</button>
            </div>
            {/* <div className={styles.recaptchContainer}>
              <Recaptcha className='recaptcha' ref={recaptchaRef} sitekey='6LejSb8ZAAAAANY1Lq_C3JSTs_WwPBdDy5UeqC7U' onChange={handleCaptchaChange} />
            </div> */}
          </form>
        </div>
        <p className={styles.message}></p>
      </div>
    </section>
  )
}  