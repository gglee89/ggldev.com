import { Container } from '@mui/material'
import React from 'react'

import UiInternalsContent from 'modules/ui-internals/UiInternalsContent'
import Layout from 'pages/layout'

import './ui-internals.css'

const UiInternals = () => {
    return (
        <Layout>
            <Container maxWidth="xl" className="ui-internals-root">
                <UiInternalsContent />
            </Container>
        </Layout>
    )
}

export default UiInternals
