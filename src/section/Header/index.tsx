import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

// Assets
import icons from 'shared/icons'
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
        <header className="header">
            <nav className={navClasses}>
                <div className="container-fluid">
                    <div className="header-left">
                        <HomeOutlinedIcon
                            sx={{ color: blue[500], marginRight: 1 }}
                        />
                        <div>Giwoo Lee</div>
                    </div>
                    <div className="header-right">
                        <a
                            href="https://github.com/gglee89/gglee89.github.io"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="header-right-item"
                        >
                            <img src={icons['github']} alt="github" />
                            <div>GitHub</div>
                        </a>
                        <div className="time">{currentTime}</div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
