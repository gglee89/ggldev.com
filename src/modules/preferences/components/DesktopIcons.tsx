import React, { useRef, useState, MouseEventHandler, useCallback } from 'react'
import classnames from 'classnames'
import { DesktopIcons as DesktopIconTypes } from './constants'
import icons from 'shared/icons'

interface Position {
    x: number
    y: number
}

interface DesktopIconsProps {
    onAboutMeClick: () => void
    onMovieClick: () => void
    onStoriesWebsiteClick: () => void
    isFinderOpen: boolean
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({
    onAboutMeClick,
    onMovieClick,
    onStoriesWebsiteClick,
    isFinderOpen,
}) => {
    const iconRef = useRef<HTMLDivElement>(null)
    const moviePlatformIconRef = useRef<HTMLDivElement>(null)
    const storiesWebsiteIconRef = useRef<HTMLDivElement>(null)
    const [selectedIcons, setSelectedIcons] = useState<string[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState<Position>({
        x: 50,
        y: 100,
    })
    const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })

    const handleMouseDown = (e: React.MouseEvent) => {
        if (
            e.target instanceof HTMLElement &&
            e.target.closest('.topbar-container') &&
            !e.target.closest('.title')
        ) {
            setIsDragging(true)
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            })
            e.preventDefault()
        }
    }

    const handleMouseMove = useCallback(
        (e: globalThis.MouseEvent) => {
            if (isDragging) {
                const newX = e.clientX - dragStart.x
                const newY = e.clientY - dragStart.y

                // Keep the container within viewport bounds
                const maxX = window.innerWidth - 540
                const maxY = window.innerHeight - 200

                setPosition({
                    x: Math.max(0, Math.min(newX, maxX)),
                    y: Math.max(0, Math.min(newY, maxY)),
                })
            }
        },
        [isDragging, dragStart]
    )

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    React.useEffect(() => {
        if (isDragging) {
            document.addEventListener(
                'mousemove',
                handleMouseMove as EventListener
            )
            document.addEventListener('mouseup', handleMouseUp as EventListener)
            document.body.style.cursor = 'grabbing'

            return () => {
                document.removeEventListener(
                    'mousemove',
                    handleMouseMove as EventListener
                )
                document.removeEventListener(
                    'mouseup',
                    handleMouseUp as EventListener
                )
                document.body.style.cursor = ''
            }
        }
    }, [isDragging, handleMouseMove, handleMouseUp])

    const handleClickIcon = (event: MouseEvent) => {
        if (
            iconRef.current &&
            !iconRef.current.contains(event.target as Node)
        ) {
            setSelectedIcons((prevSelection) =>
                prevSelection.filter(
                    (selection) => selection !== DesktopIconTypes.AboutMe
                )
            )
        }

        if (
            moviePlatformIconRef.current &&
            !moviePlatformIconRef.current.contains(event.target as Node)
        ) {
            setSelectedIcons((prevSelection) =>
                prevSelection.filter(
                    (selection) => selection !== DesktopIconTypes.MoviePlatform
                )
            )
        }

        if (
            storiesWebsiteIconRef.current &&
            !storiesWebsiteIconRef.current.contains(event.target as Node)
        ) {
            setSelectedIcons((prevSelection) =>
                prevSelection.filter(
                    (selection) => selection !== DesktopIconTypes.StoriesWebsite
                )
            )
        }
    }

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickIcon)
        return () => {
            document.removeEventListener('mousedown', handleClickIcon)
        }
    }, [])

    const clickAboutMe: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        if (e.detail === 1) {
            setSelectedIcons((prevSelection) => [
                ...prevSelection,
                DesktopIconTypes.AboutMe,
            ])
        } else if (e.detail === 2) {
            onAboutMeClick()
        }
    }

    const clickMoviePlatform: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        if (e.detail === 1) {
            setSelectedIcons((prevSelection) => [
                ...prevSelection,
                DesktopIconTypes.MoviePlatform,
            ])
        } else if (e.detail === 2) {
            onMovieClick()
        }
    }

    const clickStoriesWebsite: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault()
        if (e.detail === 1) {
            setSelectedIcons((prevSelection) => [
                ...prevSelection,
                DesktopIconTypes.StoriesWebsite,
            ])
        } else if (e.detail === 2) {
            onStoriesWebsiteClick()
        }
    }

    return (
        <div
            className="desktop-icon-containers"
            style={{
                position: 'fixed',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'default',
                transition: isDragging ? 'none' : 'all 0.3s ease',
            }}
            onMouseDown={handleMouseDown}
        >
            <div
                className="topbar-container"
                style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
            >
                <div className="title">Home directory</div>
            </div>
            <div className="desktop-icon-menu">
                <div
                    ref={iconRef}
                    onClick={clickAboutMe}
                    className={classnames({
                        'desktop-icon': true,
                        'is-selected':
                            isFinderOpen ||
                            selectedIcons.includes(DesktopIconTypes.AboutMe),
                    })}
                >
                    <img src={icons['notebook']} alt="notebook" />
                    <div>About Me</div>
                    <div className="subtext">
                        <div>v0.1 (ViteJS)</div>
                        <div>(AWS CloudFront)</div>
                    </div>
                </div>
                <div
                    ref={moviePlatformIconRef}
                    onClick={clickMoviePlatform}
                    className={classnames({
                        'desktop-icon': true,
                        'is-selected': selectedIcons.includes(
                            DesktopIconTypes.MoviePlatform
                        ),
                    })}
                >
                    <img src={icons['movie']} alt="movie" />
                    <div>Movie DB</div>
                    <div className="subtext">
                        <div>v0.1 (ViteJS)</div>
                        <div>(AWS CloudFront)</div>
                    </div>
                </div>
                <div
                    ref={storiesWebsiteIconRef}
                    onClick={clickStoriesWebsite}
                    className={classnames({
                        'desktop-icon': true,
                        'is-selected': selectedIcons.includes(
                            DesktopIconTypes.StoriesWebsite
                        ),
                    })}
                >
                    <img src={icons['explore']} alt="stories" />
                    <div>Stories</div>
                    <div className="subtext">
                        <div>v0.1 (NextJS)</div>
                        <div>(Vercel)</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopIcons
