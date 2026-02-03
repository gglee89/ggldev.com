import { useState, useEffect, useCallback, ReactNode } from 'react'
import './backgroundWrapper.css'

// Images - using progressive loading config
import { backgroundsWithPlaceholders } from 'shared/backgrounds'

// Use bg1 which is one of the smaller backgrounds (142KB optimized)
const BACKGROUND_IMAGE_KEY = 'bg1' as const

interface BackgroundWrapperProps {
    /** Additional CSS class names */
    className?: string
    /** Child components to render */
    children: ReactNode
    /** Background position (default: 'center') */
    position?: string
    /** Background size (default: 'cover') */
    size?: string
    /** Callback when background image has loaded */
    onLoad?: () => void
}

/**
 * BackgroundWrapper - A wrapper component with progressive background image loading
 *
 * Features:
 * - Preloads background image before displaying
 * - Optional blur-up placeholder effect
 * - Loading state management
 * - Smooth transition when image loads
 *
 * @example
 * <BackgroundWrapper
 *   src={backgroundImage}
 *   placeholder={placeholderImage}
 *   className="my-page"
 * >
 *   <Header />
 *   <Content />
 * </BackgroundWrapper>
 */
const BackgroundWrapper = ({
    className = '',
    children,
    position = 'center',
    size = 'cover',
    onLoad,
}: BackgroundWrapperProps) => {
    // Get background config with progressive loading support
    const bgConfig = backgroundsWithPlaceholders[BACKGROUND_IMAGE_KEY]
    const { full: src, placeholder} = bgConfig

    const [isLoaded, setIsLoaded] = useState(false)
    const [currentSrc, setCurrentSrc] = useState(placeholder || '')


    const handleImageLoad = useCallback(() => {
        setCurrentSrc(src)
        setIsLoaded(true)
        onLoad?.()
    }, [src, onLoad])

    useEffect(() => {
        // Skip if already loaded with this src
        if (isLoaded && currentSrc === src) return

        const img = new Image()
        img.src = src

        img.onload = handleImageLoad
        img.onerror = () => {
            // Fallback to showing the original source even if preload fails
            setCurrentSrc(src)
            setIsLoaded(true)
        }

        return () => {
            img.onload = null
            img.onerror = null
        }
    }, [src, isLoaded, currentSrc, handleImageLoad])

    return (
        <div
            className={`Home background-wrapper ${className} ${isLoaded ? 'bg-loaded' : 'bg-loading'}`}
            style={{
                backgroundImage: currentSrc ? `url(${currentSrc})` : undefined,
                backgroundPosition: position,
                backgroundSize: size,
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Blur placeholder overlay - fades out when main image loads */}
            {placeholder && !isLoaded && (
                <div
                    className="background-wrapper__placeholder"
                    style={{
                        backgroundImage: `url(${placeholder})`,
                        backgroundPosition: position,
                        backgroundSize: size,
                    }}
                    aria-hidden="true"
                />
            )}
            {children}
        </div>
    )
}

export default BackgroundWrapper
