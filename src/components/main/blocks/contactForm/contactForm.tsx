import React, { useEffect, useState, useRef } from 'react'
import styles from './contactForm.module.scss'
import { Image } from '../../../../functions'

export default ({ block }) => {
  const [state, setState] = useState({})
  const [submitFailed, setSubmitFailed] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    console.log('state', state)
  }, [state])

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (state !== {} && state.Email && state.Message && state['Contact Name'] && state.Phone) {
      setErrorMsg('')
      window.fetch('/.netlify/functions/contact', {
        method: 'POST',
        body: JSON.stringify({
          email: state.Email,
          requirements: state.Message,
          name: state['Contact Name'],
          phone: state.Phone
        })
      }).then(async res => {
        if (res.ok) {
          setState({})
          ref.current.reset()
          setMessage('Form has been submitted.')
        } else {
          const response = await res.json()
          console.log(response.message)
        }
      })
      console.log(state)
    } else if (!state['Contact Name']) {
      setErrorMsg('Name required')
    } else if (!state.Email) {
      setErrorMsg('Email required')
    } else if (!state.Phone) {
      setErrorMsg('Phone required')
    } else if (!state.Message) {
      setErrorMsg('Phone number required')
    }
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
            <Image className={styles.image} src={block.image && block.image} />
          </div>}
      </div>
      <div className={styles.container}>
        <h2>{block.heading && block.heading}</h2>
        <div className={styles.form}>
          <form onSubmit={handleSubmit} ref={ref}>
            {block.inputs && block.inputs.map((input, i) => {
              return (
                <div className={styles.input} key={i}>
                  <label className={styles.label} htmlFor={input.label}>{input.label}:</label>
                  <div className={styles.inputSpan}>
                    <div>
                      {input.icon && (
                        <Image className={styles.icon} src={input.icon} />
                      )}
                    </div>
                    <input className={styles.field} id={input.label} name={input.label} onChange={handleChange} required />
                  </div>
                </div>
              )
            })}
            {/* <div className={styles.recaptchContainer}>
              <Recaptcha size="compact" ref={recaptchaRef} sitekey='6LejSb8ZAAAAANY1Lq_C3JSTs_WwPBdDy5UeqC7U' onChange={handleCaptchaChange} />
            </div> */}
            <button className={styles.button}>{errorMsg || (block.buttonText && block.buttonText)}</button>
          </form>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </section>
  )
}
