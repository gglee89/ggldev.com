import React from 'react'
import classnames from 'classnames'

// Styles
import './section.css'

// Icons
import icons from 'shared/icons'
import type { Topic } from 'modules/types'

const SectionItem: React.FC<Topic> = ({
    name,
    level,
    link,
    mail,
    icon,
    seniority,
}) => {
    const getHref = () => {
        if (link !== undefined) return link
        if (mail !== undefined) return `mailto: ${mail}`
        return '#'
    }

    const [imageLoaded, setImageLoaded] = React.useState(typeof icon !== 'string')

    if (link !== undefined || mail !== undefined) {
        return (
            <a
                href={getHref()}
                rel="noopener noreferrer"
                target="_blank"
                className="section-item-container"
            >
                {(icon !== undefined) && (
                    <div className="section-topic__image flex items-center justify-center">
                        <div
                            className="section-item-skeleton flex items-center justify-center"
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                animation: 'pulse 1.5s ease-in-out infinite',
                                borderRadius: 'inherit',
                                opacity: imageLoaded ? 0 : 1,
                                transition: 'opacity 0.2s ease',
                            }}
                        />
                        {typeof icon === 'string' ? (
                            <img
                                src={icons[icon]}
                                alt={name}
                                style={{
                                    opacity: imageLoaded ? 1 : 0,
                                    transition: 'opacity 0.2s ease',
                                }}
                                className="absolute h-100"
                                onLoad={() => setImageLoaded(true)}
                            />
                        ) : (
                            React.createElement(icon, {
                                className: `section-item-icon transition-opacity duration-200 h-[24px] w-[24px] [&>path]:text-white ${imageLoaded ? 'opacity-100' : 'opacity-0'}`,
                                style: { opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.2s ease' },
                            })
                        )}
                    </div>
                )}
                <div className="section-topic">
                    <div>{name}</div>
                    <div className="section-topic-item">{level}</div>
                </div>
            </a>
        )
    }

    return (
        <div className="section-item-container ">
            {(icon !== undefined) && (
                <div className="section-topic__image flex items-center justify-center">
                    <div
                        className="section-item-skeleton"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#2a2a2a',
                            animation: 'pulse 1.5s ease-in-out infinite',
                            borderRadius: 'inherit',
                            opacity: imageLoaded ? 0 : 1,
                            transition: 'opacity 0.2s ease',
                        }}
                    />
                    {typeof icon === 'string' ? (
                        <img
                            src={icons[icon]}
                            alt={name}
                            className={`section-item-icon transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    ) : (
                        React.createElement(icon, {
                            className: `section-item-icon transition-opacity duration-200 h-[24px] w-[24px] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`,
                        })
                    )}
                </div>
            )}
            <div className="section-topic">
                <div>{name}</div>
                <div className="section-topic-item">{level}</div>
                {seniority !== undefined && (
                    <div className="section-topic-item">{seniority}</div>
                )}
            </div>
        </div>
    )
}

interface SectionProps {
    title: string
    topics: Topic[]
    isDisabled: boolean
}
const Section: React.FC<SectionProps> = ({ title, topics, isDisabled }) => {
    const updateButtonClasses = classnames({
        'section-update-button': true,
        disabled: isDisabled,
    })

    const renderTopics = () => {
        if (topics === undefined || topics.length === 0) return null
        return (
            <div className="section-body">
                {topics.map((props, key) => {
                    return <SectionItem key={key} {...props} />
                })}
            </div>
        )
    }

    return (
        <div className="section-container">
            <div className="section-header">
                <div className="section-title">{title}</div>
                <div className={updateButtonClasses}>
                    <div>UPDATE ALL</div>
                    <div>+</div>
                </div>
            </div>

            {renderTopics()}
        </div>
    )
}

export default Section
