'use client';

import { useState, useEffect } from 'react';
import { getCategoryTours } from '@/lib/api';
import Card from './Card';
import styles from './Infinite.module.css';

export default function InfiniteList({ initialTours, contentTypeId }: { initialTours: any[], contentTypeId: string }) {
    const [tours, setTours] = useState(initialTours);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadMoreTours = async () => {
        setLoading(true);
        const nextPage = page + 1;
        const newTours = await getCategoryTours(contentTypeId, nextPage);
        
        if (newTours.length === 0) {
            setHasMore(false);
        } else {
            setTours((prev) => [...prev, ...newTours]);
            setPage(nextPage);
        }
        setLoading(false);
    };

    useEffect(() => {
        setTours(initialTours);
    }, [initialTours, contentTypeId]);

    return (
        <>
            <div className={styles.cardGrid}>
                {tours.map((tour: any) => (
                    <Card 
                        key={tour.contentid}
                        id={tour.contentid}
                        title={tour.title}
                        image={tour.firstimage}
                        address={tour.addr1}
                        contentTypeId={tour.contenttypeid} 
                    />
                ))}
            </div>
            
            <div className={styles.actionArea}>
                {hasMore ? (
                    <button 
                        onClick={loadMoreTours} 
                        className={styles.loadMoreBtn}
                        disabled={loading}
                    >
                        {loading ? '정보를 가져오는 중...' : '더보기'}
                    </button>
                ) : (
                    <p className={styles.noMore}>모든 정보를 불러왔습니다. 😊</p>
                )}
            </div>
        </>
    );
}