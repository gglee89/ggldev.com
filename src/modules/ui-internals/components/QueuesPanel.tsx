import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

import type { TaskQueueItem } from '../types'

type QueuesPanelProps = {
    taskQueue: TaskQueueItem[]
    microtaskQueue: TaskQueueItem[]
}

export const QueuesPanel = ({ taskQueue, microtaskQueue }: QueuesPanelProps) => {
    const renderQueue = (label: string, items: TaskQueueItem[], accent: string) => (
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" color="grey.500" display="block" sx={{ mb: 0.5 }}>
                {label}
            </Typography>
            <Stack spacing={0.5}>
                {items.length === 0 ? (
                    <Typography variant="body2" color="grey.600">
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
                                bgcolor: 'rgba(30, 41, 59, 0.9)',
                                border: `1px solid ${accent}`,
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'grey.200' }}>
                                {t.label}
                            </Typography>
                        </Box>
                    ))
                )}
            </Stack>
        </Box>
    )

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                height: '100%',
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(148, 163, 184, 0.25)',
            }}
        >
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.400' }}>
                Queues
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {renderQueue('Task queue (macrotasks)', taskQueue, 'rgba(234, 179, 8, 0.45)')}
                {renderQueue('Microtask queue', microtaskQueue, 'rgba(168, 85, 247, 0.45)')}
            </Box>
        </Paper>
    )
}
