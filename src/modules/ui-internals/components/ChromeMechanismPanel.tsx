import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Collapse, IconButton, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import classNames from 'classnames'
import React, { useCallback, useState } from 'react'

import { chromeDark } from '../chromeTheme'
import { usePlaybackStore } from '../playbackStore'

import '../ui-internals-chrome.css'

type ChromeMechanismPanelProps = {
    title: string
    blink?: boolean
    children: React.ReactNode
    /** Optional right-side label (Chrome-style tab hint) */
    badge?: string
    /** When false, header is not collapsible (default true). */
    collapsible?: boolean
    /** Initial expanded state when collapsible (default true). */
    defaultExpanded?: boolean
    /** Fill parent flex height (e.g. Sources) so inner content can scroll. */
    flexFill?: boolean
    /** Extra `sx` merged onto the root panel `Box`. */
    rootSx?: SxProps<Theme>
}

export const ChromeMechanismPanel = ({
    title,
    blink,
    children,
    badge,
    collapsible = true,
    defaultExpanded = true,
    flexFill = false,
    rootSx,
}: ChromeMechanismPanelProps) => {
    const frameIndex = usePlaybackStore((s) => s.frameIndex)
    const [expanded, setExpanded] = useState(defaultExpanded)

    const toggle = useCallback(() => {
        if (collapsible) setExpanded((e) => !e)
    }, [collapsible])

    return (
        <Box
            key={blink ? `blink-${frameIndex}-${title}` : `panel-${title}`}
            className={classNames({ 'ui-internals-chrome-panel--blink': blink })}
            sx={[
                {
                    bgcolor: chromeDark.panel,
                    border: `1px solid ${chromeDark.border}`,
                    borderRadius: '4px',
                    overflow: 'hidden',
                    flexShrink: flexFill ? 1 : 0,
                    ...(flexFill
                        ? {
                              flex: 1,
                              minHeight: 0,
                              display: 'flex',
                              flexDirection: 'column',
                          }
                        : {}),
                },
                ...(Array.isArray(rootSx) ? rootSx : rootSx ? [rootSx] : []),
            ]}
        >
            <Box
                role={collapsible ? 'button' : undefined}
                tabIndex={collapsible ? 0 : undefined}
                onClick={collapsible ? toggle : undefined}
                onKeyDown={
                    collapsible
                        ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  toggle()
                              }
                          }
                        : undefined
                }
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    px: 0.5,
                    py: 0.5,
                    pl: collapsible ? 0.25 : 1.25,
                    pr: 1.25,
                    bgcolor: chromeDark.panelHeader,
                    borderBottom: expanded ? `1px solid ${chromeDark.borderSubtle}` : 'none',
                    cursor: collapsible ? 'pointer' : 'default',
                    '&:focus-visible': collapsible
                        ? { outline: `2px solid ${chromeDark.accent}`, outlineOffset: -2 }
                        : undefined,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
                    {collapsible ? (
                        <IconButton
                            size="small"
                            aria-expanded={expanded}
                            aria-label={expanded ? 'Collapse section' : 'Expand section'}
                            onClick={(e) => {
                                e.stopPropagation()
                                toggle()
                            }}
                            sx={{ color: chromeDark.textMuted }}
                        >
                            {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                        </IconButton>
                    ) : null}
                    <Typography
                        variant="caption"
                        sx={{
                            color: chromeDark.textSecondary,
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            textTransform: 'uppercase',
                            fontSize: '0.65rem',
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
                {badge ? (
                    <Typography variant="caption" sx={{ color: chromeDark.textMuted, fontSize: '0.6rem', flexShrink: 0 }}>
                        {badge}
                    </Typography>
                ) : null}
            </Box>
            {collapsible ? (
                <Collapse
                    in={expanded}
                    timeout="auto"
                    unmountOnExit={false}
                    sx={
                        flexFill
                            ? {
                                  flex: 1,
                                  minHeight: 0,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  '& .MuiCollapse-wrapper': {
                                      flex: 1,
                                      minHeight: 0,
                                      display: 'flex',
                                      flexDirection: 'column',
                                  },
                                  '& .MuiCollapse-wrapperInner': {
                                      flex: 1,
                                      minHeight: 0,
                                      display: 'flex',
                                      flexDirection: 'column',
                                  },
                              }
                            : undefined
                    }
                >
                    <Box
                        sx={{
                            p: 1.5,
                            ...(flexFill
                                ? {
                                      flex: 1,
                                      minHeight: 0,
                                      display: 'flex',
                                      flexDirection: 'column',
                                  }
                                : {}),
                        }}
                    >
                        {children}
                    </Box>
                </Collapse>
            ) : (
                <Box
                    sx={{
                        p: 1.5,
                        ...(flexFill
                            ? {
                                  flex: 1,
                                  minHeight: 0,
                                  display: 'flex',
                                  flexDirection: 'column',
                              }
                            : {}),
                    }}
                >
                    {children}
                </Box>
            )}
        </Box>
    )
}
