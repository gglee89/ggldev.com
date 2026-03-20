import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import { Box, Button, Paper, Slider, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import { usePlaybackStore } from '../playbackStore'

export const PlaybackControls = () => {
    const scenario = usePlaybackStore((s) => s.scenario)
    const frameIndex = usePlaybackStore((s) => s.frameIndex)
    const isPlaying = usePlaybackStore((s) => s.isPlaying)
    const stepMs = usePlaybackStore((s) => s.stepMs)
    const next = usePlaybackStore((s) => s.next)
    const prev = usePlaybackStore((s) => s.prev)
    const reset = usePlaybackStore((s) => s.reset)
    const togglePlay = usePlaybackStore((s) => s.togglePlay)
    const setStepMs = usePlaybackStore((s) => s.setStepMs)

    const total = scenario?.frames.length ?? 0
    const atEnd = total > 0 && frameIndex >= total - 1

    useEffect(() => {
        if (!isPlaying || !scenario || total === 0) return

        const id = window.setInterval(() => {
            const state = usePlaybackStore.getState()
            const last = state.scenario?.frames.length ?? 0
            if (last === 0) return
            if (state.frameIndex >= last - 1) {
                usePlaybackStore.setState({ isPlaying: false })
                return
            }
            state.next()
        }, stepMs)

        return () => window.clearInterval(id)
    }, [isPlaying, scenario, stepMs, total])

    if (!scenario) return null

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(148, 163, 184, 0.25)',
            }}
        >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<SkipPreviousIcon />}
                        onClick={prev}
                        disabled={frameIndex <= 0}
                    >
                        Back
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        onClick={() => {
                            if (atEnd) reset()
                            togglePlay()
                        }}
                    >
                        {isPlaying ? 'Pause' : atEnd ? 'Replay' : 'Play'}
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        endIcon={<SkipNextIcon />}
                        onClick={next}
                        disabled={atEnd}
                    >
                        Next
                    </Button>
                    <Button size="small" onClick={reset}>
                        Reset
                    </Button>
                </Stack>
                <Box sx={{ flex: 1, minWidth: 160 }}>
                    <Typography variant="caption" color="grey.500">
                        Step {frameIndex + 1} / {total}
                    </Typography>
                    <Slider
                        size="small"
                        value={frameIndex}
                        min={0}
                        max={Math.max(0, total - 1)}
                        step={1}
                        onChange={(_, v) =>
                            usePlaybackStore.getState().setFrameIndex(v as number)
                        }
                    />
                </Box>
                <Box sx={{ minWidth: 140 }}>
                    <Typography variant="caption" color="grey.500">
                        Auto-advance (ms)
                    </Typography>
                    <Slider
                        size="small"
                        value={stepMs}
                        min={400}
                        max={3000}
                        step={100}
                        onChange={(_, v) => setStepMs(v as number)}
                    />
                </Box>
            </Stack>
        </Paper>
    )
}
