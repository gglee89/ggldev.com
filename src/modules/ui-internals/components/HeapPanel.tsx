import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

import type { HeapEntry } from '../types'

type HeapPanelProps = {
    entries: HeapEntry[]
}

export const HeapPanel = ({ entries }: HeapPanelProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                height: '100%',
                bgcolor: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                overflow: 'auto',
            }}
        >
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.400' }}>
                JS heap (globals)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {entries.map((e) => (
                    <Box
                        key={e.key}
                        sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: 'rgba(30, 41, 59, 0.9)',
                            border: '1px solid rgba(148, 163, 184, 0.2)',
                        }}
                    >
                        <Typography variant="caption" color="grey.500" display="block">
                            {e.key}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: 'ui-monospace, monospace',
                                fontSize: '0.7rem',
                                wordBreak: 'break-word',
                                color: 'grey.200',
                            }}
                        >
                            {e.value}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Paper>
    )
}
