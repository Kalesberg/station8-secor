import React, { useContext } from 'react'

import { Context } from '../components/context/context'

type imageProps = {
  className: string,
  container?: string,
  src: string,
  alt?: string,
  title?: string,
  style?: any,
  children?: React.ReactNode,
  onClick?: any,
  gradient?: string,
  id?: any
}

const handleDoNothing = () => null

export default ({ className, container, src, alt = '', title = '', style, children, onClick, gradient = '', id = Math.random() }: imageProps) => {
  const context = useContext(Context)

  const image = context.images && context.images.length && context.images.find(image => image.relativePath === 'images/' + src.split('/').pop())

  return image ? (
    !container ? (
      <img id={id} onClick={onClick || handleDoNothing} className={className} style={{ backgroundSize: 'cover', ...style }} src={image.publicURL} alt={alt || title} title={title || alt} />
    ) : (
      <div id={id} onClick={onClick || handleDoNothing} className={className} style={{ backgroundSize: 'cover', backgroundPosition: 'center center', ...style, backgroundImage: `${gradient ? `${gradient}, ` : ''}url("${image.publicURL}")` }}>{children}</div>
    )
  ) : null
}
