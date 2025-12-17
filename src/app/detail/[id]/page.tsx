import Image from 'next/image';
import styles from './page.module.css';
import { getTourDetail } from '@/lib/api';
import DetailMap from '@/components/DetailMap';

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
    /* 파라미터 */
    const { id } = await params;
    const data = await getTourDetail(id);

    if (!data) return <div className={styles.error}>데이터를 찾을 수 없습니다.</div>;

    return (
        <div className={styles.container}>
            {/* 배너 */}
            <div className={styles.hero}>
                <Image 
                    src={data.firstimage || '/img/icons/logo.png'} 
                    alt={data.title} 
                    fill 
                    priority
                    className={styles.mainImage}
                />
                <div className={styles.heroOverlay}>
                    <h1>{data.title}</h1>
                    <p>{data.addr1}</p>
                </div>
            </div>

            {/* 내용 */}
            <div className={styles.inner}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>장소 소개</h2>
                    <p className={styles.overview}>{data.overview}</p>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>이용 안내</h2>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>주소</span>
                            <span className={styles.value}>{data.addr1 || '정보 없음'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>연락처</span>
                            <span className={styles.value}>{data.tel || '정보 없음'}</span>
                        </div>
                        {data.homepage && (
                            <div className={styles.infoItem}>
                                <span className={styles.label}>홈페이지</span>
                                <span className={styles.value} dangerouslySetInnerHTML={{ __html: data.homepage }} />
                            </div>
                        )}
                    </div>
                </section>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>위치 보기</h2>
                    <DetailMap mapX={data.mapx} mapY={data.mapy} title={data.title} />
                </section>
            </div>
        </div>
    );
}