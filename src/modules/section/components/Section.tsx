import React from 'react'
import classnames from 'classnames'

// Styles
import './section.css'

// Icons
import icons from 'shared/icons'
import { iconComponents } from 'shared/iconComponents'
import type { Topic } from 'modules/types'

const resolveIcon = (icon: string): React.ElementType | 'img' | null =>
    iconComponents[icon] ?? (icons[icon] ? 'img' : null)

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

    const resolved =
        typeof icon === 'string' ? resolveIcon(icon) : icon
    const isImg = resolved === 'img'
    const IconComponent = typeof resolved === 'function' ? resolved : null
    const [imageLoaded, setImageLoaded] = React.useState(!isImg)

    if (link !== undefined || mail !== undefined) {
        return (
            <a
                href={getHref()}
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center flex-row cursor-pointer hover:bg-gray-500 text-white text-decoration-none"
            >
                {(icon !== undefined && (isImg || IconComponent)) && (
                    <div className="w-[40px] h-[50px] relative flex items-center justify-center">
                        {isImg ? (
                            <img
                                src={icons[icon as string]}
                                alt={name}
                                style={{
                                    opacity: imageLoaded ? 1 : 0,
                                    transition: 'opacity 0.2s ease',
                                }}
                                className="absolute h-100"
                                onLoad={() => setImageLoaded(true)}
                            />
                        ) : IconComponent ? (
                            React.createElement(IconComponent, {
                                className: `duration-200 h-[24px] w-[24px] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`,
                                style: { opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.2s ease' },
                            })
                        ) : null}
                    </div>
                )}
                <div className="flex flex-col align-start py-[10px] px-[5px] opacity-[0.8] w-full text-start border-b-[1px] border-gray-400">
                    <div>{name}</div>
                    <div className="text-decoration-none">{level}</div>
                </div>
            </a>
        )
    }

    return (
        <div className="flex items-center flex-row cursor-pointer hover:svg:animate-bounce hover:bg-gray-300 hover:decoration-none">
            {(icon !== undefined && (isImg || IconComponent)) && (
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
                    {isImg ? (
                        <img
                            src={icons[icon as string]}
                            alt={name}
                            className={`section-item-icon transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    ) : IconComponent ? (
                        React.createElement(IconComponent, {
                            className: `section-item-icon transition-opacity duration-200 h-[24px] w-[24px] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`,
                        })
                    ) : null}
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
            <div className="flex items-center border-b-[1px] border-gray-400 py-[3px] justify-between">
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
