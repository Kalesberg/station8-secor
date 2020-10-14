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
      <h2>{block.heading && block.heading}</h2>
      <p>{block.paragraph && block.paragraph}</p>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <div className={styles.iconContainer}>
              {block.icon && <Image className={styles.icon} src={block.icon} images={images} />}
            </div>
            <input className={styles.input} name={block.heading} 
              placeholder={block.placeholderText && block.placeholderText} onChange={setInputData}/>
            <button className={styles.button}>{block.buttonText && block.buttonText}</button>
          </div>
          {/* <div className={styles.recaptchContainer}>
            <Recaptcha className='recaptcha' ref={recaptchaRef} sitekey='6LejSb8ZAAAAANY1Lq_C3JSTs_WwPBdDy5UeqC7U' onChange={handleCaptchaChange} />
          </div> */}
        </form>
      </div>
      <p className={styles.message}></p>
    </section>
  )
}  