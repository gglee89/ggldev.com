import React from 'react'
import TopMenu from './TopMenu'
import MenuGeneric from './MenuGeneric'
import type { HackerNewsItem } from 'services/hackernews/types'

import './sideMenu.css'

interface SideMenuGenericProps<T> {
    menuItems: T[]
    isLoading: boolean
}

const SideMenuGeneric = <T extends HackerNewsItem>({
    menuItems,
    isLoading,
}: SideMenuGenericProps<T>) => {
    return (
        <div className="side-menu-container">
            <TopMenu />
            <MenuGeneric<T> menuItems={menuItems} isLoading={isLoading} />
        </div>
    )
}

export default SideMenuGeneric
