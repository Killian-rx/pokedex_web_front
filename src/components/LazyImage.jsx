'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// Placeholder blur (petit carré gris en base64 pour affichage pendant le chargement)
const BLUR_DATA_URL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNlOGU4ZTgiLz48L3N2Zz4='

const LazyImage = ({
  src,
  alt,
  className,
  style = {},
  width = 128,
  height = 128,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        className={className}
        style={{
          width,
          height,
          backgroundColor: '#f8d7da',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#721c24',
          fontSize: '0.9rem',
          ...style,
        }}
      >
        Image non disponible
      </div>
    )
  }

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        onError={() => setHasError(true)}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}

export default LazyImage
