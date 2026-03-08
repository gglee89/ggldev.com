import React from 'react'

import './posts.css'
import ContentRenderer from './ContentRenderer'

import useGetTopStories from 'services/hackernews/hooks/useGetTopStories'

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
    const { data: topStories, isLoading } = useGetTopStories()

    // Create a new sorted array to avoid mutating the original
    const sortedItems = [...topStories].sort((a, b) => a.time - b.time)

    return (
        <div className="posts-container">
            <SideMenuGeneric<HackerNewsItem> menuItems={sortedItems} isLoading={isLoading} />
            <ContentRenderer />
        </div>
    )
}

export default Posts
