import { FaAws, FaGithub, FaNodeJs, FaReact } from 'react-icons/fa'
import { SiApollographql, SiFreepik, SiGraphql, SiMongodb } from 'react-icons/si'
import type { IconType } from 'react-icons'

/** Map of string keys to React icon components. Used to avoid storing component refs in Redux. */
export const iconComponents: Record<string, IconType> = {
    react: FaReact,
    graphQL: SiGraphql,
    apolloClient: SiApollographql,
    nodeJS: FaNodeJs,
    mongoDB: SiMongodb,
    github: FaGithub,
    aws: FaAws,
    freepik: SiFreepik,
}
