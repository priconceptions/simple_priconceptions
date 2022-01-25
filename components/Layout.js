import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'

const Layout = ({ children }) => {
    return (
        <div>
            <Meta />
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
