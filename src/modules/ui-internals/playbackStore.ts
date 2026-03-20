import { create } from 'zustand'

import type { Scenario } from './types'

const DEFAULT_INTERVAL_MS = 1200

export type PlaybackStore = {
    scenario: Scenario | null
    frameIndex: number
    isPlaying: boolean
    stepMs: number
    setScenario: (scenario: Scenario) => void
    setFrameIndex: (index: number) => void
    next: () => void
    prev: () => void
    reset: () => void
    togglePlay: () => void
    setStepMs: (ms: number) => void
}

export const clampFrameIndex = (scenario: Scenario | null, index: number): number => {
    if (!scenario || scenario.frames.length === 0) return 0
    return Math.max(0, Math.min(index, scenario.frames.length - 1))
}

export const usePlaybackStore = create<PlaybackStore>((set, get) => ({
    scenario: null,
    frameIndex: 0,
    isPlaying: false,
    stepMs: DEFAULT_INTERVAL_MS,
    setScenario: (scenario) =>
        set({ scenario, frameIndex: 0, isPlaying: false }),
    setFrameIndex: (index) => {
        const { scenario } = get()
        set({ frameIndex: clampFrameIndex(scenario, index) })
    },
    next: () => {
        const { scenario, frameIndex } = get()
        if (!scenario) return
        set({ frameIndex: clampFrameIndex(scenario, frameIndex + 1) })
    },
    prev: () => {
        const { scenario, frameIndex } = get()
        if (!scenario) return
        set({ frameIndex: clampFrameIndex(scenario, frameIndex - 1) })
    },
    reset: () => set({ frameIndex: 0, isPlaying: false }),
    togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
    setStepMs: (ms) => set({ stepMs: Math.max(200, Math.min(ms, 10000)) }),
}))
