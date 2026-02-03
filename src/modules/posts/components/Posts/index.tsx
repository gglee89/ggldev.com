import React from 'react'

import './posts.css'
import ContentRenderer from './ContentRenderer'

import useGetTopStories from 'services/hackernews/hooks/useGetTopStories'
import useGetItems from 'services/hackernews/hooks/useGetItems'
import { create } from 'zustand'
import type { HackerNewsItem } from 'services/hackernews/types'
import SideMenuGeneric from './SideMenuGeneric'

interface NewsStore {
    selectedNews: HackerNewsItem | null
    setSelectedNews: (newSelectedNews: HackerNewsItem) => void
}

export const useNewsStore = create<NewsStore>((set) => ({
    selectedNews: null,
    setSelectedNews: (newSelectedNews: HackerNewsItem) =>
        set({ selectedNews: newSelectedNews }),
}))

const Posts: React.FC = () => {
    const { data: topStoriesIds } = useGetTopStories()
    const top10stories = (topStoriesIds ?? []).slice(0, 10)
    const { data: items } = useGetItems(top10stories.map((id) => String(id)))
    // Create a new sorted array to avoid mutating the original
    const sortedItems = [...items].sort((a, b) => a.time - b.time)

    return (
        <div className="posts-container">
            <SideMenuGeneric<HackerNewsItem> menuItems={sortedItems} />
            <ContentRenderer />
        </div>
    )
}

export default Posts
