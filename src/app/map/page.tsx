import { getPopularTours } from '@/lib/api';
import FullMap from '@/components/FullMap';
import styles from './page.module.css';
import Link from 'next/link';

export default async function MapPage() {
  const items = await getPopularTours();

  return (
    <div className={styles.mapPageWrapper}>
      {/* 왼쪽: 장소 리스트 */}
      <aside className={styles.sideList}>
        <div className={styles.listHeader}>
          <h2>주변 탐색</h2>
          <p>총 {items.length}개의 장소</p>
        </div>
        <div className={styles.scrollArea}>
          {items.map((item: any) => (
            <Link href={`/detail/${item.contentid}`} key={item.contentid} className={styles.listItem}>
              <div className={styles.itemText}>
                <span className={styles.category}>관광지</span>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.itemAddr}>{item.addr1}</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>

      {/* 오른쪽: 전체 지도 */}
      <main className={styles.mapContainer}>
        <FullMap items={items} />
      </main>
    </div>
  );
}