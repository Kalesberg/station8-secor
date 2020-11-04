import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import camelcase from 'camelcase'

import { Context } from '../../../context/context'

import styles from './quote.module.scss'

export default ({ options, menu }) => {
  const context = useContext(Context)
  const [customerInfo, setCustomerInfo] = useState({ name: '', company: '', phone: '', email: '', requirements: '' })
  const [editing, setEditing] = useState(undefined)
  const [attachment, setAttachment] = useState(undefined)
  const [fileName, setFileName] = useState(undefined)
  const [dropzoneClasses, setDropzoneClasses] = useState([styles.dropzone])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [markdown, setMarkdown] = useState('')
  const [active, setActive] = useState('customer')
  const [width, setWidth] = useState(window.innerWidth)

  const handleSetSearchTerm = e => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    const products = context.quote
    const markdown = ['# Products']
    products.forEach((product, i) => {
      markdown.push(`\n## ${i + 1}. ${product.name}`)
      markdown.push(`### Quantity: ${product.quantity}`)
      if (product.options && Object.keys(product.options).length) {
        markdown.push('### Options:')
        Object.keys(product.options).forEach(option => {
          markdown.push(`- **${option}:** ${product.options[option]}`)
        })
      }
      product.notes && markdown.push(`### Notes:\n\`\`\`${product.notes}\`\`\``)
    })
    setMarkdown(markdown.join('\n'))
  }, [context])

  useEffect(() => {
    if (searchTerm) {
      const results = []
      menu.forEach(category => category.menus.forEach(menu => menu.submenus.forEach(submenu => submenu.products.forEach(product => {
        if (product.name.replace(/\W/g, '').toLowerCase().includes(searchTerm.replace(/\W/g, '').toLowerCase())) {
          results.push(product)
        }
      }))))
      setSearchResults(results)
    }
  }, [searchTerm])
  
  const setWindowWidth = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', setWindowWidth);
    return (() => {
      window.removeEventListener('resize', setWindowWidth);
    })
  })
  const handleSubmitQuote = async e => {
    if (typeof window !== 'undefined' && customerInfo.name && customerInfo.company && customerInfo.phone && customerInfo.email) {
      e.preventDefault()
      const res = await window.fetch('/.netlify/functions/quote', {
        method: 'POST',
        body: JSON.stringify({
          customer: customerInfo,
          user: (context && context.user && context.user.id) || '',
          quote: context.quote,
          markdown,
          attachment
        })
      })
      if (res.ok) {
        // const data = await res.json()
        context.setQuote([])
      }
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
  const removeFile = () => {
    setAttachment(undefined);
    setFileName(undefined);
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
    setAttachment({ url: json.url });
    setFileName(file.name);
  }
  return context && (
    <section className={styles.section}>
      <div className={styles.header}>
        <button className={styles.label + ` ${active === 'customer' && width <= 600 ? `${styles.active}` : ``}`} onClick={() => setActive('customer')}>
          Customer Info<div className={styles.underline} /></button>
        <button className={styles.label + ` ${active === 'quote' && width <= 600 ? `${styles.active}` : ``}`} onClick={() => setActive('quote')}>
          Quote builder<div className={styles.underline} /></button>
      </div>
      <div className={styles.customerInfo + ` ${active === 'customer' ? `${styles.active}` : ""}`}>
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
            <textarea value={customerInfo.requirements} onChange={handleChange} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxwYXRoIGQ9Ik0xMSw0TDQsNEMyLjkwMyw0IDIsNC45MDMgMiw2TDIsMjBDMiwyMS4wOTcgMi45MDMsMjIgNCwyMkwxOCwyMkMxOS4wOTcsMjIgMjAsMjEuMDk3IDIwLDIwTDIwLDEzIiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICA8cGF0aCBkPSJNMTguNSwyLjVDMTguODk4LDIuMTAyIDE5LjQzOCwxLjg3OSAyMCwxLjg3OUMyMS4xNjQsMS44NzkgMjIuMTIxLDIuODM2IDIyLjEyMSw0QzIyLjEyMSw0LjU2MiAyMS44OTgsNS4xMDIgMjEuNSw1LjVMMTIsMTVMOCwxNkw5LDEyTDE4LjUsMi41WiIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgo8L3N2Zz4K")' }} id='requirements' rows={6} />
          </div>
          <div className={styles.field}>
            <label htmlFor='attachments'>Attachment</label>
            <input type='file' id='attachments' onChange={handleFileChange} />
            <div className={dropzoneClasses.join(' ')} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjJweCIgaGVpZ2h0PSIyM3B4IiB2aWV3Qm94PSIwIDAgMjIgMjMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+QjdCRkIxNDMtQzRENy00MTdCLThFNzgtNzg5ODhBQkRGQkYzPC90aXRsZT4KICAgIDxnIGlkPSJ1cGRhdGVzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgIDxnIGlkPSJDdXJyZW50LVF1b3RlLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zOTkuMDAwMDAwLCAtNDc0LjAwMDAwMCkiIHN0cm9rZT0iIzlCOUI5QiIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgICAgICAgPGcgaWQ9InBhcGVyY2xpcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAwLjAwMDAwMCwgNDc1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE5LjQ0LDEwLjA1IEwxMC4yNSwxOS4yNCBDNy45MDU1NTEyNCwyMS41ODQ0NDg4IDQuMTA0NDQ4NzYsMjEuNTg0NDQ4OCAxLjc2LDE5LjI0IEMtMC41ODQ0NDg3NjMsMTYuODk1NTUxMiAtMC41ODQ0NDg3NjMsMTMuMDk0NDQ4OCAxLjc2LDEwLjc1IEwxMC45NSwxLjU2IEMxMi41MTI5NjU4LC0wLjAwMjk2NTgwMjI2IDE1LjA0NzAzNDEsLTAuMDAyOTY1NzgzMzggMTYuNjEsMS41NjAwMDAwNCBDMTguMTcyOTY1OCwzLjEyMjk2NTg3IDE4LjE3Mjk2NTgsNS42NTcwMzQxNSAxNi42MSw3LjIyIEw3LjQxLDE2LjQxIEM2LjYyODUxNzA4LDE3LjE5MTQ4MjkgNS4zNjE0ODI5MiwxNy4xOTE0ODI5IDQuNTgsMTYuNDEgQzMuNzk4NTE3MDgsMTUuNjI4NTE3MSAzLjc5ODUxNzA4LDE0LjM2MTQ4MjkgNC41OCwxMy41OCBMMTMuMDcsNS4xIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+")' }}><label htmlFor='attachments' className={styles.text}>{attachment ? 'File attached' : 'Drag attachment here or click to browse'}</label></div>
          </div>
        </div>
      </div>
      <div className={styles.quoteBuilder + ` ${active === 'quote' ? `${styles.active}` : ""}`}>
        {context.quote.length ? (
          <>
            <div className={styles.labels}>
              <p>Product</p>
              <p>Notes/Specifications</p>
              <p>Quantity</p>
            </div>
            <div className={styles.products}>
              {context.quote.map((product, i) => {
                const productMissingInfo = () => !!Object.keys(product.options).find(key => !product.options[key])
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
                console.log('product', product)
                return (
                  <div className={styles.product + `${productMissingInfo() ? ` ${styles.incomplete}` : ''}`} key={i}>
                    <div key={i} className={styles.productDetails}>
                      <div className={styles.productImage + `${!product.image ? ` ${styles.noImage}` : ''}`} style={{ backgroundImage: `url(${product.image})` }}>
                        {!product.image && 'No image'}
                      </div>
                      <div className={styles.productDescription}>
                        <Link to={product.path}>
                          <p className={styles.productName}>{product.name}</p>
                        </Link>
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
          </>
        ) : (
          <div className={styles.emptyContainer}>
            <h1 className={styles.emptyTitle}>Below ground. Above expectations</h1>
            <p className={styles.emptyBody}>Add items to start a new quote</p>
          </div>
        )}
        <div className={styles.manageContainer}>
          <div className={styles.search}>
            <label className={styles.label}>{`To add ${context.quote.length ? 'more ' : ''} items, search below`}</label>
            <input className={styles.input + `${searchTerm ? ` ${styles.filled}` : ''}`} value={searchTerm} onChange={handleSetSearchTerm} />
            <input className={styles.mobileInput + `${searchTerm ? ` ${styles.filled}` : ''}`} placeholder="Search to add items..." value={searchTerm} onChange={handleSetSearchTerm} />
            <div className={styles.results + `${!searchTerm ? ` ${styles.hidden}` : ''}`}>
              <div className={styles.triangle} />
              {searchResults.length ? searchResults.slice(0, 6).map((product, i) => {
                const initOptions = () => {
                  const options = {}
                  product.options.map(option => {
                    if (option.type === 'Text') {
                      options[camelcase(option.name)] = ''
                    } else if (option.type === 'Toggle') {
                      options[camelcase(option.name)] = false
                    } else if (option.type === 'Select' && option.choices && option.choices.length) {
                      options[camelcase(option.name)] = option.choices[0]
                    }
                  })
                  return options
                }
                const handleAddToQuote = () => {
                  if (Object.entries(options).every(option => !!option[1])) {
                    const newQuote = [...context.quote]
                    newQuote.push({
                      id: product.id,
                      recordId: product.recordId,
                      name: product.name,
                      image: product.images && product.images.length && product.images[0],
                      options: initOptions(),
                      notes: '',
                      path: product.path,
                      quantity: 1
                    })
                    context.setQuote(newQuote)
                  }
                }
                console.log(product)
                return (

                  <div className={styles.result} key={i}>
                    <Link to={product.path}>
                      <div className={styles.icon + `${!product.images.length ? ` ${styles.missing}` : ''}`} style={{ backgroundImage: `url(${product.images && product.images[0]})` }}>
                        <p className={styles.text}>No image</p>
                      </div>
                    </Link>
                    <Link to={product.path}>
                      <p className={styles.name}>{product.name}</p>
                    </Link>
                    <div className={styles.addButton} onClick={handleAddToQuote} />
                  </div>
                )
              }) : <p className={styles.error}>No items found</p>}
            </div>
          </div>
          <button className={styles.submit} onClick={handleSubmitQuote}>Submit Quote</button>
        </div>
        <button className={styles.mobileSubmit} onClick={handleSubmitQuote}>Submit Quote</button>
        <div className={styles.mobileSpecial}>
          <label htmlFor='requirements'>Special requirements</label>
          <textarea value={customerInfo.requirements} onChange={handleChange} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxwYXRoIGQ9Ik0xMSw0TDQsNEMyLjkwMyw0IDIsNC45MDMgMiw2TDIsMjBDMiwyMS4wOTcgMi45MDMsMjIgNCwyMkwxOCwyMkMxOS4wOTcsMjIgMjAsMjEuMDk3IDIwLDIwTDIwLDEzIiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICA8cGF0aCBkPSJNMTguNSwyLjVDMTguODk4LDIuMTAyIDE5LjQzOCwxLjg3OSAyMCwxLjg3OUMyMS4xNjQsMS44NzkgMjIuMTIxLDIuODM2IDIyLjEyMSw0QzIyLjEyMSw0LjU2MiAyMS44OTgsNS4xMDIgMjEuNSw1LjVMMTIsMTVMOCwxNkw5LDEyTDE4LjUsMi41WiIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgo8L3N2Zz4K")' }} id='requirements' rows={6} />
        </div>
        {!fileName &&
        <div className={styles.lookingFor}>Can't find what you're looking for? Upload requirements here</div>}
        {!fileName &&
        <div className={styles.mobileAttachments}>
          <label className={styles.attachment} htmlFor='attachments'><img src="/arrow-right.svg" alt=""/></label>
          <input type='file' id='attachments' onChange={handleFileChange} />
        </div>}
        {fileName &&
            <div className={styles.mobileFile}>{fileName}<span><button onClick={removeFile}>X</button></span></div>}
      </div>        
    </section>
  )
}
