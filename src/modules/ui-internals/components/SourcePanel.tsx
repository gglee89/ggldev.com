import { Box } from '@mui/material'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { chromeDark } from '../chromeTheme'

import { ChromeMechanismPanel } from './ChromeMechanismPanel'

type SourcePanelProps = {
    lines: string[]
    highlightLines: Set<number>
    blink?: boolean
}

export const SourcePanel = ({ lines, highlightLines, blink }: SourcePanelProps) => {
    const code = lines.join('\n')

    return (
        <ChromeMechanismPanel title="Sources" badge="app.js" blink={blink} flexFill>
            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    height: 0,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '4px',
                    border: `1px solid ${chromeDark.border}`,
                    overflowY: 'auto',
                    overflowX: 'auto',
                    scrollbarGutter: 'stable',
                    WebkitOverflowScrolling: 'touch',
                    '& pre': { margin: '0 !important' },
                }}
            >
                <SyntaxHighlighter
                    language="javascript"
                    style={vscDarkPlus}
                    showLineNumbers
                    showInlineLineNumbers={false}
                    startingLineNumber={1}
                    wrapLines
                    wrapLongLines
                    lineNumberStyle={{
                        minWidth: '2.75em',
                        paddingRight: '1em',
                        color: chromeDark.textMuted,
                        fontSize: '12px',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        userSelect: 'none',
                        borderRight: `1px solid ${chromeDark.borderSubtle}`,
                        marginRight: '0.75em',
                    }}
                    lineProps={(lineNumber) => ({
                        style: {
                            display: 'block',
                            fontSize: '12px',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            ...(highlightLines.has(lineNumber)
                                ? {
                                      backgroundColor: chromeDark.lineHighlight,
                                      boxShadow: `inset 3px 0 0 0 ${chromeDark.accent}`,
                                  }
                                : {}),
                        },
                    })}
                    codeTagProps={{
                        style: {
                            fontSize: '12px',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        },
                    }}
                    customStyle={{
                        margin: 0,
                        padding: '12px 12px 12px 0',
                        fontSize: '12px',
                        lineHeight: 1.5,
                        background: chromeDark.sourceBg,
                        borderRadius: 0,
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </Box>
        </ChromeMechanismPanel>
    )
}
