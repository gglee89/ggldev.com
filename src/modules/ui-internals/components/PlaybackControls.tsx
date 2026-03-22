import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import { Box, IconButton, Slider, Stack, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'

import { chromeDark } from '../chromeTheme'
import { usePlaybackStore } from '../playbackStore'

import { ChromeMechanismPanel } from './ChromeMechanismPanel'

const iconBtnSx = {
    border: `1px solid ${chromeDark.border}`,
    color: chromeDark.textPrimary,
    '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
    '&.Mui-disabled': { borderColor: chromeDark.borderSubtle, color: chromeDark.textMuted },
}

const primaryIconSx = {
    bgcolor: chromeDark.accent,
    color: '#202124',
    '&:hover': { bgcolor: '#a8c7fa' },
}

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
        <ChromeMechanismPanel title="Playback" badge="Controls" collapsible={false}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <Tooltip title="Previous step">
                        <span>
                            <IconButton
                                size="small"
                                aria-label="Previous step"
                                onClick={prev}
                                disabled={frameIndex <= 0}
                                sx={iconBtnSx}
                            >
                                <SkipPreviousIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title={isPlaying ? 'Pause' : atEnd ? 'Replay' : 'Play'}>
                        <IconButton
                            size="small"
                            aria-label={isPlaying ? 'Pause' : atEnd ? 'Replay' : 'Play'}
                            onClick={() => {
                                if (atEnd) reset()
                                togglePlay()
                            }}
                            sx={{ ...primaryIconSx, px: 1 }}
                        >
                            {isPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Next step">
                        <span>
                            <IconButton
                                size="small"
                                aria-label="Next step"
                                onClick={next}
                                disabled={atEnd}
                                sx={iconBtnSx}
                            >
                                <SkipNextIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Reset">
                        <IconButton size="small" aria-label="Reset" onClick={reset} sx={iconBtnSx}>
                            <RestartAltIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Box sx={{ flex: 1, minWidth: 160 }}>
                    <Typography variant="caption" sx={{ color: chromeDark.textMuted }}>
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
                        sx={{ color: chromeDark.accent }}
                    />
                </Box>
                <Box sx={{ minWidth: 140 }}>
                    <Typography variant="caption" sx={{ color: chromeDark.textMuted }}>
                        Auto-advance (ms)
                    </Typography>
                    <Slider
                        size="small"
                        value={stepMs}
                        min={400}
                        max={3000}
                        step={100}
                        onChange={(_, v) => setStepMs(v as number)}
                        sx={{ color: chromeDark.accent }}
                    />
                </Box>
            </Stack>
        </ChromeMechanismPanel>
    )
}
