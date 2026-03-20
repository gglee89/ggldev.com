import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

import type { DomSnapshot } from '../types'

type DomPanelProps = {
    dom: DomSnapshot
}

export const DomPanel = ({ dom }: DomPanelProps) => {
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
                DOM snapshot (browser tree)
            </Typography>
            {dom.operation ? (
                <Typography
                    variant="caption"
                    sx={{
                        display: 'block',
                        mb: 1,
                        fontFamily: 'ui-monospace, monospace',
                        color: 'primary.light',
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
                            borderColor: 'rgba(56, 189, 248, 0.5)',
                        }}
                    >
                        <Typography variant="body2" sx={{ color: 'grey.100', fontWeight: 600 }}>
                            &lt;{n.tag}&gt;
                        </Typography>
                        <Typography variant="caption" color="grey.500">
                            {n.summary}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Paper>
    )
}
