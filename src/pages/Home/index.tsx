import React, { useState } from 'react'

import './home.css'

// Sections
import Header from 'section/Header'
import Preferences from 'modules/preferences/components/Preferences'
import WebVitalsReport from 'modules/preferences/components/WebVitalsReport'
import MovieIframe from 'modules/preferences/components/MovieIframe'
import DesktopIcons from 'modules/preferences/components/DesktopIcons'

// Images
import backgrounds from 'shared/backgrounds'
import StoriesWebsiteIframe from 'modules/preferences/components/StoriesWebsiteIFrame'

const BACKGROUND_IMAGE_INDEX = 'bg1'

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
    const [showMovieIframe, setShowMovieIframe] = useState(false)
    const [showStoriesWebsite, setShowStoriesWebsite] = useState(false)
    const [isFinderOpen, setIsFinderOpen] = useState(true)
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
        <div
            className="Home"
            style={{
                backgroundImage: `url(${backgrounds[BACKGROUND_IMAGE_INDEX]})`,
            }}
        >
            <Header />
            <DesktopIcons
                onAboutMeClick={() => setIsFinderOpen(true)}
                onMovieClick={() => setShowMovieIframe(true)}
                onStoriesWebsiteClick={() => setShowStoriesWebsite(true)}
                isFinderOpen={isFinderOpen}
            />
            <Preferences
                zIndex={getZIndex(WINDOW_TYPES.PREFERENCES)}
                onFocus={() => handleWindowFocus(WINDOW_TYPES.PREFERENCES)}
                isOpen={isFinderOpen}
                onClose={() => setIsFinderOpen(false)}
            />
            {showMovieIframe && (
                <MovieIframe
                    onClose={() => {
                        setShowMovieIframe(false)
                    }}
                    zIndex={getZIndex(WINDOW_TYPES.MOVIE_IFRAME)}
                    onFocus={() => handleWindowFocus(WINDOW_TYPES.MOVIE_IFRAME)}
                />
            )}
            {showStoriesWebsite && (
                <StoriesWebsiteIframe
                    onClose={() => setShowStoriesWebsite(false)}
                    zIndex={getZIndex(WINDOW_TYPES.STORIES_WEBSITE_IFRAME)}
                    onFocus={() =>
                        handleWindowFocus(WINDOW_TYPES.STORIES_WEBSITE_IFRAME)
                    }
                />
            )}
            <WebVitalsReport
                zIndex={getZIndex(WINDOW_TYPES.WEB_VITALS)}
                onFocus={() => handleWindowFocus(WINDOW_TYPES.WEB_VITALS)}
            />
        </div>
    )
}

export default Home
