'use client';

/* NEXT */
import Image from 'next/image';
import Link from 'next/link';

/* CSS */
import styles from './Card.module.css';

/* REACT */
import { useState } from 'react';

/* 컴포넌트 */
import Like from './Like';

/* API에서 오는 숫자코드를 한글로 변환 */
const CATEGORY_MAP: { [key: string]: string } = {
    '12': '관광지',
    '14': '문화시설',
    '15': '축제/행사',
    '25': '여행코스',
    '28': '레포츠',
    '32': '숙박',
    '38': '쇼핑',
    '39': '음식점',
};

/* 카드에 필요한 데이터 받음 */
interface CardProps {
    id: string;
    title: string;
    image: string;
    address: string;
    contentTypeId?: string;
}

export default function Card({ id, title, image, address, contentTypeId }: CardProps) {
    /* 숫자코드에 따른 삼항연산자로 한글로 변환 */
    const categoryName = contentTypeId ? CATEGORY_MAP[contentTypeId] : null;

    /* 이미지 값의 에러 여부 */
    const [imgSrc, setImgSrc] = useState(image || '/images/logo.png');

    return (
        <Link href={`/detail/${id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.image}

                    /* 이미지 로드 에러 시 로드할 이미지 */
                    onError={() => {
                        setImgSrc('/images/logo.png');
                    }}
                />
                {categoryName && <span className={styles.badge}>{categoryName}</span>}
            </div>
            <div className={styles.info}>
                <p className={styles.address}>{address.split(' ')[0]}</p>
                <h4 className={styles.title}>{title}</h4>
                <div className={styles.footer}>
                    <Like id={id} title={title} image={image} address={address} />
                </div>
            </div>
        </Link>
    );
}