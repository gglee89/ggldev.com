import React, { useRef, useState, MouseEventHandler } from 'react'
import classnames from 'classnames'
import icons from 'shared/icons'
import { useDraggable } from 'hooks/useDraggable'
import { useApps, DesktopApps } from 'pages/AppsContext'

const DesktopIcons: React.FC = () => {
    const iconRef = useRef<HTMLDivElement>(null)
    const moviePlatformIconRef = useRef<HTMLDivElement>(null)
    const storiesWebsiteIconRef = useRef<HTMLDivElement>(null)
    const [selectedIcons, setSelectedIcons] = useState<DesktopApps[]>([DesktopApps.Preferences])

    const { actions } = useApps()

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
                    (selection) => selection !== DesktopApps.Preferences
                )
            )
        }

        if (
            moviePlatformIconRef.current &&
            !moviePlatformIconRef.current.contains(event.target as Node)
        ) {
            setSelectedIcons((prevSelection) =>
                prevSelection.filter(
                    (selection) => selection !== DesktopApps.Movie
                )
            )
        }

        if (
            storiesWebsiteIconRef.current &&
            !storiesWebsiteIconRef.current.contains(event.target as Node)
        ) {
            setSelectedIcons((prevSelection) =>
                prevSelection.filter(
                    (selection) => selection !== DesktopApps.StoriesWebsite
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

    const onClickIcon = (icon: DesktopApps): MouseEventHandler<HTMLDivElement> => (e) => {
        e.preventDefault()
        if (e.detail === 1) {
            setSelectedIcons((prevSelection) => [
                ...prevSelection,
                icon,
            ])
        } else if (e.detail === 2) {
            actions.openApp(icon)
            setSelectedIcons((prevSelection) => prevSelection.filter((selection) => selection !== icon))
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
                    onClick={onClickIcon(DesktopApps.Preferences)}
                    className={classnames({
                        'desktop-icon': true,
                        'is-selected':
                            selectedIcons.includes(DesktopApps.Preferences),
                    })}
                >
                    <img src={icons['notebook']} alt="notebook" />
                    <div>About Me</div>
                    <div className="subtext user-select-none">
                        <div>v0.1 (ViteJS)</div>
                        <div>(AWS CloudFront)</div>
                    </div>
                </div>
                <div
                    ref={moviePlatformIconRef}
                    onClick={onClickIcon(DesktopApps.Movie)}
                    className={classnames({
                        'desktop-icon': true,
                        'is-selected': selectedIcons.includes(
                            DesktopApps.Movie
                        ),
                    })}
                >
                    <img src={icons['movie']} alt="movie" />
                    <div>Movie DB</div>
                    <div className="subtext user-select-none">
                        <div>v0.1 (ViteJS)</div>
                        <div>(AWS CloudFront)</div>
                    </div>
                </div>
                <div
                    ref={storiesWebsiteIconRef}
                    onClick={onClickIcon(DesktopApps.StoriesWebsite)}
                    className={classnames({
                        'desktop-icon': true,
                        'is-selected': selectedIcons.includes(
                            DesktopApps.StoriesWebsite
                        ),
                    })}
                >
                    <img src={icons['explore']} alt="stories" />
                    <div>Stories</div>
                    <div className="subtext user-select-none">
                        <div>v0.1 (NextJS)</div>
                        <div>(Vercel)</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopIcons
