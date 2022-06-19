import Header from 'components/header'
import NavBar from 'components/navBar'
import { useState } from 'react'

export default function Layout({ children }) {
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    return (
        <>
            <div>
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
        </>
    )
}
