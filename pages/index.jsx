import styles from 'styles/pages/Home.module.css'
import Meta from 'pages/Meta'
import {
    react as HomeComponent,
    attributes as content,
} from 'content/pages/home.md'
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <Meta />
            <div
                style={{ backgroundColor: content.backgroundColor }}
                className={styles.container}
            >
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to the{' '}
                        <Link
                            rel="noreferrer"
                            target="_blank"
                            href="https://cjtdevs.com"
                        >
                            CJT Devs
                        </Link>{' '}
                        website template!
                    </h1>

                    <p className={styles.description}>
                        Get started by{' '}
                        <code className={styles.code}>
                            <Link
                                rel="noreferrer"
                                target="_blank"
                                href="https://cjtdevs.com/contact"
                            >
                                <u>contacting</u>
                            </Link>{' '}
                            a dev
                        </code>
                    </p>
                    <div className={styles.ComponentContainer}>
                        <HomeComponent />
                    </div>
                </main>
            </div>
        </>
    )
}
