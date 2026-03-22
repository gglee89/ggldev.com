import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

import type { TaskQueueItem } from '../types'
import { chromeDark } from '../chromeTheme'

import { ChromeMechanismPanel } from './ChromeMechanismPanel'

type QueuesPanelProps = {
    taskQueue: TaskQueueItem[]
    microtaskQueue: TaskQueueItem[]
    blink?: boolean
}

export const QueuesPanel = ({ taskQueue, microtaskQueue, blink }: QueuesPanelProps) => {
    const renderQueue = (label: string, items: TaskQueueItem[], accent: string) => (
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" sx={{ color: chromeDark.textMuted, display: 'block', mb: 0.5 }}>
                {label}
            </Typography>
            <Stack spacing={0.5}>
                {items.length === 0 ? (
                    <Typography variant="body2" sx={{ color: chromeDark.textMuted }}>
                        (empty)
                    </Typography>
                ) : (
                    items.map((t, i) => (
                        <Box
                            key={`${t.label}-${i}`}
                            sx={{
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: chromeDark.shell,
                                border: `1px solid ${accent}`,
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: chromeDark.textPrimary }}>
                                {t.label}
                            </Typography>
                        </Box>
                    ))
                )}
            </Stack>
        </Box>
    )

    return (
        <ChromeMechanismPanel title="Queues" badge="Event loop" blink={blink}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {renderQueue('Task (macrotasks)', taskQueue, 'rgba(251, 188, 4, 0.45)')}
                {renderQueue('Microtasks', microtaskQueue, 'rgba(179, 102, 255, 0.45)')}
            </Box>
        </ChromeMechanismPanel>
    )
}
