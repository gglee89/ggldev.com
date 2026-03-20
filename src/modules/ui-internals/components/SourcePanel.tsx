import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

type SourcePanelProps = {
    lines: string[]
    highlightLines: Set<number>
}

const lineNumberWidth = 36

export const SourcePanel = ({ lines, highlightLines }: SourcePanelProps) => {
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
                Source
            </Typography>
            <Box
                component="pre"
                sx={{
                    m: 0,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: '0.75rem',
                    lineHeight: 1.5,
                    color: 'grey.100',
                }}
            >
                {lines.map((line, i) => {
                    const n = i + 1
                    const on = highlightLines.has(n)
                    return (
                        <Box
                            key={n}
                            sx={{
                                display: 'flex',
                                minHeight: '1.5em',
                                bgcolor: on ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                                borderLeft: on ? '3px solid' : '3px solid transparent',
                                borderColor: on ? 'primary.main' : 'transparent',
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{
                                    width: lineNumberWidth,
                                    flexShrink: 0,
                                    color: 'grey.600',
                                    userSelect: 'none',
                                    textAlign: 'right',
                                    pr: 1,
                                }}
                            >
                                {n}
                            </Typography>
                            <Typography
                                component="span"
                                sx={{
                                    whiteSpace: 'pre',
                                    color: on ? 'grey.50' : 'grey.300',
                                }}
                            >
                                {line || ' '}
                            </Typography>
                        </Box>
                    )
                })}
            </Box>
        </Paper>
    )
}
