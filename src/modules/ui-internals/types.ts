export type StackFrame = {
    name: string
    detail?: string
}

export type HeapEntry = {
    key: string
    value: string
}

export type TimerState = {
    id: string
    delayMs: number
    callback: string
    /** Whether the timer is registered and running */
    active: boolean
}

export type TaskQueueItem = {
    label: string
}

export type DomNodeView = {
    tag: string
    summary: string
}

export type DomSnapshot = {
    /** e.g. document.body.replaceChildren(...) */
    operation?: string
    nodes: DomNodeView[]
}

export type Frame = {
    caption: string
    highlightLines: number[]
    stack: StackFrame[]
    heap: HeapEntry[]
    webApis: TimerState[]
    taskQueue: TaskQueueItem[]
    microtaskQueue: TaskQueueItem[]
    dom: DomSnapshot
}

export type Scenario = {
    id: string
    title: string
    subtitle?: string
    intro?: string
    sourceLines: string[]
    frames: Frame[]
}
