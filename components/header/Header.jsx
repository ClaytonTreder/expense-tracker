import styles from 'styles/components/Header.module.css'

export default function Header(params) {
    const setMobileNavOpen = (val) => {
        return () => {
            params.setMobileNavOpen(val)
        }
    }
    return (
        <div>
            <div className={styles.Header}>
                <div className={styles.Logo}>
                    
                </div>
                <div
                    onClick={setMobileNavOpen(true)}
                    className={styles.NavIcon}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
