import { Box, Typography } from '@mui/material'
import React from 'react'

import type { TimerState } from '../types'
import { chromeDark } from '../chromeTheme'

import { ChromeMechanismPanel } from './ChromeMechanismPanel'

type WebApisPanelProps = {
    timers: TimerState[]
    blink?: boolean
}

export const WebApisPanel = ({ timers, blink }: WebApisPanelProps) => {
    return (
        <ChromeMechanismPanel title="Web APIs" badge="Timers" blink={blink}>
            {timers.length === 0 ? (
                <Typography variant="body2" sx={{ color: chromeDark.textMuted }}>
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
                                bgcolor: chromeDark.shell,
                                border: `1px solid ${chromeDark.accentDim}`,
                            }}
                        >
                            <Typography variant="body2" sx={{ color: chromeDark.textPrimary }}>
                                setInterval — {t.delayMs}ms
                            </Typography>
                            <Typography variant="caption" sx={{ color: chromeDark.textSecondary }}>
                                callback: {t.callback} {t.active ? '(active)' : '(inactive)'}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </ChromeMechanismPanel>
    )
}
