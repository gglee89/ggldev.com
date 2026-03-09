import React from 'react'
import { SiThestorygraph } from "react-icons/si";
import { MdComment, MdPoll, MdWorkspaces } from "react-icons/md";

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
    return (
        <div className={`${isActive ? 'bg-gray-300' : ''} flex cursor-pointer text-sm hover:bg-gray-400 py-[10px] px-[5px]`} onClick={onClick}>
            <div className="min-w-[45px]">{score}</div>
            <div className="posts-side-menu-item-post">
                <div className="[&>svg]:inline-block">
                    {type === 'story' && <SiThestorygraph />}
                    {type === 'job' && <MdWorkspaces />}
                    {type === 'poll' && <MdPoll />}
                    {type === 'pollopt' && <SiThestorygraph />}
                    {type === 'comment' && <MdComment />}
                    <span className="inline pl-1">{title}</span>
                </div>
                <div className="date">{formatUnixTime(time)}</div>
            </div>
        </div>
    )
}

export default MenuItemGeneric
