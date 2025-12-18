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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = async () => {
        await signOut(auth);
        alert('로그아웃 되었습니다.');
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1>
                    <Link href="/" onClick={closeMenu}>
                        <Image src="/images/logo.png" alt="로고" width={100} height={0} style={{ width: '100px', height: 'auto' }} />
                    </Link>
                </h1>

                {/* 모바일 햄버거 버튼 */}
                <button 
                    className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`} 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="메뉴 열기"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* 네비게이션: 메뉴 상태에 따라 클래스 부여 */}
                <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ''}`}>
                    <Link href="/list" onClick={closeMenu}>리스트</Link>
                    <Link href="/search" onClick={closeMenu}>검색</Link>
                    <Link href="/map" onClick={closeMenu}>지도</Link>
                    {user ? (
                        <>
                            <Link href="/wish" onClick={closeMenu}>찜</Link>
                            <h2 className={styles.userName}>🙇‍♀<strong>{user.displayName}</strong>님</h2>
                            <button onClick={handleLogout} className={styles.logoutBtn}>로그아웃</button>
                        </>
                    ) : (
                        <Link href="/login" className={styles.loginButton} onClick={closeMenu}>로그인</Link>
                    )}
                </nav>

                {/* 모바일 메뉴 열렸을 때 배경 어둡게 처리 (선택) */}
                {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
            </div>
        </header>
    );
}