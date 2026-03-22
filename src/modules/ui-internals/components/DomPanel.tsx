import { Box, Typography } from '@mui/material'
import React from 'react'

import type { DomSnapshot } from '../types'
import { chromeDark } from '../chromeTheme'

import { ChromeMechanismPanel } from './ChromeMechanismPanel'

type DomPanelProps = {
    dom: DomSnapshot
    blink?: boolean
}

export const DomPanel = ({ dom, blink }: DomPanelProps) => {
    return (
        <ChromeMechanismPanel title="DOM (JS view)" badge="document" blink={blink}>
            {dom.operation ? (
                <Typography
                    variant="caption"
                    sx={{
                        display: 'block',
                        mb: 1,
                        fontFamily: 'ui-monospace, monospace',
                        color: chromeDark.accent,
                    }}
                >
                    {dom.operation}
                </Typography>
            ) : null}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {dom.nodes.map((n, i) => (
                    <Box
                        key={`${n.tag}-${i}`}
                        sx={{
                            pl: 1,
                            borderLeft: '2px solid',
                            borderColor: chromeDark.accentDim,
                        }}
                    >
                        <Typography variant="body2" sx={{ color: chromeDark.textPrimary, fontWeight: 600 }}>
                            &lt;{n.tag}&gt;
                        </Typography>
                        <Typography variant="caption" sx={{ color: chromeDark.textSecondary }}>
                            {n.summary}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </ChromeMechanismPanel>
    )
}
