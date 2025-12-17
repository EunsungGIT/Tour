'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import styles from './Like.module.css';

interface LikeButtonProps {
  id: string;
  title: string;
  image: string;
  address: string;
}

export default function LikeButton({ id, title, image, address }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const user = auth.currentUser;

  // 1. 처음 로드될 때 내가 이미 찜했는지 확인
  useEffect(() => {
    if (!user) return;
    const checkLiked = async () => {
      const docRef = doc(db, 'users', user.uid, 'wishlist', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setIsLiked(true);
    };
    checkLiked();
  }, [id, user]);

  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // 카드 클릭 시 상세페이지 이동 방지
    if (!user) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    const docRef = doc(db, 'users', user.uid, 'wishlist', id);

    if (isLiked) {
      await deleteDoc(docRef);
      setIsLiked(false);
    } else {
      await setDoc(docRef, {
        id, title, image, address,
        createdAt: new Date().toISOString(),
      });
      setIsLiked(true);
    }
  };

  return (
    <button className={`${styles.likeBtn} ${isLiked ? styles.active : ''}`} onClick={toggleLike}>
      {isLiked ? '❤️' : '🤍'}
    </button>
  );
}