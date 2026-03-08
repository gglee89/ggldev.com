import api from 'services/api'
import type { HackerNewsItem } from './types'

export const getTopStories = async (
    signal?: AbortSignal
): Promise<number[]> => {
    const { data } = await api.get<number[]>('/v0/beststories.json', {
        signal,
    })

    return data
}

export const getItem = async (
    itemId: string,
    signal?: AbortSignal
): Promise<HackerNewsItem> => {
    const { data } = await api.get<HackerNewsItem>(`/v0/item/${itemId}.json`, {
        signal,
    })

    return data
}
