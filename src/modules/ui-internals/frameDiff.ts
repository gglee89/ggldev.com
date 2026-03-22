import type { Frame } from './types'

/** Regions that can blink when their data changes step-to-step */
export type MechanismKey =
    | 'source'
    | 'caption'
    | 'stack'
    | 'heap'
    | 'webApis'
    | 'queues'
    | 'jsDom'
    | 'cppMemory'
    | 'cppDom'
    | 'preview'

const stable = (v: unknown) => JSON.stringify(v)

export function getChangedMechanisms(prev: Frame | undefined, curr: Frame): Set<MechanismKey> {
    const next = new Set<MechanismKey>()
    if (!prev) return next

    const hl = (lines: number[]) => [...lines].sort((a, b) => a - b).join(',')

    if (hl(prev.highlightLines) !== hl(curr.highlightLines)) next.add('source')
    if (prev.caption !== curr.caption) next.add('caption')
    if (stable(prev.stack) !== stable(curr.stack)) next.add('stack')
    if (stable(prev.heap) !== stable(curr.heap)) next.add('heap')
    if (stable(prev.webApis) !== stable(curr.webApis)) next.add('webApis')
    if (
        stable(prev.taskQueue) !== stable(curr.taskQueue) ||
        stable(prev.microtaskQueue) !== stable(curr.microtaskQueue)
    ) {
        next.add('queues')
    }
    if (stable(prev.dom) !== stable(curr.dom)) next.add('jsDom')
    if (stable(prev.cppMemory) !== stable(curr.cppMemory)) next.add('cppMemory')
    if (stable(prev.cppDom) !== stable(curr.cppDom)) next.add('cppDom')
    if (stable(prev.renderedPreview) !== stable(curr.renderedPreview)) next.add('preview')

    return next
}
