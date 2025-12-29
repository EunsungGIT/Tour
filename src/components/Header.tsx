'use client'

/* REACT */
import { useEffect, useState } from 'react';

/* NEXT */
import Link from 'next/link';
import Image from 'next/image';

/* CSS */
import styles from './Header.module.css';

/* FIREBASE */
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

export default function Header() {
    /* user 로그인 상태 */
    const [user, setUser] = useState<User | null>(null);

    /* 네비게이션 열림과 닫힘 상태 */
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /* onAuthStateChanged 실행 */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        /* 컴포넌트가 사라질 때 onAuthStateChanged를 종료해서 메모리 누수 방지 */
        return () => unsubscribe();
    }, []);

    /* 닫힘 이벤트 함수 */
    const closeMenu = () => setIsMenuOpen(false);

    /* 로그아웃 이벤트 함수 */
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

                {/* 네비게이션 */}
                <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ''}`}>
                    <Link href="/list" onClick={closeMenu}>리스트</Link>
                    <Link href="/search" onClick={closeMenu}>검색</Link>
                    <Link href="/map" onClick={closeMenu}>지도</Link>

                    {/* user 로그인 상태에 따라 다른 버튼 표시 */}
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

                {/* 모바일 네비게이션 배경 */}
                {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
            </div>
        </header>
    );
}