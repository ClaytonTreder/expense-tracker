import { attributes as content } from 'content/components/header.md'
import Image from 'next/image'
import styles from 'styles/components/Header.module.css'

export default function Header(params) {
    const setMobileNavOpen = (val) => {
        return ()=>{
            params.setMobileNavOpen(val)
        }
    }
    return (
        <div
            style={{
                backgroundColor: content.backgroundColor,
                color: content.textColor,
            }}
        >
            <div className={styles.Header}>
                <div className={styles.Logo}>
                    <Image alt='template cjt devs website' src={`/${content.logo}`} height={100} width={100} />
                </div>
                <div className={styles.Title}>
                    <h1>{content.title}</h1>
                </div>
                <div onClick={setMobileNavOpen(true)} className={styles.NavIcon}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
