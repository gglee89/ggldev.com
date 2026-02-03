/**
 * Google Analytics 4 utility functions
 * Measurement ID: G-5V6MG3MJD8
 */

// Extend window to include gtag
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js' | 'set',
            targetId: string | Date,
            config?: Record<string, unknown>
        ) => void
        dataLayer: unknown[]
    }
}

export const GA_MEASUREMENT_ID = 'G-5V6MG3MJD8'

/**
 * Track a page view
 * GA4 automatically tracks page views, but use this for SPA navigation
 */
export const trackPageView = (url: string, title?: string) => {
    if (typeof window.gtag !== 'function') return

    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: title,
    })
}

/**
 * Track a custom event
 * @example trackEvent('button_click', { button_name: 'submit' })
 */
export const trackEvent = (
    eventName: string,
    eventParams?: Record<string, string | number | boolean>
) => {
    if (typeof window.gtag !== 'function') return

    window.gtag('event', eventName, eventParams)
}

// Pre-defined event helpers for common actions
export const analytics = {
    /** Track when a project is viewed */
    trackProjectView: (projectName: string) => {
        trackEvent('view_project', { project_name: projectName })
    },

    /** Track when a menu item is selected */
    trackMenuSelect: (menuItem: string) => {
        trackEvent('menu_select', { menu_item: menuItem })
    },

    /** Track external link clicks */
    trackExternalLink: (url: string, label?: string) => {
        trackEvent('click', {
            event_category: 'outbound',
            event_label: label || url,
            transport_type: 'beacon',
        })
    },

    /** Track resume download */
    trackResumeDownload: () => {
        trackEvent('file_download', { file_name: 'resume' })
    },

    /** Track window open (Movie DB, Stories, etc.) */
    trackWindowOpen: (windowName: string) => {
        trackEvent('window_open', { window_name: windowName })
    },
}

export default analytics
