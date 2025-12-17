import { getCategoryTours } from '@/lib/api';
import styles from './page.module.css';
import Infinite from '@/components/Infinite';

export default async function ListPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}) {
    /* 파라미터 */
    const params = await searchParams; 
    const contentTypeId = params.type || '';
    
    /* 데이터 */
    const tours = await getCategoryTours(contentTypeId);

    /* 더보기 */
    const initialTours = await getCategoryTours(contentTypeId, 1);

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