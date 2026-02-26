import Image from 'next/image'

interface OptimizedImageProps {
    src: string
    alt: string
    width: number
    height: number
    priority?: boolean
    className?: string
    sizes?: string
}

export default function OptimizedImage({ src, alt, width, height, priority, className, sizes }: OptimizedImageProps) {
    return (
        <Image
            src={src}
            alt={alt}
            priority={priority}
            className={className}
            width={width}
            height={height}
            sizes={sizes}
        />
    )
}
