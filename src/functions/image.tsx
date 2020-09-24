import React from 'react'

type imageProps = {
  className: string,
  container?: string,
  src: string,
  alt?: string,
  title?: string,
  style?: any,
  children?: React.ReactNode,
  onClick?: any,
  images: any
}

const handleDoNothing = () => null

export default ({ className, container, src, alt = '', title = '', style, children, images, onClick }: imageProps) => {
  const image = images.find(image => image.relativePath === 'images/' + src.split('/').pop())

  return image ? (
    !container ? (
      <img onClick={onClick || handleDoNothing} className={className} style={{ backgroundSize: 'cover', ...style }} src={image.publicURL} alt={alt || title} title={title || alt} />
    ) : (
      <div onClick={onClick || handleDoNothing} className={className} style={{ backgroundSize: 'cover', backgroundPosition: 'center center', ...style, backgroundImage: `url("${image.publicURL}")` }}>{children}</div>
    )
  ) : null
}
