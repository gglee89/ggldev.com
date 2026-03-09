import MenuItemGeneric from './MenuItemGeneric'
import type { HackerNewsItem } from 'services/hackernews/types'
import { useNewsStore } from '..'

interface MenuGeneric<T> {
    menuItems: T[]
    isLoading: boolean
}

const MenuGeneric = <T extends HackerNewsItem>({
    menuItems,
    isLoading,
}: MenuGeneric<T>) => {
    const { selectedNews, setSelectedNews } = useNewsStore()

    if (isLoading) {
        return (
            <div className="flex flex-col gap-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div className="animate-pulse w-full bg-gray-300 h-12" />
                ))}
            </div>
        )
    }

    return (
        <div className="menu">
            {menuItems &&
                menuItems.length > 0 &&
                menuItems.map((menuItem) => {
                    return (
                        <MenuItemGeneric
                            key={menuItem.id}
                            isActive={menuItem.id === selectedNews?.id}
                            type={menuItem.type}
                            title={menuItem.title}
                            time={menuItem.time}
                            score={menuItem.score}
                            onClick={() => setSelectedNews(menuItem)}
                        />
                    )
                })}
        </div>
    )
}

export default MenuGeneric
