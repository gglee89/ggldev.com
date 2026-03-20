import { createContext, useContext, useState } from "react"

export enum DesktopApps {
    Preferences,
    Movie,
    StoriesWebsite,
    WebVitals,
    UiInternals,
}

interface AppsContextProps {
    state: {
        apps: DesktopApps[]
        focusedApp: DesktopApps | null
    }
    actions: {
        openApp: (app: DesktopApps) => void
        closeApp: (app: DesktopApps) => void
        setFocusedApp: (app: DesktopApps | null) => void
    }
}

const AppsContext = createContext<AppsContextProps>({
    state: {
        apps: [],
        focusedApp: null,
    },
    actions: {
        openApp: (app: DesktopApps) => { },
        closeApp: (app: DesktopApps) => { },
        setFocusedApp: (app: DesktopApps | null) => { },
    },
})

export const AppsProvider = ({ children }: { children: React.ReactNode }) => {
    const [apps, setApps] = useState<DesktopApps[]>([
        DesktopApps.Preferences
    ])
    const [focusedApp, setFocusedApp] = useState<DesktopApps | null>(null)

    const openApp = (app: DesktopApps) => {
        setApps((prev) => (prev.includes(app) ? prev : [...prev, app]))
        setFocusedApp(app)
    }

    const closeApp = (app: DesktopApps) => {
        setApps(apps.filter((a) => a !== app))
        if (focusedApp === app) {
            setFocusedApp(null)
        }
    }

    return (
        <AppsContext.Provider value={{ state: { apps, focusedApp }, actions: { openApp, closeApp, setFocusedApp } }}>
            {children}
        </AppsContext.Provider>
    )
}

export const useApps = () => {
    const context = useContext(AppsContext)
    if (!context) {
        throw new Error('useApps must be used within an AppsProvider')
    }
    return context
}

export default AppsContext