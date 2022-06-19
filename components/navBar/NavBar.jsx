import Link from 'next/link'
import styles from 'styles/components/NavBar.module.css'

export default function NavBar(params) {
    const setMobileNavOpen = (val) => {
        return () => {
            params.setMobileNavOpen(val)
        }
    }
    const links = [
        { link: '/', text: 'Current' },
        { link: '/add/expense', text: 'Add Expense' },
        { link: '/add/budget', text:  'Budgets' },
    ]
    return (
        <>
            <div
                className={styles.NavBarMobile}
                style={{
                    display: params.mobileNavOpen ? '' : 'none',
                }}
            >
                <div className={styles.Links}>
                    <div className={styles.X}>
                        <span onClick={setMobileNavOpen(false)}>X</span>
                    </div>
                    {links.map((l, i) => (
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
            <div className={styles.NavBarDesktop}>
                {links.map((l, i) => (
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
