import React, { useState, useEffect, useCallback } from 'react'
import './lazyBackground.css'

interface LazyBackgroundProps {
    /** URL of the full-resolution background image */
    src: string
    /** Optional tiny placeholder image (base64 or small URL) for blur-up effect */
    placeholder?: string
    /** Additional class names */
    className?: string
    /** Children to render on top of the background */
    children?: React.ReactNode
    /** Background position (default: 'center') */
    position?: string
    /** Background size (default: 'cover') */
    size?: string
}

/**
 * LazyBackground - A component that progressively loads background images
 * 
 * Features:
 * - Shows a blurred placeholder while loading
 * - Fades in the full image when loaded
 * - Reduces perceived load time significantly
 * 
 * Usage:
 * <LazyBackground 
 *   src={fullImage} 
 *   placeholder={tinyPlaceholder}
 *   className="my-section"
 * >
 *   <h1>Content</h1>
 * </LazyBackground>
 */
const LazyBackground: React.FC<LazyBackgroundProps> = ({
    src,
    placeholder,
    className = '',
    children,
    position = 'center',
    size = 'cover',
}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentSrc, setCurrentSrc] = useState(placeholder || '')

    const loadImage = useCallback(() => {
        const img = new Image()
        img.src = src
        
        img.onload = () => {
            setCurrentSrc(src)
            setIsLoaded(true)
        }
        
        img.onerror = () => {
            // If loading fails, still try to show the original source
            setCurrentSrc(src)
            setIsLoaded(true)
        }
    }, [src])

    useEffect(() => {
        // Use Intersection Observer to only load when visible
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            loadImage()
                            observer.disconnect()
                        }
                    })
                },
                { rootMargin: '50px' }
            )

            // Create a temporary element to observe
            const element = document.querySelector(`.lazy-bg-container`)
            if (element) {
                observer.observe(element)
            } else {
                // Fallback if element not found
                loadImage()
            }

            return () => observer.disconnect()
        } else {
            // Fallback for browsers without IntersectionObserver
            loadImage()
        }
    }, [loadImage])

    return (
        <div
            className={`lazy-bg-container ${className} ${isLoaded ? 'is-loaded' : 'is-loading'}`}
            style={{
                backgroundImage: currentSrc ? `url(${currentSrc})` : undefined,
                backgroundPosition: position,
                backgroundSize: size,
            }}
        >
            {/* Blur overlay that fades out when image is loaded */}
            {placeholder && !isLoaded && (
                <div
                    className="lazy-bg-placeholder"
                    style={{
                        backgroundImage: `url(${placeholder})`,
                        backgroundPosition: position,
                        backgroundSize: size,
                    }}
                />
            )}
            {children}
        </div>
    )
}

export default LazyBackground
