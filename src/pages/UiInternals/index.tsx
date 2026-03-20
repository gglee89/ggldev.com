import { Box, Container, Paper, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'

import Layout from 'pages/layout'
import { CallStackPanel } from 'modules/ui-internals/components/CallStackPanel'
import { DomPanel } from 'modules/ui-internals/components/DomPanel'
import { HeapPanel } from 'modules/ui-internals/components/HeapPanel'
import { PlaybackControls } from 'modules/ui-internals/components/PlaybackControls'
import { QueuesPanel } from 'modules/ui-internals/components/QueuesPanel'
import { SourcePanel } from 'modules/ui-internals/components/SourcePanel'
import { WebApisPanel } from 'modules/ui-internals/components/WebApisPanel'
import { usePlaybackStore } from 'modules/ui-internals/playbackStore'
import { vdomIntervalScenario } from 'modules/ui-internals/scenarios/vdom-interval'

import './ui-internals.css'

const UiInternals = () => {
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
            <Layout>
                <Container className="ui-internals-root">
                    <Typography color="grey.300">Loading…</Typography>
                </Container>
            </Layout>
        )
    }

    return (
        <Layout>
            <Container maxWidth="xl" className="ui-internals-root">
                <Box sx={{ py: 2 }}>
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

                <PlaybackControls />

                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        my: 2,
                        bgcolor: 'rgba(15, 23, 42, 0.75)',
                        border: '1px solid rgba(148, 163, 184, 0.25)',
                    }}
                >
                    <Typography variant="subtitle2" sx={{ color: 'grey.500', mb: 1 }}>
                        This step
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'grey.200', lineHeight: 1.6 }}>
                        {frame.caption}
                    </Typography>
                </Paper>

                <Box
                    sx={{
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: '1fr 1fr',
                            lg: 'repeat(3, minmax(0, 1fr))',
                        },
                        alignItems: 'stretch',
                        pb: 4,
                    }}
                >
                    <Box sx={{ minHeight: 280, gridColumn: { xs: '1', lg: 'span 2' } }}>
                        <SourcePanel lines={scenario.sourceLines} highlightLines={highlight} />
                    </Box>
                    <Box sx={{ minHeight: 200 }}>
                        <CallStackPanel frames={frame.stack} />
                    </Box>
                    <Box sx={{ minHeight: 220 }}>
                        <HeapPanel entries={frame.heap} />
                    </Box>
                    <Box sx={{ minHeight: 160 }}>
                        <WebApisPanel timers={frame.webApis} />
                    </Box>
                    <Box sx={{ minHeight: 180 }}>
                        <QueuesPanel
                            taskQueue={frame.taskQueue}
                            microtaskQueue={frame.microtaskQueue}
                        />
                    </Box>
                    <Box sx={{ minHeight: 200, gridColumn: { xs: '1', md: 'span 2' } }}>
                        <DomPanel dom={frame.dom} />
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}

export default UiInternals
