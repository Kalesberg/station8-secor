import React, { useEffect, useState, createRef } from 'react'
import { Link } from 'gatsby'
import styles from './basicContact.module.scss'
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
      <h2>{block.heading && block.heading}</h2>
      <p>{block.paragraph && block.paragraph}</p>
      <div className={styles.form}>
        <form>
          <div className={styles.iconContainer}>
            {block.icon && <Image className={styles.icon} src={block.icon} images={images} />}
          </div>
          <input className={styles.input} placeholder={block.placeholderText && block.placeholderText} />
          <button className={styles.button}>{block.buttonText && block.buttonText}</button>
        </form>
      </div>
      <p className={styles.message}></p>
    </section>
  )
}  