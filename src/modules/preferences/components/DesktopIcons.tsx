import React, { useRef, useState, MouseEventHandler } from 'react'
import classnames from 'classnames'
import { DesktopIcons as DesktopIconTypes } from './constants'
import icons from 'shared/icons'
import { useDraggable } from 'hooks/useDraggable'

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

    const { isDragging, handleMouseDown, dragStyle } = useDraggable({
        initialPosition: { x: 50, y: 100 },
        bounds: { right: 540, bottom: 200 },
        initialCentered: false,
    })

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
            style={dragStyle}
        >
            <div
                className="topbar-container"
                style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                    userSelect: 'none',
                }}
                onMouseDown={handleMouseDown}
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
