import { createContext, useContext, useState } from "react"

export enum DesktopApps {
    Preferences,
    Movie,
    StoriesWebsite,
}

interface AppsContextProps {
    state: {
        apps: DesktopApps[]
    }
    actions: {
        openApp: (app: DesktopApps) => void
        closeApp: (app: DesktopApps) => void
    }
}

const AppsContext = createContext<AppsContextProps>({
    state: {
        apps: [],
    },
    actions: {
        openApp: (app: DesktopApps) => {},
        closeApp: (app: DesktopApps) => {},
    },
})

export const AppsProvider = ({ children }: { children: React.ReactNode }) => {
    const [apps, setApps] = useState<DesktopApps[]>([
        DesktopApps.Preferences
    ])
    
    const openApp = (app: DesktopApps) => {
        setApps([...apps, app])
    }

    const closeApp = (app: DesktopApps) => {
        setApps(apps.filter((a) => a !== app))
    }

    return (
        <AppsContext.Provider value={{ state: { apps }, actions: { openApp, closeApp } }}>
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