'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
    mapX: string;
    mapY: string;
    title: string;
}

export default function KakaoMap({ mapX, mapY, title }: KakaoMapProps) {
  useEffect(() => {
    // 1. 카카오 지도 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // 2. 스크립트 로드 완료 후 지도 초기화
      window.kakao.maps.load(() => {
        const container = document.getElementById('map'); // 지도를 담을 영역
        const options = {
          center: new window.kakao.maps.LatLng(Number(mapY), Number(mapX)), // 위도, 경도
          level: 3, // 확대 레벨
        };

        const map = new window.kakao.maps.Map(container, options);

        // 3. 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(Number(mapY), Number(mapX));
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
  }, [mapX, mapY]);

  return (
    <div 
      id="map" 
      style={{ 
        width: '100%', 
        height: '350px', 
        borderRadius: '12px', 
        marginTop: '20px',
        backgroundColor: '#eee' 
      }} 
    />
  );
}