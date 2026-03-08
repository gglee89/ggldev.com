import React from 'react'

import './contentSection.css'

function decodeHTML(str: string) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
}

interface ContentSectionProps {
    title: string
    url: string
    by: string
    text?: string
}
const ContentSection: React.FC<ContentSectionProps> = ({
    title,
    url,
    by,
    text,
}) => {
    return (
        <div className="content-renderer-section h-100">
            <div className="content-renderer-section-title font-bold">{title}</div>
            <div className="content-renderer-form h-100 flex flex-col gap-4">
                <div className="inline-flex flex-col gap-2">
                    <div>
                        <span className="font-bold">News URL: </span>
                        <a href={url} rel="noreferrer" target="_blank">
                            {url}
                        </a>
                    </div>
                    <div>
                        <span className="font-bold">Author: </span>
                        {by}
                    </div>
                </div>
                {text && <pre className="text-sm break-words whitespace-pre-wrap min-w-1">{decodeHTML(text)}</pre>}
                <iframe src={url} title={title} className="w-full h-full flex-1" />
            </div>
        </div >
    )
}

export default ContentSection
