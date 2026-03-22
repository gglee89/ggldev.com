import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { FaGithub } from 'react-icons/fa'

// Assets
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { blue } from '@mui/material/colors'

// Styles
import './header.css'

/**
 * Format current time using native Intl API (replaces moment.js, saves ~70KB)
 */
const formatCurrentTime = (): string => {
    const now = new Date()
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(now)
    const time = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(now)
    return `${weekday} ${time}`
}

const Header = () => {
    const [currentTime, setCurrentTime] = useState(formatCurrentTime)

    // Update time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(formatCurrentTime())
        }, 60000) // Update every minute

        return () => clearInterval(interval)
    }, [])

    const navClasses = classNames({
        navbar: true,
        'navbar-expand-lg': true,
        sticky: false,
    })

    return (
        <header className="header text-sm">
            <nav className={navClasses}>
                <div className="container-fluid">
                    <div className="header-left">
                        <HomeOutlinedIcon
                            sx={{ color: blue[500], marginRight: 1 }}
                        />
                        <div>Giwoo Lee</div>
                    </div>
                    <div className="flex items-center">
                        <a
                            href="https://github.com/gglee89/gglee89.github.io"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="flex items-center gap-2 border-r-2 border-gray-300 pr-5 text-decoration-none text-gray-300 hover:text-blue-300 [&>path]:text-gray-300 hover:[&>path]:text-blue-300"
                        >
                            <FaGithub className="h-5 w-5" />
                            <div>GitHub</div>
                        </a>
                        <div className="text-gray-300 pl-5">{currentTime}</div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
