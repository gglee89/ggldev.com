import { Box, Typography } from '@mui/material'
import React from 'react'

import type { RenderedPreview } from '../types'

import { ChromeMechanismPanel } from './ChromeMechanismPanel'

type RenderedPreviewPanelProps = {
    preview: RenderedPreview
    blink?: boolean
}

export const RenderedPreviewPanel = ({ preview, blink }: RenderedPreviewPanelProps) => {
    return (
        <ChromeMechanismPanel title="Rendered output" badge="Viewport" blink={blink}>
            <Box className="ui-internals-preview-surface">
                {preview.bodyEmpty ? (
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                        No element children under <code>&lt;body&gt;</code> yet (white screen).
                    </Typography>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                        <input
                            readOnly
                            type="text"
                            value={preview.inputValue}
                            aria-label="Preview input"
                            style={{
                                width: '100%',
                                maxWidth: 280,
                                padding: '6px 8px',
                                border: '1px solid #dadce0',
                                borderRadius: 4,
                                fontSize: 14,
                            }}
                        />
                        <div style={{ fontSize: 14 }}>{preview.greeting}</div>
                        <div style={{ fontSize: 14 }}>{preview.footer}</div>
                    </Box>
                )}
            </Box>
        </ChromeMechanismPanel>
    )
}
