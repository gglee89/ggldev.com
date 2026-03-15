import type { Topic } from 'modules/types'

const attributions: Record<string, { topics: Topic[] }> = {
    Stack: {
        topics: [
            {
                name: 'ReactJS',
                link: 'https://reactjs.org',
                level: 'https://reactjs.org',
                icon: 'react',
            },
            {
                name: 'GraphQL',
                link: 'https://graphql.org',
                level: 'https://graphql.org',
                icon: 'graphQL',
            },
            {
                name: 'Apollo Client',
                link: 'https://www.apollographql.com/',
                level: 'https://www.apollographql.com/',
                icon: 'apolloClient',
            },
            {
                name: 'NodeJS',
                link: 'https://nodejs.org',
                level: 'https://nodejs.org',
                icon: 'nodeJS',
            },
            {
                name: 'MongoDB',
                link: 'https://mongodb.com',
                level: 'https://mongodb.com',
                icon: 'mongoDB',
            },
            {
                name: 'Github Pages',
                link: 'https://pages.github.com',
                level: 'https://pages.github.com',
                icon: 'github',
            },
            {
                name: 'AWS',
                link: 'https://aws.amazon.com',
                level: 'https://aws.amazon.com',
                icon: 'aws',
            },
        ],
    },
    Images: {
        topics: [
            {
                name: 'Background photo - Created by ydlabs',
                link: 'https://freepik.com/ydlabs',
                level: 'https://freepik.com/ydlabs',
                icon: 'freepik',
            },
            {
                name: 'Background photo - Created by Danmir12',
                link: 'https://www.freepik.com/danmir12',
                level: 'https://www.freepik.com/danmir12',
                icon: 'freepik',
            },
            {
                name: 'Background photo - Created by Starline',
                link: 'https://www.freepik.com/starline',
                level: 'https://www.freepik.com/starline',
                icon: 'freepik',
            },
            {
                name: 'Background photo - Created by Lifeforstock',
                link: 'https://www.freepik.com/lifeforstock',
                level: 'https://www.freepik.com/lifeforstock',
                icon: 'freepik',
            },
            {
                name: 'Background photo - Created by Photoangel',
                link: 'https://www.freepik.com/photoangel',
                level: 'https://www.freepik.com/photoangel',
                icon: 'freepik',
            },
        ],
    },
}

export default attributions
