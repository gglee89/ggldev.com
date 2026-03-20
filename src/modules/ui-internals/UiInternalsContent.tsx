import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'

import { CallStackPanel } from 'modules/ui-internals/components/CallStackPanel'
import { DomPanel } from 'modules/ui-internals/components/DomPanel'
import { HeapPanel } from 'modules/ui-internals/components/HeapPanel'
import { PlaybackControls } from 'modules/ui-internals/components/PlaybackControls'
import { QueuesPanel } from 'modules/ui-internals/components/QueuesPanel'
import { SourcePanel } from 'modules/ui-internals/components/SourcePanel'
import { WebApisPanel } from 'modules/ui-internals/components/WebApisPanel'
import { usePlaybackStore } from 'modules/ui-internals/playbackStore'
import { vdomIntervalScenario } from 'modules/ui-internals/scenarios/vdom-interval'

export type UiInternalsContentProps = {
    /** When true (desktop window), skip the large page heading; TopBar carries the title. */
    compact?: boolean
}

const UiInternalsContent: React.FC<UiInternalsContentProps> = ({ compact = false }) => {
    const setScenario = usePlaybackStore((s) => s.setScenario)
    const reset = usePlaybackStore((s) => s.reset)
    const scenario = usePlaybackStore((s) => s.scenario)
    const frameIndex = usePlaybackStore((s) => s.frameIndex)

    useEffect(() => {
        setScenario(vdomIntervalScenario)
        return () => reset()
    }, [setScenario, reset])

    const frame = scenario?.frames[frameIndex]
    const highlight = useMemo(
        () => new Set(frame?.highlightLines ?? []),
        [frame?.highlightLines],
    )

    if (!scenario || !frame) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography color="grey.300">Loading…</Typography>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                height: '100%',
                px: compact ? 1.5 : 2,
                py: compact ? 1.5 : 2,
                gap: 2,
            }}
        >
            {!compact ? (
                <Box sx={{ flexShrink: 0 }}>
                    <Typography variant="h4" component="h1" sx={{ color: 'grey.100', fontWeight: 700 }}>
                        {scenario.title}
                    </Typography>
                    {scenario.subtitle ? (
                        <Typography variant="body2" sx={{ color: 'grey.500', mt: 0.5 }}>
                            {scenario.subtitle}
                        </Typography>
                    ) : null}
                    {scenario.intro ? (
                        <Typography variant="body2" sx={{ color: 'grey.400', mt: 2, maxWidth: '72ch' }}>
                            {scenario.intro}
                        </Typography>
                    ) : null}
                </Box>
            ) : null}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    alignItems: 'stretch',
                    gap: 2,
                    flex: 1,
                    minHeight: 0,
                }}
            >
                {/* Main: source + playback */}
                <Box
                    sx={{
                        flex: { xs: 'none', lg: '1 1 58%' },
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        minHeight: { xs: 320, lg: 0 },
                    }}
                >
                    <PlaybackControls />
                    <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                        <SourcePanel lines={scenario.sourceLines} highlightLines={highlight} />
                    </Box>
                </Box>

                {/* Right: mechanisms stacked */}
                <Box
                    sx={{
                        width: { xs: '100%', lg: 380 },
                        flexShrink: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        minHeight: 0,
                        overflowY: 'auto',
                    }}
                >
                    {compact && scenario.intro ? (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 1.5,
                                bgcolor: 'rgba(15, 23, 42, 0.75)',
                                border: '1px solid rgba(148, 163, 184, 0.25)',
                            }}
                        >
                            <Typography variant="caption" sx={{ color: 'grey.500', lineHeight: 1.5 }}>
                                {scenario.subtitle}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'grey.400', mt: 0.5, fontSize: '0.75rem' }}>
                                {scenario.intro}
                            </Typography>
                        </Paper>
                    ) : null}

                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            bgcolor: 'rgba(15, 23, 42, 0.75)',
                            border: '1px solid rgba(148, 163, 184, 0.25)',
                            flexShrink: 0,
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ color: 'grey.500', mb: 1 }}>
                            This step
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'grey.200', lineHeight: 1.6 }}>
                            {frame.caption}
                        </Typography>
                    </Paper>

                    <Box sx={{ flexShrink: 0 }}>
                        <CallStackPanel frames={frame.stack} />
                    </Box>
                    <Box sx={{ flexShrink: 0 }}>
                        <HeapPanel entries={frame.heap} />
                    </Box>
                    <Box sx={{ flexShrink: 0 }}>
                        <WebApisPanel timers={frame.webApis} />
                    </Box>
                    <Box sx={{ flexShrink: 0 }}>
                        <QueuesPanel
                            taskQueue={frame.taskQueue}
                            microtaskQueue={frame.microtaskQueue}
                        />
                    </Box>
                    <Box sx={{ flexShrink: 0 }}>
                        <DomPanel dom={frame.dom} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default UiInternalsContent
