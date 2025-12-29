/* CSS */
import styles from "./page.module.css";

/* 컴포넌트 */
import Card from '@/components/Card';
import SearchInput from '@/components/SearchInput';

/* NEXT */
import Link from "next/link";

/* API */
import { getPopularTours } from '@/lib/api';

/* 인기 데이터 타입 지정 */
interface TourItem {
  contentid: string;
  title: string;
  firstimage: string;
  addr1: string;
}

export default async function Home() {
  /* 인기 데이터 */
  const tours: TourItem[] = await getPopularTours();

  return (
    <main>
      {/* 검색 */}
      <section className={styles.intro}>
        <div className={styles.search}>
          <h2>어디로 여행을 떠나시나요?</h2>
          <SearchInput />
        </div>
      </section>

      {/* 메뉴 */}
      <section className={styles.category}>
        <div className={styles.categoryContainer}>
          <Link href="/list?type=15" className={styles.menuItem}>
            <div className={styles.iconCircle}>🎡</div>
            <span>축제</span>
          </Link>
          <Link href="/list?type=14" className={styles.menuItem}>
            <div className={styles.iconCircle}>🏟️</div>
            <span>문화시설</span>
          </Link>
          <Link href="/list?type=12" className={styles.menuItem}>
            <div className={styles.iconCircle}>🏖️</div>
            <span>관광지</span>
          </Link>
          <Link href="/list?type=38" className={styles.menuItem}>
            <div className={styles.iconCircle}>🛍️</div>
            <span>쇼핑</span>
          </Link>
          <Link href="/list?type=25" className={styles.menuItem}>
            <div className={styles.iconCircle}>🗺️</div>
            <span>여행코스</span>
          </Link>
          <Link href="/list?type=28" className={styles.menuItem}>
            <div className={styles.iconCircle}>🏂</div>
            <span>레포츠</span>
          </Link>
          <Link href="/list?type=32" className={styles.menuItem}>
            <div className={styles.iconCircle}>🏨</div>
            <span>숙박</span>
          </Link>
          <Link href="/list?type=39" className={styles.menuItem}>
            <div className={styles.iconCircle}>🍚</div>
            <span>음식점</span>
          </Link>
        </div>
      </section>

      {/* 인기 */}
      <section className={styles.recommend}>
        <h3>✈️ 지금 인기 있는 관광지</h3>
        <div className={styles.cardGrid}>
          {tours.length > 0 ? (
            tours.map((tour) => (
              <Card
                key={tour.contentid}
                id={tour.contentid}
                title={tour.title}
                image={tour.firstimage}
                address={tour.addr1}
                contentTypeId="12"
              />
            ))
          ) : (
            <p>관광 정보를 불러오는 중입니다...</p>
          )}
        </div>
      </section>
    </main>
  );
}
