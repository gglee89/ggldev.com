import { lazy, useState } from 'react'

import './home.css'

// Sections
import Preferences from 'modules/preferences/components/Preferences'
import WebVitalsReport from 'modules/preferences/components/WebVitalsReport'
import DesktopIcons from 'modules/preferences/components/DesktopIcons'

// Components
import Layout from 'pages/layout'
import { AppsProvider } from 'pages/AppsContext'

const MovieIframe = lazy(() => import('modules/preferences/components/MovieIframe'))
const StoriesWebsiteIFrame = lazy(() => import('modules/preferences/components/StoriesWebsiteIFrame'))

// Window identifiers
const WINDOW_TYPES = {
    PREFERENCES: 'preferences',
    MOVIE_IFRAME: 'movieIframe',
    STORIES_WEBSITE_IFRAME: 'storiesWebsiteIframe',
    WEB_VITALS: 'webVitals',
} as const

type WindowType = (typeof WINDOW_TYPES)[keyof typeof WINDOW_TYPES]

const BASE_Z_INDEX = 1000

const Home = () => {
    const [focusedWindow, setFocusedWindow] = useState<WindowType>(
        WINDOW_TYPES.PREFERENCES
    )
    const getZIndex = (windowType: WindowType) => {
        return focusedWindow === windowType ? BASE_Z_INDEX + 2 : BASE_Z_INDEX
    }
    const handleWindowFocus = (windowType: WindowType) => {
        setFocusedWindow(windowType)
    }

    return (
        <AppsProvider>
            <Layout>
                <DesktopIcons />

                <Preferences
                    zIndex={getZIndex(WINDOW_TYPES.PREFERENCES)}
                    onFocus={() => handleWindowFocus(WINDOW_TYPES.PREFERENCES)}
                />

                <MovieIframe
                    zIndex={getZIndex(WINDOW_TYPES.MOVIE_IFRAME)}
                    onFocus={() => handleWindowFocus(WINDOW_TYPES.MOVIE_IFRAME)}
                />

                <StoriesWebsiteIFrame
                    zIndex={getZIndex(WINDOW_TYPES.STORIES_WEBSITE_IFRAME)}
                    onFocus={() =>
                        handleWindowFocus(WINDOW_TYPES.STORIES_WEBSITE_IFRAME)
                    }
                />
                <WebVitalsReport
                    zIndex={getZIndex(WINDOW_TYPES.WEB_VITALS)}
                    onFocus={() => handleWindowFocus(WINDOW_TYPES.WEB_VITALS)}
                />
            </Layout>
        </AppsProvider>
    )
}

export default Home
