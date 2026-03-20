import React from 'react'
import classnames from 'classnames'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import TopBar from 'modules/preferences/components/TopBar'
import { useDraggable } from 'hooks/useDraggable'
import { DesktopApps, useApps } from 'pages/AppsContext'

import UiInternalsContent from './UiInternalsContent'

import 'modules/preferences/components/preferences.css'

const UiInternalsWindow: React.FC = () => {
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
                    'is-open': state.apps.includes(DesktopApps.UiInternals),
                })}
                style={{
                    ...dragStyle,
                    ...(handle.active && {
                        left: '0',
                        top: '0',
                        transform: 'none',
                    }),
                    zIndex: state.focusedApp === DesktopApps.UiInternals ? 10000 : 1000,
                    display: 'flex',
                    flexDirection: 'column',
                }}
                onMouseDown={(e) => {
                    handleMouseDown(e)
                    actions.setFocusedApp(DesktopApps.UiInternals)
                }}
                onClick={() => actions.setFocusedApp(DesktopApps.UiInternals)}
            >
                <TopBar
                    title="UI internals — event loop model"
                    closeFinder={() => actions.closeApp(DesktopApps.UiInternals)}
                    requestFullScreen={handle.active ? handle.exit : handle.enter}
                />
                <div
                    className="preferences-menu"
                    style={{
                        flex: 1,
                        minHeight: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}
                >
                    <UiInternalsContent compact />
                </div>
            </div>
        </FullScreen>
    )
}

export default UiInternalsWindow
