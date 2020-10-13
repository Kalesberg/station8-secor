import React, { useEffect, useState, createRef } from 'react'
import { Link } from 'gatsby'
import styles from './contactForm.module.scss'
import { Image, link } from '../../../../functions'
import Recaptcha from 'react-google-recaptcha'

export default ({ block, images }) => {
  const recaptchaRef = createRef()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [subscribe, setSubscribe] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState('')
  // const [recaptchaValue, setRecaptchaValue] = useState(true)
  const [submitFailed, setSubmitFailed] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const setNameData = e => setName(e.target.value)
  const setEmailData = e => setEmail(e.target.value)
  const setMessageData = e => setMessage(e.target.value)
  const toggleSubscribe = () => setSubscribe(!subscribe)

  const handleCaptchaChange = value => setRecaptchaValue(value)

  const handleSubmit = e => {
    e.preventDefault()
    if (!recaptchaValue) return setSubmitFailed(true)
    setSubmitting(true)
    window.fetch('/.netlify/functions/submit', {
      method: 'POST',
      body: JSON.stringify({ name, email, message, subscribe })
    }).then(async res => {
      setSubmitting(false)
      if (res.ok) {
        setName('')
        setEmail('')
        setMessage('')
        setSubscribe(false)
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
      <div className={styles.backgroundContainer}>
        {block.image &&
        <div className={styles.background}>
          <Image className={styles.image} src={block.image && block.image} images={images} />
        </div>}
      </div>
      <div className={styles.container}>
        <h2>{block.heading && block.heading}</h2>
        <div className={styles.form}>
          <form>
          {block.inputs && block.inputs.map((input, i) => {
            return (
              <div className={styles.input} key={i}>
                <label className={styles.label} htmlFor={input.label}>{input.label}:</label>
                <div className={styles.inputSpan}>
                  <div>{input.icon && <Image className={styles.icon} src={input.icon} images={images} />}</div>
                  <input id={input.label} name={input.label}/>
                </div>
              </div>
            )
            })}
            <button className={styles.button}>{block.buttonText && block.buttonText}</button>
          </form>
        </div>
        <p className={styles.message}></p>
      </div>
    </section>
  )
}  