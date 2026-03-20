import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'

import type { StackFrame } from '../types'

type CallStackPanelProps = {
    frames: StackFrame[]
}

export const CallStackPanel = ({ frames }: CallStackPanelProps) => {
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
                Call stack
            </Typography>
            <Stack spacing={1}>
                {frames.length === 0 ? (
                    <Typography variant="body2" color="grey.500">
                        (empty)
                    </Typography>
                ) : (
                    [...frames].reverse().map((f, i) => (
                        <Paper
                            key={`${f.name}-${i}`}
                            variant="outlined"
                            sx={{
                                p: 1,
                                bgcolor: 'rgba(30, 41, 59, 0.9)',
                                borderColor: 'rgba(148, 163, 184, 0.35)',
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'grey.100' }}>
                                {f.name}()
                            </Typography>
                            {f.detail ? (
                                <Typography variant="caption" color="grey.500">
                                    {f.detail}
                                </Typography>
                            ) : null}
                        </Paper>
                    ))
                )}
            </Stack>
        </Paper>
    )
}
