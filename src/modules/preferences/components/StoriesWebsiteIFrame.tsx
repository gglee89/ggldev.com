import React from 'react'
import classnames from 'classnames'
import { useFullScreenHandle } from 'react-full-screen'
import { STORIES_WEBSITE_LINK } from './constants'
import TopBar from './TopBar'
import { useDraggable } from 'hooks/useDraggable'

interface StoriesWebsiteIframeProps {
    onClose: () => void
    zIndex: number
    onFocus: () => void
}

const StoriesWebsiteIframe: React.FC<StoriesWebsiteIframeProps> = ({
    onClose,
    zIndex,
    onFocus,
}) => {
    const handle = useFullScreenHandle()

    const { isDragging, handleMouseDown, dragStyle } = useDraggable({
        initialPosition: { x: 0, y: 0 },
        disabled: handle.active,
        onFocus,
        bounds: { right: 570, bottom: 100 },
        dragHandleSelector: '.topbar-container',
        excludeSelectors: ['.window-control'],
        initialCentered: true,
    })

    return (
        <div
            className={classnames({
                container: true,
                'preferences-container': true,
                'is-open': true,
            })}
            style={{
                ...dragStyle,
                ...(handle.active && {
                    left: '0',
                    top: '0',
                    transform: 'none',
                }),
                zIndex,
                display: 'flex',
                flexDirection: 'column',
            }}
            onMouseDown={handleMouseDown}
        >
            <TopBar
                title="https://stories.ggldev.com"
                closeFinder={onClose}
                requestFullScreen={handle.active ? handle.exit : handle.enter}
            />
            <div
                className="preferences-menu"
                style={{
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <iframe
                    src={STORIES_WEBSITE_LINK}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        flex: 1,
                    }}
                    title="Stories"
                />
            </div>
        </div>
    )
}

export default StoriesWebsiteIframe
