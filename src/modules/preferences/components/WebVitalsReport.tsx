import React, { useState, useEffect } from 'react'
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals'
import { useFullScreenHandle } from 'react-full-screen'
import { useDraggable } from 'hooks/useDraggable'

interface Metric {
    name: string
    value: number
    rating: 'good' | 'needs-improvement' | 'poor'
}

interface WebVitalsReportProps {
    zIndex: number
    onFocus: () => void
}

const WebVitalsReport: React.FC<WebVitalsReportProps> = ({
    zIndex,
    onFocus,
}) => {
    const handle = useFullScreenHandle()
    const [metrics, setMetrics] = useState<Metric[]>([])
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

    const { isDragging, isDragIntent, handleMouseDown, dragStyle } = useDraggable({
        initialPosition: { x: 20, y: typeof window !== 'undefined' ? window.innerHeight - 200 : 200 },
        disabled: handle.active,
        onFocus,
        bounds: { right: 200, bottom: 100 },
        dragHandleSelector: '.drag-handle',
        initialCentered: false,
    })

    useEffect(() => {
        const getRating = (
            name: string,
            value: number
        ): 'good' | 'needs-improvement' | 'poor' => {
            const thresholds = {
                CLS: { good: 0.1, poor: 0.25 },
                FID: { good: 100, poor: 300 },
                LCP: { good: 2500, poor: 4000 },
                FCP: { good: 1800, poor: 3000 },
                TTFB: { good: 800, poor: 1800 },
            }

            const threshold = thresholds[name as keyof typeof thresholds]
            if (!threshold) return 'good'

            if (value <= threshold.good) return 'good'
            if (value >= threshold.poor) return 'poor'
            return 'needs-improvement'
        }

        const handleMetric = ({
            name,
            value,
            delta,
        }: {
            name: string
            value: number
            delta: number
        }) => {
            setLastUpdated(new Date())
            setMetrics((prev) => {
                const existing = prev.find((m) => m.name === name)
                if (existing) {
                    return prev.map((m) =>
                        m.name === name
                            ? {
                                  ...m,
                                  value,
                                  rating: getRating(name, value),
                              }
                            : m
                    )
                }
                return [
                    ...prev,
                    {
                        name,
                        value,
                        rating: getRating(name, value),
                    },
                ]
            })
        }

        onCLS(handleMetric)
        onFID(handleMetric)
        onLCP(handleMetric)
        onFCP(handleMetric)
        onTTFB(handleMetric)
    }, [])

    const getColorForRating = (rating: string) => {
        switch (rating) {
            case 'good':
                return '#48ff00' // Bright green
            case 'needs-improvement':
                return '#FFB300'
            case 'poor':
                return '#ff0000' // Bright red
            default:
                return '#757575'
        }
    }

    const formatValue = (name: string, value: number) => {
        switch (name) {
            case 'CLS':
                return value.toFixed(3) // CLS is unitless
            case 'FID':
            case 'FCP':
            case 'LCP':
            case 'TTFB':
                return `${Math.round(value)}ms`
            default:
                return `${Math.round(value).toFixed(2)}`
        }
    }

    const formatTimestamp = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        const year = date.getFullYear()
        const timezone = date
            .toLocaleTimeString('en-us', { timeZoneName: 'short' })
            .split(' ')[2]

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${timezone}`
    }

    const handleHeaderClick = () => {
        // Only toggle if it wasn't a drag operation
        if (!isDragIntent) {
            setIsCollapsed(!isCollapsed)
        }
    }

    if (metrics.length === 0) return null

    return (
        <div
            style={{
                ...dragStyle,
                ...(handle.active && {
                    left: 'auto',
                    top: 'auto',
                    right: '20px',
                    bottom: '20px',
                }),
                backgroundColor: '#1a1a1a',
                borderRadius: '4px',
                padding: '0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                zIndex,
                width: '180px',
                userSelect: 'none',
                fontSize: '12px',
            }}
            onMouseDown={handleMouseDown}
        >
            <div
                className="drag-handle"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#ffffff',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    padding: '8px',
                    borderBottom: isCollapsed ? 'none' : '1px solid #333333',
                    marginBottom: isCollapsed ? '0' : '4px',
                    borderRadius: '2px',
                    transition: 'background-color 0.2s ease',
                    backgroundColor: 'transparent',
                }}
                onClick={handleHeaderClick}
                onMouseEnter={(e) => {
                    if (e.currentTarget) {
                        e.currentTarget.style.backgroundColor = '#2a2a2a'
                    }
                }}
                onMouseLeave={(e) => {
                    if (e.currentTarget) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                    }
                }}
            >
                <span style={{ fontSize: '16px', opacity: 0.7 }}>⋮</span>
                <span style={{ flex: 1, fontSize: '11px' }}>Web Vitals</span>
                <span
                    style={{
                        cursor: 'pointer',
                        opacity: 0.7,
                        fontSize: '10px',
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (!isDragIntent) {
                            setIsCollapsed(!isCollapsed)
                        }
                    }}
                >
                    {isCollapsed ? '▼' : '▲'}
                </span>
            </div>
            {!isCollapsed && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        padding: '8px',
                    }}
                >
                    {metrics.map((metric) => (
                        <div
                            key={metric.name}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '11px',
                            }}
                        >
                            <span style={{ color: '#999999' }}>
                                {metric.name
                                    .replace('CLS', 'CLS:')
                                    .replace('FCP', 'FCP:')
                                    .replace('TTFB', 'TTFB:')
                                    .replace('LCP', 'LCP:')
                                    .replace('FID', 'INP:')}
                            </span>
                            <span
                                style={{
                                    color: getColorForRating(metric.rating),
                                    fontFamily: 'monospace',
                                }}
                            >
                                {formatValue(metric.name, metric.value)}
                            </span>
                        </div>
                    ))}
                    <div
                        style={{
                            borderTop: '1px solid #333333',
                            marginTop: '4px',
                            paddingTop: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: '2px',
                            fontSize: '10px',
                            color: '#666666',
                        }}
                    >
                        {formatTimestamp(lastUpdated)}
                    </div>
                </div>
            )}
        </div>
    )
}

export default WebVitalsReport
