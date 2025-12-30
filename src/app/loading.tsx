/* CSS */
import styles from './loading.module.css';

/* 로딩 페이지 */
export default function Loading() {
    return (
        <div className={styles.loadingWrapper}>
            <div className={styles.spinner}></div>
            <p className={styles.text}>여행 정보를 불러오고 있어요</p>
        </div>
    );
}