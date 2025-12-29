/* CSS */
import styles from './loading.module.css';

/* 로딩 페이지 */
export default function Loading() {
    return (
        <div className={styles.loadingWrapper}>
            <div className={styles.loader}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
            </div>
            <p className={styles.text}>잠시만 기다려주세요...</p>
        </div>
    );
}