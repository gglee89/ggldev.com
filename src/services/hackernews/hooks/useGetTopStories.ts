import { useQuery } from '@tanstack/react-query'
import { HackerNewsQueryKeys } from '../queryKeys'
import { getTopStories } from 'services/hackernews'

import useGetItems from 'services/hackernews/hooks/useGetItems'

const useGetTopStories = () => {
    const query = useQuery({
        queryKey: HackerNewsQueryKeys.GetTopStories(),
        queryFn: ({ signal }) => getTopStories(signal),
    })

    const top10stories = query.data?.slice(0, 10)

    return useGetItems(top10stories?.map((id) => String(id)) ?? [])
}

export default useGetTopStories
