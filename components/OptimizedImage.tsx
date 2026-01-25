import Image from 'next/image'

interface OptimizedImageProps {
    src: string
    alt: string
    width: number
    height: number
    priority?: boolean
    className?: string
}

export default function OptimizedImage({ src, alt, width, height, priority, className }: OptimizedImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className={className}
            width={width}
            height={height}
        />
    )
}
