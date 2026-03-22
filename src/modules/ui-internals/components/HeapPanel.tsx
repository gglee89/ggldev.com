import { Box, Typography } from '@mui/material'
import React from 'react'

import type { HeapEntry } from '../types'
import { chromeDark } from '../chromeTheme'

import { ChromeMechanismPanel } from './ChromeMechanismPanel'

type HeapPanelProps = {
    entries: HeapEntry[]
    blink?: boolean
}

export const HeapPanel = ({ entries, blink }: HeapPanelProps) => {
    return (
        <ChromeMechanismPanel title="JS heap (globals)" badge="V8" blink={blink}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {entries.map((e) => (
                    <Box
                        key={e.key}
                        sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: chromeDark.shell,
                            border: `1px solid ${chromeDark.borderSubtle}`,
                        }}
                    >
                        <Typography variant="caption" sx={{ color: chromeDark.textMuted }} display="block">
                            {e.key}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: 'ui-monospace, monospace',
                                fontSize: '0.7rem',
                                wordBreak: 'break-word',
                                color: chromeDark.textPrimary,
                            }}
                        >
                            {e.value}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </ChromeMechanismPanel>
    )
}
