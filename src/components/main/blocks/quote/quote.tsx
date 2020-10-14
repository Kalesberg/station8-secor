import React, { useContext, useEffect, useState } from 'react'
import camelcase from 'camelcase'

import { Context } from '../../../context/context'

import styles from './quote.module.scss'

export default ({ options }) => {
  const context = useContext(Context)
  const [customerInfo, setCustomerInfo] = useState({ name: '', company: '', phone: '', email: '', requirements: '', attachment: undefined })
  const [editing, setEditing] = useState(undefined)

  useEffect(() => {
    console.log('info', customerInfo)
  }, [customerInfo])

  const handleSubmitQuote = async e => {
    if (customerInfo.name && customerInfo.company && customerInfo.phone && customerInfo.email) {
      e.preventDefault()
      const res = await window.fetch('/.netlify/functions/quote', {
        method: 'POST',
        body: JSON.stringify({
          customer: customerInfo,
          user: (context && context.user && context.user.id) || ''
        })
      })
      const data = await res.json()
      console.log(data)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && context && context.user) {
      console.log('user', context.user)
      setCustomerInfo({
        ...customerInfo,
        name: context.user.firstName + ' ' + context.user.lastName,
        company: context.user.company,
        phone: context.user.phone,
        email: context.user.email
      })
    }
  }, [context])

  const handleChange = e => {
    const newCustomerInfo = { ...customerInfo }
    newCustomerInfo[e.target.id] = e.target.value
    setCustomerInfo(newCustomerInfo)
  }

  const handleFileChange = e => {
    if (e.target.files.length) {
      console.log(e.target.files[0])
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        setCustomerInfo({ ...customerInfo, attachment: reader.result })
      }, false)

      if (file) {
        reader.readAsDataURL(file)
      }
      // const data = new FormData()
      // data.append('file', e.target.files[0])
      // data.append('upload_preset', 'upnivf46')
      // const xhr = new XMLHttpRequest()
      // xhr.withCredentials = false
      // xhr.addEventListener('readystatechange', function () {
      //   if (this.readyState === this.DONE) {
      //     const res = JSON.parse(this.responseText)
      //     console.log(res)
      //   }
      // })
      // const url = 'https://api.cloudinary.com/v1_1/dn0q8cpnx'
      // xhr.open('POST', url)
      // xhr.send(data)
    }

    // const newCustomerInfo = { ...customerInfo }
    // newCustomerInfo[e.target.id] = e.target.value
    // setCustomerInfo(newCustomerInfo)
  }

  // const handleFileChange = e => {
  //   console.log(e.target.files)
  //   if (e && e.target && e.target.value) {
  //     // setWait(true)
  //     // setTimeout(() => {
  //     //   setWait(false)
  //     // }, 5000)
  //     const data = new FormData()
  //     data.append('file', document.getElementById('attachments').files[0])
  //     const xhr = new XMLHttpRequest()
  //     xhr.withCredentials = false
  //     xhr.addEventListener('readystatechange', function () {
  //       if (this.readyState === this.DONE) {
  //         const res = JSON.parse(this.responseText)
  //         setCustomerInfo({ ...customerInfo, attachments: res.link })
  //       }
  //     })
  //     xhr.open('POST', 'https://file.io/?expires=1y')
  //     xhr.send(data)
  //   } else {
  //     setBudgetProposal('')
  //     setBudgetProposalLink('')
  //   }
  // }

  console.log(context.quote)
  console.log('options', options)
  return context && (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.label}>Customer Info</p>
        <p className={styles.label}>Quote builder</p>
      </div>
      <div className={styles.customerInfo}>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor='name'>Name<span className={styles.required}>*</span></label>
            <input value={customerInfo.name} onChange={handleChange} id='name' style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwzKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InVzZXItY2hlY2siPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTE1LDE4TDE1LDE2QzE1LDEzLjc5MSAxMy4yMDksMTIgMTEsMTJMNCwxMkMxLjc5MSwxMiAwLDEzLjc5MSAwLDE2TDAsMTgiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iNy41IiBjeT0iNCIgcj0iNCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZTEiIHNlcmlmOmlkPSJTaGFwZSIgZD0iTTE2LDhMMTgsMTBMMjIsNiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} required />
          </div>
          <div className={styles.field}>
            <label htmlFor='email'>Email<span className={styles.required}>*</span></label>
            <input value={customerInfo.email} onChange={handleChange} type='email' id='email' style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMiw0KSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9Im1haWwiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTIsMEwxOCwwQzE5LjEsMCAyMCwwLjkgMjAsMkwyMCwxNEMyMCwxNS4xIDE5LjEsMTYgMTgsMTZMMiwxNkMwLjksMTYgMCwxNS4xIDAsMTRMMCwyQzAsMC45IDAuOSwwIDIsMFoiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUxIiBzZXJpZjppZD0iU2hhcGUiIGQ9Ik0yMCwyTDEwLDlMMCwyIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=")' }} required />
          </div>
          <div className={styles.field}>
            <label htmlFor='company'>Company name<span className={styles.required}>*</span></label>
            <input value={customerInfo.company} onChange={handleChange} id='company' style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwzKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InVzZXJzIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0xNiwxOEwxNiwxNkMxNiwxMy43OTEgMTQuMjA5LDEyIDEyLDEyTDQsMTJDMS43OTEsMTIgMCwxMy43OTEgMCwxNkwwLDE4IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgY3g9IjgiIGN5PSI0IiByPSI0IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IlNoYXBlMSIgc2VyaWY6aWQ9IlNoYXBlIiBkPSJNMjIsMThMMjIsMTZDMjEuOTk5LDE0LjE3NyAyMC43NjUsMTIuNTg2IDE5LDEyLjEzIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IlNoYXBlMiIgc2VyaWY6aWQ9IlNoYXBlIiBkPSJNMTUsMC4xM0MxNi43NywwLjU4MyAxOC4wMDgsMi4xNzggMTguMDA4LDQuMDA1QzE4LjAwOCw1LjgzMiAxNi43Nyw3LjQyNyAxNSw3Ljg4IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=")' }} required />
          </div>
          <div className={styles.field}>
            <label htmlFor='phone'>Phone number<span className={styles.required}>*</span></label>
            <input value={customerInfo.phone} onChange={handleChange} id='phone' style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMiwyKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InBob25lIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0yMCwxNC45MkwyMCwxNy45MkMyMC4wMDIsMTguNDgzIDE5Ljc2NywxOS4wMjEgMTkuMzUyLDE5LjQwMkMxOC45MzcsMTkuNzgzIDE4LjM4MSwxOS45NzEgMTcuODIsMTkuOTJDMTQuNzQzLDE5LjU4NiAxMS43ODcsMTguNTM0IDkuMTksMTYuODVDNi43NzQsMTUuMzE1IDQuNzI1LDEzLjI2NiAzLjE5LDEwLjg1QzEuNSw4LjI0MSAwLjQ0OCw1LjI3MSAwLjEyLDIuMThDMC4wNjksMS42MjEgMC4yNTYsMS4wNjYgMC42MzUsMC42NTJDMS4wMTMsMC4yMzcgMS41NDksMC4wMDEgMi4xMSwtMEw1LjExLC0wQzYuMTE0LC0wLjAxIDYuOTcsMC43MjYgNy4xMSwxLjcyQzcuMjM3LDIuNjggNy40NzEsMy42MjMgNy44MSw0LjUzQzguMDg1LDUuMjYxIDcuOTA5LDYuMDg1IDcuMzYsNi42NEw2LjA5LDcuOTFDNy41MTQsMTAuNDE0IDkuNTg2LDEyLjQ4NiAxMi4wOSwxMy45MUwxMy4zNiwxMi42NEMxMy45MTUsMTIuMDkxIDE0LjczOSwxMS45MTUgMTUuNDcsMTIuMTlDMTYuMzc3LDEyLjUyOSAxNy4zMiwxMi43NjMgMTguMjgsMTIuODlDMTkuMjg2LDEzLjAzMiAyMC4wMjUsMTMuOTA1IDIwLDE0LjkyWiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} required />
          </div>
          <div className={styles.field}>
            <label htmlFor='requirements'>Special requirements</label>
            <textarea value={customerInfo.requirements} onChange={handleChange} id='requirements' rows={6} />
          </div>
          <div className={styles.field}>
            <label htmlFor='attachments'>Attachments</label>
            <input type='file' id='attachments' onChange={handleFileChange} />
          </div>
        </div>
      </div>
      <div className={styles.quoteBuilder}>
        <div className={styles.labels}>
          <p>Product</p>
          <p>Notes/Specifications</p>
          <p>Quantity</p>
        </div>
        <div className={styles.products}>
          {context.quote.map((product, i) => {
            const handleQuantity = e => {
              const quote = [...context.quote]
              quote[i].quantity = parseInt(e.target.value)
              context.setQuote(quote)
            }
            const handleNotes = e => {
              const quote = [...context.quote]
              quote[i].notes = e.target.value
              context.setQuote(quote)
            }
            const removeItem = () => {
              const quote = [...context.quote]
              quote.splice(i, 1)
              context.setQuote(quote)
            }
            const handleSetOptions = e => {
              const quote = [...context.quote]
              quote[i].options[camelcase(e.target.name)] = e.target.value
              context.setQuote(quote)
            }
            const edit = () => setEditing(editing === i ? undefined : i)

            return (
              <div className={styles.product} key={i}>
                <div key={i} className={styles.productDetails}>
                  <div className={styles.productImage + `${!product.image ? ` ${styles.noImage}` : ''}`} style={{ backgroundImage: `url(${product.image})` }}>
                    {!product.image && 'No image'}
                  </div>
                  <div className={styles.productDescription}>
                    <p className={styles.productName}>{product.name}</p>
                    <div className={styles.options + `${editing === i ? ` ${styles.hidden}` : ''}`}>
                      {Object.keys(product.options).map((option, i) => {
                        const opt = options.find(opt => camelcase(opt.data.Name) === option)

                        return (
                          <p key={i} className={styles.option}>
                            {`${opt.data.Label}: ${product.options[option]}`}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.specifications}>
                  {Object.keys(product.options).length ? (
                    <button className={styles.button + `${editing === i ? ` ${styles.editing}` : ''}`} onClick={edit}>
                      {editing === i ? 'Close' : 'Edit Specs'}
                    </button>
                  ) : null}
                  <input type='text' className={styles.notes + `${!Object.keys(product.options).length ? ` ${styles.long}` : ''}`} value={product.notes} onChange={handleNotes} />
                  <div className={styles.options + `${editing === i ? '' : ` ${styles.hidden}`}`}>
                    {Object.keys(product.options).map((option, i) => {
                      const opt = options.find(opt => camelcase(opt.data.Name) === option)
                      return (
                        <div key={i} className={styles.option}>
                          <label className={styles.label} htmlFor={camelcase(opt.data.Name)}>{opt.data.Label}</label>
                          {opt.data.Type === 'Text' ? (
                            <input type='text' className={styles.input} name={camelcase(opt.data.Name)} onChange={handleSetOptions} value={product.options[camelcase(opt.data.Name)]} required />
                          ) : opt.data.Type === 'Select' ? (
                            <select name={camelcase(opt.data.Name)} onChange={handleSetOptions} value={product.options[camelcase(opt.data.Name)]} required>
                              {opt.data.Select_Choices.map((choice, key) => <option key={key}>{choice}</option>)}
                            </select>
                          ) : opt.data.Type === 'Toggle' ? (
                            <input className={styles.input} type='checkbox' name={camelcase(opt.data.Name)} value={product.options[camelcase(opt.data.Name)]} onChange={handleSetOptions} required />
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className={styles.quantityContainer}>
                  <input className={styles.quantity} type='number' value={product.quantity} min='1' onChange={handleQuantity} />
                </div>
                <div className={styles.removeContainer}>
                  <div className={styles.remove} onClick={removeItem} />
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSubmitQuote}>Submit</button>
        </div>
      </div>
    </section>
  )
}
