import { describe, expect, it } from 'vitest'

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
