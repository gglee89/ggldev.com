import { useState, useEffect, useCallback, useRef } from 'react'

export interface Position {
    x: number
    y: number
}

export interface UseDraggableOptions {
    /** Initial position of the element */
    initialPosition: Position
    /** Whether dragging is disabled (e.g., when fullscreen) */
    disabled?: boolean
    /** Callback when focus is requested (e.g., bring to front) */
    onFocus?: () => void
    /** Bounds offset from viewport edge { right, bottom } */
    bounds?: { right: number; bottom: number }
    /** CSS selector for valid drag handle (e.g., '.topbar-container') */
    dragHandleSelector?: string
    /** CSS selectors to exclude from starting drag (e.g., ['.window-control']) */
    excludeSelectors?: string[]
    /** Whether to use centered initial position (transform: translate(-50%, -50%)) */
    initialCentered?: boolean
}

export interface UseDraggableReturn {
    /** Current position */
    position: Position
    /** Whether currently being dragged */
    isDragging: boolean
    /** Whether the element has been dragged at least once */
    haveDragged: boolean
    /** Whether a drag operation was intended (for distinguishing clicks) */
    isDragIntent: boolean
    /** Mouse down handler to attach to the draggable element */
    handleMouseDown: (e: React.MouseEvent) => void
    /** Style object to apply to the draggable element */
    dragStyle: React.CSSProperties
    /** Reset position to initial */
    resetPosition: () => void
}

/**
 * useDraggable - A hook for making elements draggable
 *
 * Extracts common drag-and-drop logic used across window components.
 *
 * @example
 * const { position, isDragging, handleMouseDown, dragStyle } = useDraggable({
 *   initialPosition: { x: 100, y: 100 },
 *   dragHandleSelector: '.topbar-container',
 *   excludeSelectors: ['.window-control'],
 *   onFocus: () => bringToFront(),
 * })
 *
 * return (
 *   <div style={dragStyle} onMouseDown={handleMouseDown}>
 *     <div className="topbar-container">Drag here</div>
 *   </div>
 * )
 */
export function useDraggable({
    initialPosition,
    disabled = false,
    onFocus,
    bounds = { right: 570, bottom: 100 },
    dragHandleSelector,
    excludeSelectors = [],
    initialCentered = false,
}: UseDraggableOptions): UseDraggableReturn {
    const [position, setPosition] = useState<Position>(initialPosition)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
    const [haveDragged, setHaveDragged] = useState(false)
    const [isDragIntent, setIsDragIntent] = useState(false)

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            if (disabled) return

            const target = e.target as HTMLElement

            // Check if click is on a valid drag handle
            if (dragHandleSelector) {
                if (!target.closest(dragHandleSelector)) return
            }

            // Check if click is on an excluded element
            for (const selector of excludeSelectors) {
                if (target.closest(selector)) return
            }

            setIsDragIntent(false)
            setIsDragging(true)

            // Get the actual current position of the element
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
            const currentX = rect.left
            const currentY = rect.top

            // If this is the first drag and we were centered, update position
            if (!haveDragged && initialCentered) {
                setPosition({ x: currentX, y: currentY })
                setHaveDragged(true)
            }

            // Calculate dragStart based on actual current position
            setDragStart({
                x: e.clientX - (haveDragged ? position.x : currentX),
                y: e.clientY - (haveDragged ? position.y : currentY),
            })

            onFocus?.()
            e.preventDefault()
        },
        [disabled, dragHandleSelector, excludeSelectors, haveDragged, initialCentered, position, onFocus]
    )

    const handleMouseMove = useCallback(
        (e: globalThis.MouseEvent) => {
            if (!isDragging || disabled) return

            // Mark as drag intent on first mouse move
            if (!isDragIntent) {
                setIsDragIntent(true)
            }

            const newX = e.clientX - dragStart.x
            const newY = e.clientY - dragStart.y

            // Keep within viewport bounds
            const maxX = window.innerWidth - bounds.right
            const maxY = window.innerHeight - bounds.bottom

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY)),
            })
        },
        [isDragging, disabled, dragStart, bounds, isDragIntent]
    )

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    // Attach global mouse event listeners when dragging
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = 'grabbing'

            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
                document.body.style.cursor = ''
            }
        }
    }, [isDragging, handleMouseMove, handleMouseUp])

    const resetPosition = useCallback(() => {
        setPosition(initialPosition)
        setHaveDragged(false)
    }, [initialPosition])

    // Compute style object for the draggable element
    const dragStyle: React.CSSProperties = initialCentered
        ? {
              position: 'fixed',
              left: haveDragged ? `${position.x}px` : '50%',
              top: haveDragged ? `${position.y}px` : '50%',
              transform: haveDragged ? 'none' : 'translate(-50%, -50%)',
              cursor: isDragging ? 'grabbing' : 'default',
              transition: isDragging ? 'none' : 'all 0.3s ease',
          }
        : {
              position: 'fixed',
              left: `${position.x}px`,
              top: `${position.y}px`,
              cursor: isDragging ? 'grabbing' : 'default',
              transition: isDragging ? 'none' : 'all 0.3s ease',
          }

    return {
        position,
        isDragging,
        haveDragged,
        isDragIntent,
        handleMouseDown,
        dragStyle,
        resetPosition,
    }
}

export default useDraggable
