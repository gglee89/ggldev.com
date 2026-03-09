import React from 'react'
import classnames from 'classnames'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { MOVIE_PLATFORM_LINK } from './constants'
import TopBar from './TopBar'
import { useDraggable } from 'hooks/useDraggable'
import { DesktopApps, useApps } from 'pages/AppsContext'

const MovieIframe: React.FC = () => {
    const handle = useFullScreenHandle()
    const { state, actions } = useApps()
    const { handleMouseDown, dragStyle } = useDraggable({
        initialPosition: { x: 0, y: 0 },
        disabled: handle.active,
        bounds: { right: 570, bottom: 100 },
        dragHandleSelector: '.topbar-container',
        excludeSelectors: ['.window-control'],
        initialCentered: true,
    })

    return (
        <FullScreen handle={handle}>
            <div
                className={classnames({
                    container: true,
                    'preferences-container': true,
                    'is-open': state.apps.includes(DesktopApps.Movie),
                })}
                style={{
                    ...dragStyle,
                    ...(handle.active && {
                        left: '0',
                        top: '0',
                        transform: 'none',
                    }),
                    zIndex: state.focusedApp === DesktopApps.Movie ? 10000 : 1000,
                    display: 'flex',
                    flexDirection: 'column',
                }}
                onMouseDown={handleMouseDown}
                onClick={() => actions.setFocusedApp(DesktopApps.Movie)}
            >
                <TopBar
                    title="https://platform.ggldev.com"
                    closeFinder={() => actions.closeApp(DesktopApps.Movie)}
                    requestFullScreen={
                        handle.active ? handle.exit : handle.enter
                    }
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
                        src={MOVIE_PLATFORM_LINK}
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            flex: 1,
                        }}
                        title="Movie Platform"
                    />
                </div>
            </div>
        </FullScreen>
    )
}

export default MovieIframe
