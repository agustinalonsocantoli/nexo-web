import Image from 'next/image'
import React from 'react'

interface OptimizedImageProps {
    src: string
    alt: string
    width: number
    height: number
    priority?: boolean
    className?: string
    sizes?: string
    style?: React.CSSProperties
}

export default function OptimizedImage({ src, alt, width, height, priority, className, sizes, style }: OptimizedImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            priority={priority}
            className={className}
            width={width}
            height={height}
            sizes={sizes}
            style={style}
        />
    )
}
