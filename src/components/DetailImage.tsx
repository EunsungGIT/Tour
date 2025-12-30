'use client';

/* REACT */
import { useState } from 'react';

/* NEXT */
import Image from 'next/image';

/* 서버 컴포넌트에서 useState 사용 불가로 클라이언트 컴포넌트로 오류 해결 */
interface DetailHeroProps {
    src: string;
    title: string;
}

export default function DetailImage({ src, title }: DetailHeroProps) {
    /* 이미지 값의 에러 여부 */
    const [imgSrc, setImgSrc] = useState(src || '/images/logo.png');

    return (
        <Image
            src={imgSrc}
            alt={title}
            fill
            priority
            style={{ objectFit: 'cover' }}

            /* 이미지 로드 에러 시 로드할 이미지 */
            onError={() => setImgSrc('/images/logo.png')}
        />
    );
}