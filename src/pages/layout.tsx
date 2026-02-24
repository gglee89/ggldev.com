import BackgroundWrapper from "components/BackgroundWrapper"
import React from "react"
import Header from "section/Header"

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <BackgroundWrapper>
            <Header />
            {children}
        </BackgroundWrapper>
    )
}

export default Layout
