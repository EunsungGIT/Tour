'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

/* FIREBASE */
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginBox}>
        <h1 className={styles.logo}>Tourch</h1>
        <form onSubmit={handleLogin}>
          <input 
            type="email" placeholder="이메일 주소" required
            className={styles.input} value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="비밀번호" required
            className={styles.input} value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.errorMsg}>{error}</p>}
          <button type="submit" className={styles.loginBtn}>로그인</button>
        </form>
        <div className={styles.links}>
          <span>계정이 없으신가요?</span>
          <Link href="/join">회원가입</Link>
        </div>
      </div>
    </div>
  );
}