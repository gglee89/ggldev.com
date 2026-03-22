import { describe, expect, it } from 'vitest'

import { getChangedMechanisms } from './frameDiff'
import { clampFrameIndex, usePlaybackStore } from './playbackStore'
import { vdomIntervalScenario } from './scenarios/vdom-interval'

describe('vdomIntervalScenario', () => {
    it('has a non-empty frame sequence', () => {
        expect(vdomIntervalScenario.frames.length).toBeGreaterThan(0)
    })

    it('keeps stable teaching metadata', () => {
        expect(vdomIntervalScenario.id).toBe('vdom-setinterval')
        expect(vdomIntervalScenario.sourceLines.length).toBeGreaterThan(10)
        expect(vdomIntervalScenario.frames[0].caption.length).toBeGreaterThan(10)
    })

    it('first frame shows initial heap bindings', () => {
        const keys = vdomIntervalScenario.frames[0].heap.map((h) => h.key)
        expect(keys).toContain('name')
        expect(keys).toContain('vDOM')
        expect(keys).toContain('elems')
    })
})

describe('getChangedMechanisms', () => {
    it('returns empty set when there is no previous frame', () => {
        const first = vdomIntervalScenario.frames[0]
        expect([...getChangedMechanisms(undefined, first)]).toEqual([])
    })

    it('detects when heap content changes between steps', () => {
        const a = vdomIntervalScenario.frames[0]
        const b = vdomIntervalScenario.frames[1]
        expect(getChangedMechanisms(a, b).has('heap')).toBe(false)
        const heapChange = vdomIntervalScenario.frames[4]
        const next = vdomIntervalScenario.frames[5]
        expect(getChangedMechanisms(heapChange, next).has('heap')).toBe(true)
    })
})

describe('clampFrameIndex', () => {
    it('clamps to scenario bounds', () => {
        expect(clampFrameIndex(null, 5)).toBe(0)
        expect(clampFrameIndex(vdomIntervalScenario, -1)).toBe(0)
        expect(clampFrameIndex(vdomIntervalScenario, 999)).toBe(vdomIntervalScenario.frames.length - 1)
        expect(clampFrameIndex(vdomIntervalScenario, 3)).toBe(3)
    })
})

describe('playback store', () => {
    it('respects frame bounds when stepping', () => {
        const setScenario = usePlaybackStore.getState().setScenario
        const next = usePlaybackStore.getState().next
        const setFrameIndex = usePlaybackStore.getState().setFrameIndex

        setScenario(vdomIntervalScenario)
        const last = vdomIntervalScenario.frames.length - 1
        setFrameIndex(last)

        for (let i = 0; i < 5; i++) next()

        expect(usePlaybackStore.getState().frameIndex).toBe(last)
    })
})
