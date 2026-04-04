import { useQuery } from '@tanstack/react-query'

import { getTopStories } from 'services/hackernews'
import useGetItems from 'services/hackernews/hooks/useGetItems'

import { HackerNewsQueryKeys } from '../queryKeys'

const useGetTopStories = ({ limit = 10 }: { limit?: number } = {}) => {
    const query = useQuery({
        queryKey: HackerNewsQueryKeys.GetTopStories(),
        queryFn: ({ signal }) => getTopStories(signal),
    })

    const topStories = query.data?.slice(0, limit)

    return useGetItems(topStories?.map((id) => String(id)) ?? [])
}

export default useGetTopStories
