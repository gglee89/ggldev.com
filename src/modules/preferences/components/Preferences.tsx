import React, { Suspense } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import classnames from 'classnames'

// @MUI
import { LinearProgress } from '@mui/material'

// Styles
import './preferences.css'

// Components
import TopBar from './TopBar'
import TopNavigationMenu from './TopNavigationMenu'

// Hooks
import { useDraggable } from 'hooks/useDraggable'

// Selectors
import { useAppDispatch, useAppSelector } from 'store'
import { getProjectName } from 'modules/projects/slice'
import { getSelectedMenu, selectMenu } from 'modules/preferences/slice'
import { MENU_ITEMS, menuOptions } from '../constants'
import { DesktopApps, useApps } from 'pages/AppsContext'

interface PreferencesProps {
    zIndex: number
    onFocus: () => void
}

// Components (Menu Content Items)
const General = React.lazy(
    () => import('modules/preferences/components/General')
)
const Projects = React.lazy(
    () => import('modules/projects/components/Projects')
)
const Interests = React.lazy(
    () => import('modules/interests/components/Interests')
)
const Mission = React.lazy(
    () => import('modules/preferences/components/Mission')
)
const Contact = React.lazy(() => import('modules/contacts/components/Contact'))
const Attribution = React.lazy(
    () => import('modules/attribution/components/Attribution')
)
const Posts = React.lazy(() => import('modules/posts/components/Posts'))

const Preferences: React.FC<PreferencesProps> = ({
    zIndex,
    onFocus
}) => {
    const handle = useFullScreenHandle()
    const dispatch = useAppDispatch()
    const projectName = useAppSelector(getProjectName)
    const selectedMenu = useAppSelector(getSelectedMenu)
    const { state, actions } = useApps()

    const { handleMouseDown, dragStyle } = useDraggable({
        initialPosition: { x: 0, y: 0 },
        disabled: handle.active,
        onFocus,
        bounds: { right: 570, bottom: 100 },
        dragHandleSelector: '.topbar-container',
        excludeSelectors: ['.window-control'],
        initialCentered: true,
    })

    const preferencesContainerClasses = classnames({
        container: true,
        'preferences-container': true,
        'is-open': state.apps.includes(DesktopApps.Preferences),
    })

    return (
        <FullScreen handle={handle}>
            <div
                className={preferencesContainerClasses}
                style={{
                    ...dragStyle,
                    // Override for fullscreen mode
                    ...(handle.active && {
                        left: '0',
                        top: '0',
                        transform: 'none',
                    }),
                    zIndex,
                }}
                onMouseDown={handleMouseDown}
            >
                <TopBar
                    title="https://ggldev.com"
                    closeFinder={() => actions.closeApp(DesktopApps.Preferences)}
                    requestFullScreen={
                        handle.active ? handle.exit : handle.enter
                    }
                />
                <TopNavigationMenu
                    menuItems={menuOptions}
                    selectMenu={(menuTitle: string) =>
                        dispatch(selectMenu(menuTitle))
                    }
                    selectedMenu={selectedMenu}
                />
                <div className="preferences-menu">
                    <Suspense fallback={<LinearProgress color="primary" />}>
                        {selectedMenu === MENU_ITEMS.GENERAL && <General />}
                        {selectedMenu === MENU_ITEMS.PROJECTS && (
                            <Projects projectName={projectName} />
                        )}
                        {selectedMenu === MENU_ITEMS.INTERESTS && <Interests />}
                        {selectedMenu === MENU_ITEMS.MISSION && <Mission />}
                        {selectedMenu === MENU_ITEMS.CONTACT && <Contact />}
                        {selectedMenu === MENU_ITEMS.ATTRIBUTION && (
                            <Attribution />
                        )}
                        {selectedMenu === MENU_ITEMS.POSTS && <Posts />}
                    </Suspense>
                </div>
            </div>
        </FullScreen>
    )
}

export default Preferences
