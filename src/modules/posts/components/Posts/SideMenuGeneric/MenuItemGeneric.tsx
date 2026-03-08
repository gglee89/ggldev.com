import classNames from 'classnames'
import React from 'react'
import { SiThestorygraph } from "react-icons/si";

import './menuItemGeneric.css'

/**
 * Format Unix timestamp to readable date string
 * Replaces moment.js (saves ~70KB)
 */
const formatUnixTime = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000)
    return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).format(date)
}

interface MenuItemGenericProps {
    title: string
    type: string
    time: number
    score: number
    isActive: boolean
    onClick: () => void
}

const MenuItemGeneric: React.FC<MenuItemGenericProps> = ({
    title,
    type,
    time,
    score,
    isActive,
    onClick,
}) => {
    const menuItemClasses = classNames({
        'posts-side-menu-item': true,
        active: isActive,
    })

    return (
        <div className={menuItemClasses} onClick={onClick}>
            <div className="posts-side-menu-item-left">{score}</div>
            <div className="posts-side-menu-item-post">
                <div className="[&>svg]:inline-block">
                    <SiThestorygraph />
                    <span className="inline pl-1">{title}</span>
                </div>
                <div className="date">{formatUnixTime(time)}</div>
            </div>
        </div>
    )
}

export default MenuItemGeneric
