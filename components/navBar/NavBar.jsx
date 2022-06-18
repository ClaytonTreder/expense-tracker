import Link from 'next/link'
import styles from 'styles/components/NavBar.module.css'
import { attributes as content } from 'content/components/navBar.md'

export default function NavBar(params) {
    const setMobileNavOpen = (val) => {
        return () => {
            params.setMobileNavOpen(val)
        }
    }
    return (
        <>
            <div
                className={styles.NavBarMobile}
                style={{
                    backgroundColor: params.mobileNavOpen
                        ? content.mobileBackgroundColor
                        : content.backgroundColor,
                    color: content.textColor,
                    display: params.mobileNavOpen ? '' : 'none',
                }}
            >
                <div className={styles.Links}>
                    <div className={styles.X}>
                        <span onClick={setMobileNavOpen(false)}>X</span>
                    </div>
                    {content.links.map((l, i) => (
                        <Link key={i} href={l.link}>
                            <a
                                onClick={setMobileNavOpen(false)}
                                className={styles.Link}
                            >
                                {l.text}
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
            <div
                className={styles.NavBarDesktop}
                style={{
                    backgroundColor: params.mobileNavOpen
                        ? content.mobileBackgroundColor
                        : content.backgroundColor,
                    color: content.textColor,
                }}
            >
                {content.links.map((l, i) => (
                    <Link key={i} href={l.link}>
                        <a
                            onClick={setMobileNavOpen(false)}
                            className={styles.Link}
                        >
                            {l.text}
                        </a>
                    </Link>
                ))}
            </div>
        </>
    )
}
