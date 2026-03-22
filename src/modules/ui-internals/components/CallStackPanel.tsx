import { Stack, Typography } from '@mui/material'
import React from 'react'

import type { StackFrame } from '../types'
import { chromeDark } from '../chromeTheme'

import { ChromeMechanismPanel } from './ChromeMechanismPanel'

type CallStackPanelProps = {
    frames: StackFrame[]
    blink?: boolean
}

export const CallStackPanel = ({ frames, blink }: CallStackPanelProps) => {
    return (
        <ChromeMechanismPanel title="Call stack" badge="JS" blink={blink}>
            <Stack spacing={1}>
                {frames.length === 0 ? (
                    <Typography variant="body2" sx={{ color: chromeDark.textMuted }}>
                        (empty)
                    </Typography>
                ) : (
                    [...frames].reverse().map((f, i) => (
                        <Stack
                            key={`${f.name}-${i}`}
                            spacing={0.25}
                            sx={{
                                p: 1,
                                borderRadius: 1,
                                bgcolor: chromeDark.shell,
                                border: `1px solid ${chromeDark.border}`,
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 600, color: chromeDark.textPrimary }}>
                                {f.name}()
                            </Typography>
                            {f.detail ? (
                                <Typography variant="caption" sx={{ color: chromeDark.textMuted }}>
                                    {f.detail}
                                </Typography>
                            ) : null}
                        </Stack>
                    ))
                )}
            </Stack>
        </ChromeMechanismPanel>
    )
}
