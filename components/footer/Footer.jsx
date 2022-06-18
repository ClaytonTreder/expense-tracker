import { attributes as content } from 'content/components/footer.md'
import Image from 'next/image'
import styles from 'styles/components/Footer.module.css'
import Link from 'next/link'
export default function Footer() {
    return (
        <div
            style={{
                backgroundColor: content.backgroundColor,
                color: content.textColor,
            }}
        >
            <div className={styles.Footer}>
                <div className={styles.LinkSection}>
                    {content.mainLinks.links?.map((l, i) => (
                        <Link key={i} href={l.link}>
                            <a className={styles.Link}>
                                <span>{l.text}</span>
                            </a>
                        </Link>
                    ))}
                </div>
                <div className={styles.LinkSection}>
                    {content.socialLinks.links?.map((l, i) => (
                        <Link key={i} target="_blank" href={l.link}>
                            <a className={styles.Link}>
                                <Image
                                    alt={`social img ${i}`}
                                    width={25}
                                    height={25}
                                    src={`/${l.img}`}
                                />
                                <span>{l.text}</span>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
            <br />
        </div>
    )
}
