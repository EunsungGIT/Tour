'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

/* FIREBASE */
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

export default function Header() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        alert('로그아웃 되었습니다.');
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1>
                    <Link href="/">
                        <Image src="/images/logo.png" alt="로고" width={100} height={0} style={{ width: '100px', height: 'auto' }} />
                    </Link>
                </h1>
                <nav className={styles.nav}>
                    <Link href="/list">리스트</Link>
                    <Link href="/search">검색</Link>
                    <Link href="/map">지도</Link>
                    {user ? (
                        <>
                        <Link href="/wish">찜</Link>
                        <h2 className={styles.userName}>🙇‍♀<strong>{user.displayName}</strong>님</h2>
                        <button onClick={handleLogout} className={styles.logoutBtn}>로그아웃</button>
                        </>
                    ) : (
                        <Link href="/login" className={styles.loginButton}>로그인</Link>
                    )}
                </nav>
            </div>
        </header>
    );
}