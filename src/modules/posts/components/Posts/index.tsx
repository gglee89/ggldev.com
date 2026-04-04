import './posts.css'
import ContentRenderer from './ContentRenderer'

import { create } from 'zustand'
import type { HackerNewsItem } from 'services/hackernews/types'
import SideMenuGeneric from './SideMenuGeneric'

const DEFAULT_ITEMS_TO_LOAD = 10

interface NewsStore {
    selectedNews: HackerNewsItem | null
    setSelectedNews: (newSelectedNews: HackerNewsItem) => void
    limit: number
    increaseLimit: () => void
}

export const useNewsStore = create<NewsStore>((set) => ({
    limit: DEFAULT_ITEMS_TO_LOAD,
    increaseLimit: () => set((state) => ({ limit: state.limit + DEFAULT_ITEMS_TO_LOAD })),
    selectedNews: null,
    setSelectedNews: (newSelectedNews: HackerNewsItem) =>
        set({ selectedNews: newSelectedNews }),
}))

const Posts = () => {
    return (
        <div className="posts-container">
            <SideMenuGeneric />
            <ContentRenderer />
        </div>
    )
}

export default Posts
