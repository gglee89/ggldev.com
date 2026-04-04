import { useEffect, useRef } from 'react'

import MenuItemGeneric from './MenuItemGeneric'
import { useNewsStore } from '..'
import useGetTopStories from 'services/hackernews/hooks/useGetTopStories'

const MenuGeneric = () => {
    const loaderRef = useRef<HTMLDivElement>(null)
    const { selectedNews, setSelectedNews, limit, increaseLimit } = useNewsStore()
    const { data: topStories, isLoading } = useGetTopStories({ limit })

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                increaseLimit()
            }
        }, {
            threshold: 0.1,
        })

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => observer.disconnect()
    }, [isLoading])

    // Create a new sorted array to avoid mutating the original
    const sortedItems = [...topStories].sort((a, b) => a.time - b.time)

    return (
        <div className="menu">
            {sortedItems &&
                sortedItems.length > 0 &&
                sortedItems.map((menuItem) => {
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
            <div ref={loaderRef}>
                {isLoading ? "Loading..." : 'Scroll for more'}
            </div>
        </div>
    )
}

export default MenuGeneric
