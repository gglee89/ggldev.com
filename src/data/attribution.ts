import { FaAws, FaGithub, FaNodeJs, FaReact } from 'react-icons/fa'
import { SiApollographql, SiGraphql, SiFreepik, SiMongodb } from "react-icons/si";
import type { Topic } from 'modules/types'

const attributions: Record<string, { topics: Topic[] }> = {
    Stack: {
        topics: [
            {
                name: 'ReactJS',
                link: 'https://reactjs.org',
                level: 'https://reactjs.org',
                icon: FaReact
                    
            },
            {
                name: 'GraphQL',
                link: 'https://graphql.org',
                level: 'https://graphql.org',
                icon: SiGraphql,
            },
            {
                name: 'Apollo Client',
                link: 'https://www.apollographql.com/',
                level: 'https://www.apollographql.com/',
                icon: SiApollographql,
            },
            {
                name: 'NodeJS',
                link: 'https://nodejs.org',
                level: 'https://nodejs.org',
                icon: FaNodeJs,
            },
            {
                name: 'MongoDB',
                link: 'https://mongodb.com',
                level: 'https://mongodb.com',
                icon: SiMongodb,
            },
            {
                name: 'Github Pages',
                link: 'https://pages.github.com',
                level: 'https://pages.github.com',
                icon: FaGithub,
            },
            {
                name: 'AWS',
                link: 'https://aws.amazon.com',
                level: 'https://aws.amazon.com',
                icon: FaAws,
            },
        ],
    },
    Images: {
        topics: [
            {
                name: 'Background photo - Created by ydlabs',
                link: 'https://freepik.com/ydlabs',
                level: 'https://freepik.com/ydlabs',
                icon: SiFreepik,
            },
            {
                name: 'Background photo - Created by Danmir12',
                link: 'https://www.freepik.com/danmir12',
                level: 'https://www.freepik.com/danmir12',
                icon: SiFreepik,
            },
            {
                name: 'Background photo - Created by Starline',
                link: 'https://www.freepik.com/starline',
                level: 'https://www.freepik.com/starline',
                icon: SiFreepik,
            },
            {
                name: 'Background photo - Created by Lifeforstock',
                link: 'https://www.freepik.com/lifeforstock',
                level: 'https://www.freepik.com/lifeforstock',
                icon: SiFreepik,
            },
            {
                name: 'Background photo - Created by Photoangel',
                link: 'https://www.freepik.com/photoangel',
                level: 'https://www.freepik.com/photoangel',
                icon: SiFreepik,
            },
        ],
    },
}

export default attributions
