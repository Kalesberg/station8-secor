import React, { useEffect, useState } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

import { Image } from '../../../../functions'

import settings from '../../../../../.forestry/content/settings/career.json'

import styles from './careersCTA.module.scss'

export default ({ block = settings, position = '' }) => {
  const { allCareersJson: { nodes: careers } } = useStaticQuery(graphql`{
    allCareersJson {
      nodes {
        title
      }
    }
  }`)

  const [attachment, setAttachment] = useState(undefined)
  const [dropzoneClasses, setDropzoneClasses] = useState([styles.dropzone])
  const [applicantInfo, setApplicantInfo] = useState({
    cfname: '',
    cfemail: '',
    cfposition: 'General inquiry',
    cfmessage: '',
    cfphone: ''
  })
  const [applied, setApplied] = useState(false)
  const [positions, setPositions] = useState(['General inquiry'])

  useEffect(() => {
    if (careers.length) {
      const positions = careers.map(career => career.title).sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
      setPositions(['General inquiry', ...new Set(positions)])
    }
  }, [careers])

  useEffect(() => {
    if (positions.length && position && positions.find(job => job.toLowerCase() === position.toLowerCase())) {
      setApplicantInfo({
        ...applicantInfo,
        cfposition: position
      })
    }
  }, [positions, position])

  const handleSubmitApplication = async e => {
    if (typeof window !== 'undefined' && applicantInfo.cfname && applicantInfo.cfemail && applicantInfo.cfphone && applicantInfo.cfposition && attachment) {
      e.preventDefault()
      const res = await window.fetch('/.netlify/functions/apply', {
        method: 'POST',
        body: JSON.stringify({
          applicant: {
            name: applicantInfo.cfname,
            email: applicantInfo.cfemail,
            phone: applicantInfo.cfphone,
            position: applicantInfo.cfposition,
            message: applicantInfo.cfmessage
          },
          attachment
        })
      })
      if (res.ok) {
        setApplied(true)
      }
    }
  }

  const scrollDown = () => {
    document.getElementById('cfform').scrollIntoView({ behavior: 'smooth' })
  }

  const handleChange = e => {
    const newApplicantInfo = { ...applicantInfo }
    newApplicantInfo[e.target.id] = e.target.value
    setApplicantInfo(newApplicantInfo)
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
    setAttachment({ url: json.url })
  }

  const handleFileChange = e => {
    if (e.target.files.length) {
      handleFiles(e.target.files[0])
    }
  }

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
  const preventDefaults = e => {
    e.preventDefault()
    e.stopPropagation()
  }
  const highlight = () => setDropzoneClasses([styles.dropzone, styles.highlight])
  const unhighlight = () => setDropzoneClasses([styles.dropzone])
  const handleClick = () => {
    document.getElementById('cfresume').click()
  }

  return (
    <section className={styles.section} style={{ backgroundImage: `url(${block.background})` }}>
      <Image className={styles.cta} src={block.background} container='div' gradient='linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))'>
        <h1 className={styles.title}>{block.ctaTitle}</h1>
        <p className={styles.text}>{block.ctaText}</p>
        <div className={styles.buttonContainer}>
          {block.buttonType === 'Contact' ? (
            <div className={styles.button} onClick={scrollDown}>General inquiry</div>
          ) : (
            <Link className={styles.button} to='/careers'>See all openings</Link>
          )}
        </div>
      </Image>
      <Image id='cfform' className={styles.contactForm} src={block.cfBackground} container='div' gradient='linear-gradient(to top, rgba(213, 16, 9, 0.75), rgba(213, 16, 9, 0.75))'>
        <h1 className={styles.title}>{applied ? 'Thank you for your inquiry!' : 'Apply today!'}</h1>
        {!applied ? (
          <>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor='cfname' className={styles.label}>Contact Name:<span className={styles.required}>*</span></label>
                <input id='cfname' required className={styles.input} onChange={handleChange} value={applicantInfo.cfname} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwzKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InVzZXItY2hlY2siPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTE1LDE4TDE1LDE2QzE1LDEzLjc5MSAxMy4yMDksMTIgMTEsMTJMNCwxMkMxLjc5MSwxMiAwLDEzLjc5MSAwLDE2TDAsMTgiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iNy41IiBjeT0iNCIgcj0iNCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZTEiIHNlcmlmOmlkPSJTaGFwZSIgZD0iTTE2LDhMMTgsMTBMMjIsNiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} />
              </div>
              <div className={styles.field}>
                <label htmlFor='cfmessage' className={styles.label}>Message:</label>
                <input id='cfmessage' className={styles.input} onChange={handleChange} value={applicantInfo.cfmessage} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxwYXRoIGQ9Ik0xNCwyTDYsMkM0LjkwMywyIDQsMi45MDMgNCw0TDQsMjBDNCwyMS4wOTcgNC45MDMsMjIgNiwyMkwxOCwyMkMxOS4wOTcsMjIgMjAsMjEuMDk3IDIwLDIwTDIwLDhMMTQsMloiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgIDxwYXRoIGQ9Ik0xNCwyTDE0LDhMMjAsOCIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgPHBhdGggZD0iTTE2LDEzTDgsMTMiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgIDxwYXRoIGQ9Ik0xNiwxN0w4LDE3IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICA8cGF0aCBkPSJNMTAsOUw4LDkiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KPC9zdmc+Cg==")' }} />
              </div>
              <div className={styles.field}>
                <label htmlFor='cfemail' className={styles.label}>Email:<span className={styles.required}>*</span></label>
                <input id='cfemail' required className={styles.input} onChange={handleChange} value={applicantInfo.cfemail} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMiw0KSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9Im1haWwiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTIsMEwxOCwwQzE5LjEsMCAyMCwwLjkgMjAsMkwyMCwxNEMyMCwxNS4xIDE5LjEsMTYgMTgsMTZMMiwxNkMwLjksMTYgMCwxNS4xIDAsMTRMMCwyQzAsMC45IDAuOSwwIDIsMFoiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUxIiBzZXJpZjppZD0iU2hhcGUiIGQ9Ik0yMCwyTDEwLDlMMCwyIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=")' }} />
              </div>
              <div className={styles.field}>
                <label htmlFor='cfphone' className={styles.label}>Phone:<span className={styles.required}>*</span></label>
                <input id='cfphone' required className={styles.input} onChange={handleChange} value={applicantInfo.cfphone} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMiwyKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InBob25lIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0yMCwxNC45MkwyMCwxNy45MkMyMC4wMDIsMTguNDgzIDE5Ljc2NywxOS4wMjEgMTkuMzUyLDE5LjQwMkMxOC45MzcsMTkuNzgzIDE4LjM4MSwxOS45NzEgMTcuODIsMTkuOTJDMTQuNzQzLDE5LjU4NiAxMS43ODcsMTguNTM0IDkuMTksMTYuODVDNi43NzQsMTUuMzE1IDQuNzI1LDEzLjI2NiAzLjE5LDEwLjg1QzEuNSw4LjI0MSAwLjQ0OCw1LjI3MSAwLjEyLDIuMThDMC4wNjksMS42MjEgMC4yNTYsMS4wNjYgMC42MzUsMC42NTJDMS4wMTMsMC4yMzcgMS41NDksMC4wMDEgMi4xMSwtMEw1LjExLC0wQzYuMTE0LC0wLjAxIDYuOTcsMC43MjYgNy4xMSwxLjcyQzcuMjM3LDIuNjggNy40NzEsMy42MjMgNy44MSw0LjUzQzguMDg1LDUuMjYxIDcuOTA5LDYuMDg1IDcuMzYsNi42NEw2LjA5LDcuOTFDNy41MTQsMTAuNDE0IDkuNTg2LDEyLjQ4NiAxMi4wOSwxMy45MUwxMy4zNiwxMi42NEMxMy45MTUsMTIuMDkxIDE0LjczOSwxMS45MTUgMTUuNDcsMTIuMTlDMTYuMzc3LDEyLjUyOSAxNy4zMiwxMi43NjMgMTguMjgsMTIuODlDMTkuMjg2LDEzLjAzMiAyMC4wMjUsMTMuOTA1IDIwLDE0LjkyWiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} />
              </div>
              <div className={styles.field}>
                <label htmlFor='cfposition' className={styles.label}>Position:<span className={styles.required}>*</span></label>
                <select className={styles.select} id='cfposition' onChange={handleChange} value={applicantInfo.cfposition}>
                  {positions.map(position => {
                    return (
                      <option key={position}>{position}</option>
                    )
                  })}
                </select>
                <p className={styles.selectDisplay} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwzKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InVzZXJzIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0xNiwxOEwxNiwxNkMxNiwxMy43OTEgMTQuMjA5LDEyIDEyLDEyTDQsMTJDMS43OTEsMTIgMCwxMy43OTEgMCwxNkwwLDE4IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgY3g9IjgiIGN5PSI0IiByPSI0IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IlNoYXBlMSIgc2VyaWY6aWQ9IlNoYXBlIiBkPSJNMjIsMThMMjIsMTZDMjEuOTk5LDE0LjE3NyAyMC43NjUsMTIuNTg2IDE5LDEyLjEzIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IlNoYXBlMiIgc2VyaWY6aWQ9IlNoYXBlIiBkPSJNMTUsMC4xM0MxNi43NywwLjU4MyAxOC4wMDgsMi4xNzggMTguMDA4LDQuMDA1QzE4LjAwOCw1LjgzMiAxNi43Nyw3LjQyNyAxNSw3Ljg4IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=")' }}>{applicantInfo.cfposition}</p>
              </div>
              <div className={styles.field}>
                <label htmlFor='cfresume' className={styles.label}>Resume:<span className={styles.required}>*</span></label>
                <input className={styles.hidden} required type='file' id='cfresume' onChange={handleFileChange} />
                <div className={dropzoneClasses.join(' ')} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onClick={handleClick} onDrop={handleDrop} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxwYXRoIGQ9Ik0yMS40NCwxMS4wNUwxMi4yNSwyMC4yNEMxMS4xMjUsMjEuMzY1IDkuNTk3LDIxLjk5OCA4LjAwNSwyMS45OThDNC43MTIsMjEuOTk4IDIuMDAyLDE5LjI4OCAyLjAwMiwxNS45OTVDMi4wMDIsMTQuNDAzIDIuNjM1LDEyLjg3NSAzLjc2LDExLjc1TDEyLjk1LDIuNTZDMTMuNywxLjgxIDE0LjcxOSwxLjM4OCAxNS43OCwxLjM4OEMxNy45NzYsMS4zODggMTkuNzgyLDMuMTk0IDE5Ljc4Miw1LjM5QzE5Ljc4Miw2LjQ1MSAxOS4zNiw3LjQ3IDE4LjYxLDguMjJMOS40MSwxNy40MUM5LjAzNSwxNy43ODUgOC41MjYsMTcuOTk2IDcuOTk1LDE3Ljk5NkM2Ljg5NywxNy45OTYgNS45OTQsMTcuMDkzIDUuOTk0LDE1Ljk5NUM1Ljk5NCwxNS40NjQgNi4yMDUsMTQuOTU1IDYuNTgsMTQuNThMMTUuMDcsNi4xIiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+Cjwvc3ZnPgo=")' }}>
                  <p className={styles.text + `${attachment ? ` ${styles.attached}` : ''}`}>{attachment ? 'Click/drag file to replace' : 'Click/drag file to upload'}</p>
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.button} onClick={handleSubmitApplication}>
                <p className={styles.buttonLabel}>Send</p>
              </div>
            </div>
          </>
        ) : null}
      </Image>
    </section>
  )
}
