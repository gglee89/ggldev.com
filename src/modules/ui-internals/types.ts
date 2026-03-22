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

/** Pedagogical “C++ side” — WebCore / browser DOM implementation (course blackboard model). */
export type CppDomSnapshot = {
    /** Monospace lines, e.g. WebCore::Node tree */
    lines: string[]
}

/** Engine / allocator view — V8 slots, backing stores, etc. (pedagogical). */
export type CppMemorySnapshot = {
    lines: string[]
}

/** Mini “browser output” matching JS state for the step. */
export type RenderedPreview = {
    /** body has no element children yet */
    bodyEmpty: boolean
    inputValue: string
    greeting: string
    footer: string
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
    /** C++ DOM (WebCore) representation */
    cppDom: CppDomSnapshot
    /** Memory allocation narrative (V8 + bridge) */
    cppMemory: CppMemorySnapshot
    /** What the user would see in the page for this step */
    renderedPreview: RenderedPreview
}

export type Scenario = {
    id: string
    title: string
    subtitle?: string
    intro?: string
    sourceLines: string[]
    frames: Frame[]
}
