import { lazy } from 'react'

import './home.css'

// Sections
import Preferences from 'modules/preferences/components/Preferences'
import WebVitalsReport from 'modules/preferences/components/WebVitalsReport'
import DesktopIcons from 'modules/preferences/components/DesktopIcons'
import UiInternalsWindow from 'modules/ui-internals/UiInternalsWindow'

// Components
import Layout from 'pages/layout'
import { AppsProvider } from 'pages/AppsContext'

const MovieIframe = lazy(() => import('modules/preferences/components/MovieIframe'))
const StoriesWebsiteIFrame = lazy(() => import('modules/preferences/components/StoriesWebsiteIFrame'))

const Home = () => {
    return (
        <AppsProvider>
            <Layout>
                <DesktopIcons />
                <Preferences />
                <MovieIframe />
                <StoriesWebsiteIFrame />
                <UiInternalsWindow />
                <WebVitalsReport />
            </Layout>
        </AppsProvider>
    )
}

export default Home
