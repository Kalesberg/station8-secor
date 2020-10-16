import React from 'react'
import { Link } from 'gatsby'
import Moment from 'react-moment'

import styles from './authenticated.module.scss'

export default ({ path, user }) => {
  console.log(path, user)
  return (
    <section className={styles.section}>
      <div className={styles.navigation}>
        <h1 className={styles.title}>{user.company}</h1>
        <div className={styles.tabs}>
          <Link className={styles.tab} activeClassName={styles.active} to='/account/quotes'><p className={styles.label}>Quotes</p><div className={styles.underline} /></Link>
          <Link className={styles.tab} activeClassName={styles.active} to='/account/forms'><p className={styles.label}>Forms</p><div className={styles.underline} /></Link>
          <Link className={styles.tab} activeClassName={styles.active} to='/account/info'><p className={styles.label}>Account info</p><div className={styles.underline} /></Link>
        </div>
      </div>
      {path === 'info' && (
        <div className={styles.info}>
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Company</h2>
            <div className={styles.fields}>
              <div className={styles.field}>
                <div className={styles.icon} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwzKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InVzZXJzIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0xNiwxOEwxNiwxNkMxNiwxMy43OTEgMTQuMjA5LDEyIDEyLDEyTDQsMTJDMS43OTEsMTIgMCwxMy43OTEgMCwxNkwwLDE4IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbCIgY3g9IjgiIGN5PSI0IiByPSI0IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IlNoYXBlMSIgc2VyaWY6aWQ9IlNoYXBlIiBkPSJNMjIsMThMMjIsMTZDMjEuOTk5LDE0LjE3NyAyMC43NjUsMTIuNTg2IDE5LDEyLjEzIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9IlNoYXBlMiIgc2VyaWY6aWQ9IlNoYXBlIiBkPSJNMTUsMC4xM0MxNi43NywwLjU4MyAxOC4wMDgsMi4xNzggMTguMDA4LDQuMDA1QzE4LjAwOCw1LjgzMiAxNi43Nyw3LjQyNyAxNSw3Ljg4IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=")' }} />
                <p className={styles.value}>{user.company}</p>
                <p className={styles.edit}>Edit</p>
              </div>
              <div className={styles.field}>
                <div className={styles.icon} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIGlkPSJfLS1Qcm90b3R5cGUiIHNlcmlmOmlkPSLigKItUHJvdG90eXBlIiB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDIsMCkiPgogICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwxKSI+CiAgICAgICAgICAgIDxnIGlkPSJDcmVhdGUtYWNjb3VudCI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTE4LDlDMTgsMTYgOSwyMiA5LDIyQzksMjIgMCwxNiAwLDlDMCw0LjAyOSA0LjAyOSwwIDksMEMxMy45NzEsMCAxOCw0LjAyOSAxOCw5WiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwxKSI+CiAgICAgICAgICAgIDxnIGlkPSJDcmVhdGUtYWNjb3VudDEiIHNlcmlmOmlkPSJDcmVhdGUtYWNjb3VudCI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAxIiBzZXJpZjppZD0iR3JvdXAiPgogICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwiIGN4PSI5IiBjeT0iOSIgcj0iMyIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} />
                <p className={styles.value}>
                  {user.address1 && (
                    <>
                      <span>{user.address1}</span>
                      <br />
                    </>
                  )}
                  {user.address2 && (
                    <>
                      <span>{user.address2}</span>
                      <br />
                    </>
                  )}
                  {user.city && <span>{user.city}, </span>}
                  {user.state && <span>{user.state} </span>}
                  {user.zipCode && <span>{user.zipCode}</span>}
                </p>
                <p className={styles.edit}>Edit</p>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <div className={styles.fields}>
              <div className={styles.field}>
                <div className={styles.icon} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMSwzKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InVzZXItY2hlY2siPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTE1LDE4TDE1LDE2QzE1LDEzLjc5MSAxMy4yMDksMTIgMTEsMTJMNCwxMkMxLjc5MSwxMiAwLDEzLjc5MSAwLDE2TDAsMTgiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsIiBjeD0iNy41IiBjeT0iNCIgcj0iNCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZTEiIHNlcmlmOmlkPSJTaGFwZSIgZD0iTTE2LDhMMTgsMTBMMjIsNiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} />
                <p className={styles.value}>
                  {user.firstName && <span>{user.firstName}</span>}
                  {user.firstName && user.lastName && <span>&nbsp;</span>}
                  {user.lastName && <span>{user.lastName}</span>}
                </p>
                <p className={styles.edit}>Edit</p>
              </div>
              <div className={styles.field}>
                <div className={styles.icon} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMiwyKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9InBob25lIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUiIGQ9Ik0yMCwxNC45MkwyMCwxNy45MkMyMC4wMDIsMTguNDgzIDE5Ljc2NywxOS4wMjEgMTkuMzUyLDE5LjQwMkMxOC45MzcsMTkuNzgzIDE4LjM4MSwxOS45NzEgMTcuODIsMTkuOTJDMTQuNzQzLDE5LjU4NiAxMS43ODcsMTguNTM0IDkuMTksMTYuODVDNi43NzQsMTUuMzE1IDQuNzI1LDEzLjI2NiAzLjE5LDEwLjg1QzEuNSw4LjI0MSAwLjQ0OCw1LjI3MSAwLjEyLDIuMThDMC4wNjksMS42MjEgMC4yNTYsMS4wNjYgMC42MzUsMC42NTJDMS4wMTMsMC4yMzcgMS41NDksMC4wMDEgMi4xMSwtMEw1LjExLC0wQzYuMTE0LC0wLjAxIDYuOTcsMC43MjYgNy4xMSwxLjcyQzcuMjM3LDIuNjggNy40NzEsMy42MjMgNy44MSw0LjUzQzguMDg1LDUuMjYxIDcuOTA5LDYuMDg1IDcuMzYsNi42NEw2LjA5LDcuOTFDNy41MTQsMTAuNDE0IDkuNTg2LDEyLjQ4NiAxMi4wOSwxMy45MUwxMy4zNiwxMi42NEMxMy45MTUsMTIuMDkxIDE0LjczOSwxMS45MTUgMTUuNDcsMTIuMTlDMTYuMzc3LDEyLjUyOSAxNy4zMiwxMi43NjMgMTguMjgsMTIuODlDMTkuMjg2LDEzLjAzMiAyMC4wMjUsMTMuOTA1IDIwLDE0LjkyWiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")' }} />
                <p className={styles.value}>
                  {user.phone && user.phone.length === 14 && (
                    <>
                      <span>{user.phone.substr(1, 3)}</span>
                      <span>&nbsp;</span>
                      <span>{user.phone.substr(5, 4)}</span>
                      <span>&nbsp;</span>
                      <span>{user.phone.substr(10, 4)}</span>
                    </>
                  )}
                </p>
                <p className={styles.edit}>Edit</p>
              </div>
              <div className={styles.field}>
                <div className={styles.icon} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMiw0KSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9Im1haWwiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTIsMEwxOCwwQzE5LjEsMCAyMCwwLjkgMjAsMkwyMCwxNEMyMCwxNS4xIDE5LjEsMTYgMTgsMTZMMiwxNkMwLjksMTYgMCwxNS4xIDAsMTRMMCwyQzAsMC45IDAuOSwwIDIsMFoiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBpZD0iU2hhcGUxIiBzZXJpZjppZD0iU2hhcGUiIGQ9Ik0yMCwyTDEwLDlMMCwyIiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTpyZ2IoMTU1LDE1NSwxNTUpO3N0cm9rZS13aWR0aDoycHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=")' }} />
                <p className={styles.value}>{user.email}</p>
                <p className={styles.edit}>Edit</p>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Password</h2>
            <div className={styles.fields}>
              <div className={styles.field}>
                <div className={styles.icon} style={{ backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7Ij4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMywyKSI+CiAgICAgICAgPGcgaWQ9Il8tLVByb3RvdHlwZSIgc2VyaWY6aWQ9IuKAoi1Qcm90b3R5cGUiPgogICAgICAgICAgICA8ZyBpZD0iQ3JlYXRlLWFjY291bnQiPgogICAgICAgICAgICAgICAgPGcgaWQ9ImxvY2siPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJSZWN0YW5nbGUtcGF0aCIgZD0iTTE4LDExQzE4LDkuODk2IDE3LjEwNCw5IDE2LDlMMiw5QzAuODk2LDkgMCw5Ljg5NiAwLDExTDAsMThDMCwxOS4xMDQgMC44OTYsMjAgMiwyMEwxNiwyMEMxNy4xMDQsMjAgMTgsMTkuMTA0IDE4LDE4TDE4LDExWiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6cmdiKDE1NSwxNTUsMTU1KTtzdHJva2Utd2lkdGg6MnB4OyIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJTaGFwZSIgZD0iTTQsOUw0LDVDNCwyLjIzOSA2LjIzOSwwIDksMEMxMS43NjEsMCAxNCwyLjIzOSAxNCw1TDE0LDkiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOnJnYigxNTUsMTU1LDE1NSk7c3Ryb2tlLXdpZHRoOjJweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==")' }} />
                <p className={styles.value}>&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;&bull;&nbsp;</p>
                <p className={styles.edit}>Edit</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {path === 'quotes' && (
        <div className={styles.quotes}>
          {user.quotes.map(quote => {
            console.log(quote.JSON)
            return (
              <div key={quote.recordId} className={styles.quote} style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${quote.JSON[0].image})` }}>
                {quote.timestamp && <h1><Moment date={quote.timestamp} format='MM/DD/YY' /></h1>}
                <p>#{quote.id}</p>
              </div>
            )
          })}
        </div>
      )}
      {path === 'forms' && (
        <div className={styles.forms}>
          {/*  */}
        </div>
      )}
    </section>
  )
}
