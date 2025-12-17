'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import styles from './page.module.css';
import Link from 'next/link';

/* FIREBASE */
import { auth, db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        /* 로그인 상태 확인 */
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogin(true);
                const q = query(
                    collection(db, 'users', user.uid, 'wishlist'),
                    orderBy('createdAt', 'desc')
                );

                const unsubscribeWishlist = onSnapshot(q, (snapshot) => {
                    const items = snapshot.docs.map(doc => ({
                        ...doc.data()
                    }));
                    setWishlist(items);
                    setLoading(false);
                });

                return () => unsubscribeWishlist();
            } else {
                setIsLogin(false);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    if (loading) return <div className={styles.loading}>불러오는 중...</div>;

    if (!isLogin) {
        return (
            <div className={styles.noUser}>
                <p>로그인이 필요한 서비스입니다.</p>
                <Link href="/login" className={styles.goLogin}>로그인하러 가기</Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>내 찜 목록 ({wishlist.length})</h2>
            
            {wishlist.length > 0 ? (
                <div className={styles.cardGrid}>
                    {wishlist.map((item) => (
                        <Card 
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            address={item.address}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <p>아직 찜한 장소가 없습니다. 😥</p>
                    <Link href="/" className={styles.goHome}>장소 둘러보기</Link>
                </div>
            )}
        </div>
    );
}