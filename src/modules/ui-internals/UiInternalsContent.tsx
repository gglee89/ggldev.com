import { Box, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'

import { CppDomPanel } from 'modules/ui-internals/components/CppDomPanel'
import { CppMemoryPanel } from 'modules/ui-internals/components/CppMemoryPanel'
import { CallStackPanel } from 'modules/ui-internals/components/CallStackPanel'
import { DomPanel } from 'modules/ui-internals/components/DomPanel'
import { HeapPanel } from 'modules/ui-internals/components/HeapPanel'
import { PlaybackControls } from 'modules/ui-internals/components/PlaybackControls'
import { QueuesPanel } from 'modules/ui-internals/components/QueuesPanel'
import { RenderedPreviewPanel } from 'modules/ui-internals/components/RenderedPreviewPanel'
import { SourcePanel } from 'modules/ui-internals/components/SourcePanel'
import { WebApisPanel } from 'modules/ui-internals/components/WebApisPanel'
import { ChromeMechanismPanel } from 'modules/ui-internals/components/ChromeMechanismPanel'
import { chromeDark } from 'modules/ui-internals/chromeTheme'
import { getChangedMechanisms } from 'modules/ui-internals/frameDiff'
import { usePlaybackStore } from 'modules/ui-internals/playbackStore'
import { vdomIntervalScenario } from 'modules/ui-internals/scenarios/vdom-interval'

import './ui-internals-chrome.css'

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
    const prevFrame = scenario && frameIndex > 0 ? scenario.frames[frameIndex - 1] : undefined

    const changed = useMemo(
        () => (frame ? getChangedMechanisms(prevFrame, frame) : new Set()),
        [prevFrame, frame],
    )

    const highlight = useMemo(
        () => new Set(frame?.highlightLines ?? []),
        [frame?.highlightLines],
    )

    if (!scenario || !frame) {
        return (
            <Box sx={{ p: 2, bgcolor: chromeDark.shell }}>
                <Typography sx={{ color: chromeDark.textSecondary }}>Loading…</Typography>
            </Box>
        )
    }

    const c = (key: Parameters<typeof changed.has>[0]) => changed.has(key)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: compact ? 'none' : 1,
                minHeight: 0,
                minWidth: 0,
                width: '100%',
                height: compact ? 'auto' : '100%',
                px: compact ? 0 : 1.5,
                py: compact ? 0 : 1.5,
                gap: 1.5,
            }}
        >
            {!compact ? (
                <Box sx={{ flexShrink: 0 }}>
                    <Typography variant="h5" component="h1" sx={{ color: chromeDark.textPrimary, fontWeight: 600 }}>
                        {scenario.title}
                    </Typography>
                    {scenario.subtitle ? (
                        <Typography variant="body2" sx={{ color: chromeDark.textMuted, mt: 0.5 }}>
                            {scenario.subtitle}
                        </Typography>
                    ) : null}
                    {scenario.intro ? (
                        <Typography variant="body2" sx={{ color: chromeDark.textSecondary, mt: 1.5, maxWidth: '72ch' }}>
                            {scenario.intro}
                        </Typography>
                    ) : null}
                </Box>
            ) : null}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'stretch',
                    gap: 1.5,
                    flex: compact ? 'none' : 1,
                    minHeight: 0,
                    minWidth: 0,
                }}
            >
                {/* Left 50%: playback + source + rendered */}
                <Box
                    sx={{
                        flex: '1 1 50%',
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        minHeight: { xs: 280, md: 0 },
                    }}
                >
                    <PlaybackControls />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0,
                            ...(compact
                                ? {
                                    flex: 'none',
                                    height: 'min(52vh, 560px)',
                                    minHeight: 200,
                                    flexShrink: 0,
                                }
                                : {
                                    flex: 1,
                                    minHeight: 0,
                                }),
                        }}
                    >
                        <SourcePanel lines={scenario.sourceLines} highlightLines={highlight} blink={c('source')} />
                    </Box>
                    <RenderedPreviewPanel preview={frame.renderedPreview} blink={c('preview')} />
                </Box>

                {/* Right 50%: mechanisms */}
                <Box
                    sx={{
                        flex: '1 1 50%',
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        minHeight: 0,
                    }}
                >
                    {compact && scenario.intro ? (
                        <ChromeMechanismPanel title="About" badge="Model">
                            <Typography variant="caption" sx={{ color: chromeDark.textSecondary, lineHeight: 1.5 }}>
                                {scenario.subtitle}
                            </Typography>
                            <Typography variant="body2" sx={{ color: chromeDark.textMuted, mt: 0.5, fontSize: '0.75rem' }}>
                                {scenario.intro}
                            </Typography>
                        </ChromeMechanismPanel>
                    ) : null}

                    <ChromeMechanismPanel title="This step" badge="Narrative" blink={c('caption')}>
                        <Typography variant="body2" sx={{ color: chromeDark.textPrimary, lineHeight: 1.6 }}>
                            {frame.caption}
                        </Typography>
                    </ChromeMechanismPanel>

                    <CallStackPanel frames={frame.stack} blink={c('stack')} />
                    <HeapPanel entries={frame.heap} blink={c('heap')} />
                    <WebApisPanel timers={frame.webApis} blink={c('webApis')} />
                    <QueuesPanel
                        taskQueue={frame.taskQueue}
                        microtaskQueue={frame.microtaskQueue}
                        blink={c('queues')}
                    />
                    <DomPanel dom={frame.dom} blink={c('jsDom')} />
                    <CppMemoryPanel memory={frame.cppMemory} blink={c('cppMemory')} />
                    <CppDomPanel cppDom={frame.cppDom} blink={c('cppDom')} />
                </Box>
            </Box>
        </Box>
    )
}

export default UiInternalsContent
