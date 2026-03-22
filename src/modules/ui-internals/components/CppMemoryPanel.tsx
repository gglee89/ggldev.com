import { Typography } from '@mui/material'
import React from 'react'

import type { CppMemorySnapshot } from '../types'
import { chromeDark } from '../chromeTheme'

import { ChromeMechanismPanel } from './ChromeMechanismPanel'

type CppMemoryPanelProps = {
    memory: CppMemorySnapshot
    blink?: boolean
}

export const CppMemoryPanel = ({ memory, blink }: CppMemoryPanelProps) => {
    return (
        <ChromeMechanismPanel title="Memory (engine / C++)" badge="V8 · WebIDL" blink={blink}>
            <Typography
                component="pre"
                sx={{
                    m: 0,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: '0.68rem',
                    lineHeight: 1.55,
                    color: chromeDark.textPrimary,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                }}
            >
                {memory.lines.join('\n')}
            </Typography>
        </ChromeMechanismPanel>
    )
}
