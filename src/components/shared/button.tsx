import React from 'react'
import { Link } from 'gatsby'

type buttonProps = {
  styles: any,
  text?: string,
  direction?: string,
  pages?: any,
  onClick?: any,
  link?: string,
  className?: string,
  type?: string
}

export default ({ styles, text, direction, pages, onClick, link, className, type = 'button' }: buttonProps) => {
  const page = link && pages.length && pages.find(page => link.includes(page.relativePath))

  const Icon = () => {
    return direction && direction.toLowerCase() === 'right' ? (
      <img className={styles.arrow} src='' alt='right arrow' />
    ) : direction && direction.toLowerCase() === 'down' ? (
      <img className={styles.arrow} src='' alt='down arrow' />
    ) : null
  }

  const Text = () => {
    return text ? (
      <p className={styles.label}>{text}</p>
    ) : null
  }

  return (
    <div className={styles.buttonContainer}>
      {page ? (
        <Link to={page.filePath} className={styles.button + `${className ? ` ${className}` : ''}`}>
          <Icon />
          <Text />
        </Link>
      ) : (
        <button onClick={onClick} className={styles.button + `${className ? ` ${className}` : ''}`} type={type}>
          <Icon />
          <Text />
        </button>
      )}
    </div>
  )
}
