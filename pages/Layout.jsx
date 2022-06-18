import Header from 'components/header'
import Footer from 'components/footer'
import NavBar from 'components/navBar'
import { attributes as content } from 'content/pages/home.md'
import { useState } from 'react'

export default function Layout({ children }) {
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    return (
        <>
            <div
                style={{ backgroundColor: content.backgroundColor }}
                id="body-content"
            >
                <Header
                    mobileNavOpen={mobileNavOpen}
                    setMobileNavOpen={setMobileNavOpen}
                />
                <NavBar
                    mobileNavOpen={mobileNavOpen}
                    setMobileNavOpen={setMobileNavOpen}
                />
                {children}
            </div>
            <Footer />
        </>
    )
}
