'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

/* FIREBASE */
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Firebase Auth에 계정 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. 사용자 프로필에 닉네임 업데이트
      await updateProfile(user, { displayName: nickname });

      // 3. Firestore에 사용자 기본 정보 저장 (나중에 찜하기 목록 등을 담을 용도)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: email,
        nickname: nickname,
        createdAt: new Date().toISOString(),
      });

      alert('회원가입이 완료되었습니다!');
      router.push('/login'); // 가입 성공 시 로그인 페이지로 이동
    } catch (err: any) {
      // 에러 처리 (한글로 변환해주면 더 좋음)
      if (err.code === 'auth/email-already-in-use') setError('이미 사용 중인 이메일입니다.');
      else if (err.code === 'auth/weak-password') setError('비밀번호를 6자리 이상 입력해주세요.');
      else setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginBox}>
        <h1 className={styles.logo}>Tourch</h1>
        <p className={styles.title}>새로운 여행을 시작해보세요!</p>
        
        <form onSubmit={handleSignup}>
          <input 
            type="text" placeholder="닉네임" required
            className={styles.input} value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input 
            type="email" placeholder="이메일 주소" required
            className={styles.input} value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="비밀번호 (6자 이상)" required
            className={styles.input} value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && <p className={styles.errorMsg}>{error}</p>}
          
          <button type="submit" className={styles.loginBtn}>회원가입 완료</button>
        </form>

        <div className={styles.links}>
          <span>이미 계정이 있으신가요?</span>
          <Link href="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
}