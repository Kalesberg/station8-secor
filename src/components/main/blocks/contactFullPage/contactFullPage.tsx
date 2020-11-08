import React, { useContext, useEffect, useState } from 'react'

import { Context } from '../../../context/context'

import styles from './contactFullPage.module.scss'

export default ({ block }) => {
  const context = useContext(Context)
  const [fields, setFields] = useState({ name: '', company: '', phone: '', email: '', requirements: '' })
  const [attachment, setAttachment] = useState(undefined)
  const [dropzoneClasses, setDropzoneClasses] = useState([styles.dropzone])
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && context && context.user) {
      setFields({
        ...fields,
        name: context.user.firstName + ' ' + context.user.lastName,
        company: context.user.company,
        phone: context.user.phone,
        email: context.user.email
      })
    }
  }, [context, submitted])

  const errorMsg = () => {
    if (!fields.name.trim()) {
      return 'Name required'
    } else if (!fields.email.trim()) {
      return 'Email required'
    } else if (!fields.email.match(/\S+@\S+\.\S+/)) {
      return 'Email invalid'
    } else if (!fields.company.trim()) {
      return 'Company required'
    } else if (!fields.phone.trim()) {
      return 'Phone number required'
    } else if (fields.phone.replace(/[^0-9]/g, '').trim().length !== 10) {
      return 'Phone number should be 10-digits'
    } else if (!fields.requirements.trim() && !attachment) {
      return 'Add message and/or attachment'
    }
  }

  const handleRestart = () => {
    setFields({
      ...fields,
      requirements: ''
    })
    setAttachment(undefined)
    setSubmitted(false)
  }

  const handleChange = e => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value
    })
  }

  const handlePhoneChange = e => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value.replace(/[^0-9]/g, '')
    })
  }

  const handleFileChange = e => {
    if (e.target.files.length) {
      handleFiles(e.target.files[0])
    }
  }

  const preventDefaults = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  const highlight = () => setDropzoneClasses([styles.dropzone, styles.highlight])

  const unhighlight = () => setDropzoneClasses([styles.dropzone])
  const handleDragEnter = e => {
    preventDefaults(e)
    highlight()
  }

  const handleDragOver = e => {
    preventDefaults(e)
    highlight()
  }

  const handleDragLeave = e => {
    preventDefaults(e)
    unhighlight()
  }

  const handleDrop = e => {
    preventDefaults(e)
    unhighlight()
    handleFiles(e.dataTransfer.files[0])
  }

  const handleFiles = async file => {
    const url = 'https://api.cloudinary.com/v1_1/dn0q8cpnx/upload'
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'upnivf46')
    const res = await window.fetch(url, {
      method: 'POST',
      body: data,
      mode: 'cors'
    })
    const json = await res.json()
    console.log(json)
    setAttachment({ url: json.url })
  }

  const handleSubmitContactForm = async e => {
    e.preventDefault()
    if (typeof window !== 'undefined' && !errorMsg()) {
      const res = await window.fetch('/.netlify/functions/contact', {
        method: 'POST',
        body: JSON.stringify({
          ...fields,
          user: (context && context.user && context.user.id) || '',
          message: context.quote,
          attachment
        })
      })
      if (res.ok) {
        // const data = await res.json()
        setSubmitted(true)
      }
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.heading}>{block.contactFullPageHeading}</h1>
        <h2 className={styles.subheading}>{block.contactFullPageSubheading}</h2>
      </div>
      {!submitted ? (
        <>
          <div className={styles.customerInfo}>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor='name'>Name<span className={styles.required}>*</span></label>
                <input value={fields.name} onChange={handleChange} id='name' style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwzKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InVzZXItY2hlY2siPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTE1LDE4TDE1LDE2QzE1LDEzLjc5MSAxMy4yMDksMTIgMTEsMTJMNCwxMkMxLjc5MSwxMiAwLDEzLjc5MSAwLDE2TDAsMTgiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iNy41IiBjeT0iNCIgcj0iNCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZTEiIHNlcmlmOmlkPSJTaGFwZSIgZD0iTTE2LDhMMTgsMTBMMjIsNiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} required />
              </div>
              <div className={styles.field}>
                <label htmlFor='email'>Email<span className={styles.required}>*</span></label>
                <input value={fields.email} onChange={handleChange} type='email' id='email' style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMiw0KSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9Im1haWwiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTIsMEwxOCwwQzE5LjEsMCAyMCwwLjkgMjAsMkwyMCwxNEMyMCwxNS4xIDE5LjEsMTYgMTgsMTZMMiwxNkMwLjksMTYgMCwxNS4xIDAsMTRMMCwyQzAsMC45IDAuOSwwIDIsMFoiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUxIiBzZXJpZjppZD0iU2hhcGUiIGQ9Ik0yMCwyTDEwLDlMMCwyIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=")' }} required />
              </div>
              <div className={styles.field}>
                <label htmlFor='company'>Company name<span className={styles.required}>*</span></label>
                <input value={fields.company} onChange={handleChange} id='company' style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwzKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InVzZXJzIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0xNiwxOEwxNiwxNkMxNiwxMy43OTEgMTQuMjA5LDEyIDEyLDEyTDQsMTJDMS43OTEsMTIgMCwxMy43OTEgMCwxNkwwLDE4IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgY3g9IjgiIGN5PSI0IiByPSI0IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IlNoYXBlMSIgc2VyaWY6aWQ9IlNoYXBlIiBkPSJNMjIsMThMMjIsMTZDMjEuOTk5LDE0LjE3NyAyMC43NjUsMTIuNTg2IDE5LDEyLjEzIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IlNoYXBlMiIgc2VyaWY6aWQ9IlNoYXBlIiBkPSJNMTUsMC4xM0MxNi43NywwLjU4MyAxOC4wMDgsMi4xNzggMTguMDA4LDQuMDA1QzE4LjAwOCw1LjgzMiAxNi43Nyw3LjQyNyAxNSw3Ljg4IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=")' }} required />
              </div>
              <div className={styles.field}>
                <label htmlFor='phone'>Phone number<span className={styles.required}>*</span></label>
                <input value={fields.phone} onChange={handlePhoneChange} id='phone' style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMiwyKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InBob25lIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0yMCwxNC45MkwyMCwxNy45MkMyMC4wMDIsMTguNDgzIDE5Ljc2NywxOS4wMjEgMTkuMzUyLDE5LjQwMkMxOC45MzcsMTkuNzgzIDE4LjM4MSwxOS45NzEgMTcuODIsMTkuOTJDMTQuNzQzLDE5LjU4NiAxMS43ODcsMTguNTM0IDkuMTksMTYuODVDNi43NzQsMTUuMzE1IDQuNzI1LDEzLjI2NiAzLjE5LDEwLjg1QzEuNSw4LjI0MSAwLjQ0OCw1LjI3MSAwLjEyLDIuMThDMC4wNjksMS42MjEgMC4yNTYsMS4wNjYgMC42MzUsMC42NTJDMS4wMTMsMC4yMzcgMS41NDksMC4wMDEgMi4xMSwtMEw1LjExLC0wQzYuMTE0LC0wLjAxIDYuOTcsMC43MjYgNy4xMSwxLjcyQzcuMjM3LDIuNjggNy40NzEsMy42MjMgNy44MSw0LjUzQzguMDg1LDUuMjYxIDcuOTA5LDYuMDg1IDcuMzYsNi42NEw2LjA5LDcuOTFDNy41MTQsMTAuNDE0IDkuNTg2LDEyLjQ4NiAxMi4wOSwxMy45MUwxMy4zNiwxMi42NEMxMy45MTUsMTIuMDkxIDE0LjczOSwxMS45MTUgMTUuNDcsMTIuMTlDMTYuMzc3LDEyLjUyOSAxNy4zMiwxMi43NjMgMTguMjgsMTIuODlDMTkuMjg2LDEzLjAzMiAyMC4wMjUsMTMuOTA1IDIwLDE0LjkyWiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} required />
              </div>
              <div className={styles.field}>
                <label htmlFor='requirements'>Quote request/message</label>
                <textarea value={fields.requirements} onChange={handleChange} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxwYXRoIGQ9Ik0xMSw0TDQsNEMyLjkwMyw0IDIsNC45MDMgMiw2TDIsMjBDMiwyMS4wOTcgMi45MDMsMjIgNCwyMkwxOCwyMkMxOS4wOTcsMjIgMjAsMjEuMDk3IDIwLDIwTDIwLDEzIiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICA8cGF0aCBkPSJNMTguNSwyLjVDMTguODk4LDIuMTAyIDE5LjQzOCwxLjg3OSAyMCwxLjg3OUMyMS4xNjQsMS44NzkgMjIuMTIxLDIuODM2IDIyLjEyMSw0QzIyLjEyMSw0LjU2MiAyMS44OTgsNS4xMDIgMjEuNSw1LjVMMTIsMTVMOCwxNkw5LDEyTDE4LjUsMi41WiIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgo8L3N2Zz4K")' }} id='requirements' rows={6} />
              </div>
              <div className={styles.field}>
                <label htmlFor='attachments'>Attachment</label>
                <input type='file' id='attachments' onChange={handleFileChange} />
                <div className={dropzoneClasses.join(' ')} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjJweCIgaGVpZ2h0PSIyM3B4IiB2aWV3Qm94PSIwIDAgMjIgMjMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+QjdCRkIxNDMtQzRENy00MTdCLThFNzgtNzg5ODhBQkRGQkYzPC90aXRsZT4KICAgIDxnIGlkPSJ1cGRhdGVzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgIDxnIGlkPSJDdXJyZW50LVF1b3RlLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zOTkuMDAwMDAwLCAtNDc0LjAwMDAwMCkiIHN0cm9rZT0iIzlCOUI5QiIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGcgaWQ9InBhcGVyY2xpcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAwLjAwMDAwMCwgNDc1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE5LjQ0LDEwLjA1IEwxMC4yNSwxOS4yNCBDNy45MDU1NTEyNCwyMS41ODQ0NDg4IDQuMTA0NDQ4NzYsMjEuNTg0NDQ4OCAxLjc2LDE5LjI0IEMtMC41ODQ0NDg3NjMsMTYuODk1NTUxMiAtMC41ODQ0NDg3NjMsMTMuMDk0NDQ4OCAxLjc2LDEwLjc1IEwxMC45NSwxLjU2IEMxMi41MTI5NjU4LC0wLjAwMjk2NTgwMjI2IDE1LjA0NzAzNDEsLTAuMDAyOTY1NzgzMzggMTYuNjEsMS41NjAwMDAwNCBDMTguMTcyOTY1OCwzLjEyMjk2NTg3IDE4LjE3Mjk2NTgsNS42NTcwMzQxNSAxNi42MSw3LjIyIEw3LjQxLDE2LjQxIEM2LjYyODUxNzA4LDE3LjE5MTQ4MjkgNS4zNjE0ODI5MiwxNy4xOTE0ODI5IDQuNTgsMTYuNDEgQzMuNzk4NTE3MDgsMTUuNjI4NTE3MSAzLjc5ODUxNzA4LDE0LjM2MTQ4MjkgNC41OCwxMy41OCBMMTMuMDcsNS4xIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+")' }}><label htmlFor='attachments' className={styles.text}>{attachment ? 'File attached' : 'Drag attachment here or click to browse'}</label></div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.submit + `${errorMsg() ? ` ${styles.error}` : ''}`} onClick={handleSubmitContactForm}>{errorMsg() || 'Submit'}</button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.submitted}>
          <p className={styles.message}>Your message has been sent successfully. A confirmation has been sent to your email and a customer service representative will contact you shortly.</p>
          <p className={styles.message}>If you need immediate assistance, contact us by phone at <a href='tel:+12815561661'>281-556-1661</a>.</p>
          <div className={styles.buttonContainer}>
            <button className={styles.restart} onClick={handleRestart}>Send another message</button>
          </div>
        </div>
      )}
    </section>
  )
}
