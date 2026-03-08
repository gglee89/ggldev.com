import React from 'react'

import './contentRenderer.css'

// Components
import ContentSection from './ContentSection'
import { RendererContext } from 'modules/posts/constants'
import { useNewsStore } from '..'

type RendererContextKeys = keyof typeof RendererContext
export type RendererContextType = (typeof RendererContext)[RendererContextKeys]

export interface Renderer {
    rendererContext: RendererContextType
    renderedImage: string
}

const ContentRenderer: React.FC = () => {
    const { selectedNews } = useNewsStore()

    return (
        <div className="post-renderer-container">
            {selectedNews ? (
                <ContentSection title={selectedNews.title} by={selectedNews.by} url={selectedNews.url} text={selectedNews.text} />
            ) : (
                <div className="post-renderer-section">
                    <div className="post-renderer-section-title">No news selected</div>
                </div>
            )}
        </div>
    )
}

export default ContentRenderer
