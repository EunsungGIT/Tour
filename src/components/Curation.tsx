'use client';

/* NEXT */
import Link from 'next/link';

/* CSS */
import styles from './Curation.module.css';

/* 키워드 매핑 */
const CURATION_KEYWORDS = [
    { id: 1, label: '📸 인생샷 명소', keyword: '사진' },
    { id: 2, label: '🐶 반려동물 동반', keyword: '반려동물' },
    { id: 3, label: '✨ 야경맛집', keyword: '야경' },
    { id: 4, label: '👶 아이와 함께', keyword: '어린이' },
    { id: 5, label: '🌿 힐링산책', keyword: '산책' },
    { id: 6, label: '🎡 이색체험', keyword: '체험' },
];

export default function CurationTabs() {
    return (
        <section className={styles.curationContainer}>
            <h3 className={styles.curationTitle}>어떤 여행을 원하세요?</h3>
            <div className={styles.tabWrapper}>
                {CURATION_KEYWORDS.map((item) => (
                    <Link
                        key={item.id}
                        href={`/search?q=${encodeURIComponent(item.keyword)}`}
                        className={styles.keywordChip}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </section>
    );
}