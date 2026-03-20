import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

import type { TimerState } from '../types'

type WebApisPanelProps = {
    timers: TimerState[]
}

export const WebApisPanel = ({ timers }: WebApisPanelProps) => {
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
                Web APIs (timers)
            </Typography>
            {timers.length === 0 ? (
                <Typography variant="body2" color="grey.500">
                    (none)
                </Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {timers.map((t) => (
                        <Box
                            key={t.id}
                            sx={{
                                p: 1,
                                borderRadius: 1,
                                bgcolor: 'rgba(30, 41, 59, 0.9)',
                                border: '1px solid rgba(34, 197, 94, 0.35)',
                            }}
                        >
                            <Typography variant="body2" sx={{ color: 'grey.100' }}>
                                setInterval — {t.delayMs}ms
                            </Typography>
                            <Typography variant="caption" color="grey.400">
                                callback: {t.callback} {t.active ? '(active)' : '(inactive)'}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Paper>
    )
}
