'use client';

import { useState, useEffect } from 'react';
import { getLocationBasedTours } from '@/lib/api';
import FullMap from '@/components/FullMap';
import styles from './page.module.css';
import Link from 'next/link';

const CATEGORY_MAP: { [key: string]: string } = {
    '12': '관광지',
    '14': '문화시설',
    '15': '축제/행사',
    '25': '여행코스',
    '28': '레포츠',
    '32': '숙박',
    '38': '쇼핑',
    '39': '음식점',
};

export default function MapPage() {
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState('위치 확인 중...');

  useEffect(() => {
    /* Geolocation 사용자의 위치 */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // 2. 위도, 경도를 기반으로 API 호출
          const data = await getLocationBasedTours(latitude, longitude);
          setItems(data);
        },
        (error) => {
          console.error("위치 정보를 가져오는데 실패했습니다.", error);
        }
      );
    } else {
      alert("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  return (
    <div className={styles.mapPageWrapper}>
      {/* 왼쪽: 장소 리스트 */}
      <aside className={styles.sideList}>
        <div className={styles.listHeader}>
          <h2>🗺️ 내 주변 탐색</h2>
          <p>총 {items.length}개의 장소가 발견되었어요.</p>
        </div>
        <div className={styles.scrollArea}>
          {items.length > 0 ? (
            items.map((item: any) => (
              <Link href={`/detail/${item.contentid}`} key={item.contentid} className={styles.listItem}>
                <div className={styles.itemText}>
                  <span className={styles.category}>{CATEGORY_MAP[item.contenttypeid] || '기타'}</span>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemAddr}>{item.addr1 || "주소 정보 없음"}</p>
                  {item.dist && <p className={styles.dist}>{Math.round(item.dist / 100) / 10}km 떨어짐</p>}
                </div>
              </Link>
            ))
          ) : (
            <p className={styles.noData}>주변에 검색된 장소가 없습니다.</p>
          )}
        </div>
      </aside>

      {/* 오른쪽: 전체 지도 */}
      <main className={styles.mapContainer}>
        <FullMap items={items} />
      </main>
    </div>
  );
}