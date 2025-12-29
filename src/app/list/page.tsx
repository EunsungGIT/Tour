/* API */
import { getCategoryTours } from '@/lib/api';

/* CSS */
import styles from './page.module.css';

/* 컴포넌트 */
import Infinite from '@/components/Infinite';

/* 비동기 파라미터로 숫자코드 확인 */
export default async function ListPage({ searchParams }: { searchParams: Promise<{ type?: string }>; }) {
    /* 숫자코드 파라미터 수집 */
    const params = await searchParams;
    const contentTypeId = params.type || '';

    /* 숫자코드와 첫번째 페이지 번호를 보내 호출받은 데이터 */
    const initialTours = await getCategoryTours(contentTypeId, 1);

    /* 숫자코드에 따라 타이틀 매핑 */
    const titleMap: { [key: string]: string } = {
        '': '📚 전체',
        '12': '🏖️ 관광지',
        '14': '🏟️ 문화시설',
        '15': '🎡 축제/행사',
        '25': '🗺️ 여행코스',
        '28': '🏂 레포츠',
        '32': '🏨 숙박',
        '38': '🛍️ 쇼핑',
        '39': '🍚 음식점',
    };

    return (
        <div className={styles.container}>
            <header className={styles.listHeader}>
                <h2 className={styles.listTitle}>{titleMap[contentTypeId]}</h2>
            </header>

            <Infinite initialTours={initialTours} contentTypeId={contentTypeId} />
        </div>
    );
}