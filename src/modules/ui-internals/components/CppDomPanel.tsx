import { Typography } from '@mui/material'
import React from 'react'

import type { CppDomSnapshot } from '../types'
import { chromeDark } from '../chromeTheme'

import { ChromeMechanismPanel } from './ChromeMechanismPanel'

type CppDomPanelProps = {
    cppDom: CppDomSnapshot
    blink?: boolean
}

export const CppDomPanel = ({ cppDom, blink }: CppDomPanelProps) => {
    return (
        <ChromeMechanismPanel title="DOM in C++ (WebCore)" badge="Tree" blink={blink}>
            <Typography
                component="pre"
                sx={{
                    m: 0,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: '0.68rem',
                    lineHeight: 1.45,
                    color: chromeDark.textPrimary,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                }}
            >
                {cppDom.lines.join('\n')}
            </Typography>
        </ChromeMechanismPanel>
    )
}
