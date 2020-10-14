import React, { useEffect, useState, createRef } from 'react'
import { Link } from 'gatsby'
import styles from './contactForm.module.scss'
import { Image, link } from '../../../../functions'
import Recaptcha from 'react-google-recaptcha'

export default ({ block, images }) => {
  const recaptchaRef = createRef()

  const [state, setState] = useState({})
  const [subscribe, setSubscribe] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState('')
  // const [recaptchaValue, setRecaptchaValue] = useState(true)
  const [submitFailed, setSubmitFailed] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleCaptchaChange = value => setRecaptchaValue(value)
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!recaptchaValue) return setSubmitFailed(true)
    setSubmitting(true)
    window.fetch('/.netlify/functions/submit', {
      method: 'POST',
      body: JSON.stringify({ ...state })
    }).then(async res => {
      setSubmitting(false)
      if (res.ok) {
        setState({});
        setRecaptchaValue('')
      } else {
        const response = await res.json()
        console.log(response.message)
      }
    })
    console.log(state)
  }

  useEffect(() => {
    if (submitFailed) {
      setTimeout(() => setSubmitFailed(false), 3000)
    }
  }, [submitFailed])

  return (
    <section className={styles.section}>
      <div className={styles.backgroundContainer}>
        {block.image &&
        <div className={styles.background}>
          <Image className={styles.image} src={block.image && block.image} images={images} />
        </div>}
      </div>
      <div className={styles.container}>
        <h2>{block.heading && block.heading}</h2>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
          {block.inputs && block.inputs.map((input, i) => {
            return (
              <div className={styles.input} key={i}>
                <label className={styles.label} htmlFor={input.label}>{input.label}:</label>
                <div className={styles.inputSpan}>
                  <div>{input.icon && <Image className={styles.icon} src={input.icon} images={images} />}</div>
                  <input id={input.label} name={input.label} onChange={handleChange}/>
                </div>
              </div>
            )
            })}
            {/* <div className={styles.recaptchContainer}>
              <Recaptcha size="compact" ref={recaptchaRef} sitekey='6LejSb8ZAAAAANY1Lq_C3JSTs_WwPBdDy5UeqC7U' onChange={handleCaptchaChange} />
            </div> */}
            <button className={styles.button}>{block.buttonText && block.buttonText}</button>
          </form>
        </div>
        <p className={styles.message}></p>
      </div>
    </section>
  )
}  