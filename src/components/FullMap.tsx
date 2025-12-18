'use client';

import { useEffect, useRef } from 'react';

interface MapItem {
  contentid: string;
  title: string;
  mapx: string;
  mapy: string;
  firstimage: string;
}

export default function FullMap({ items }: { items: MapItem[] }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      // [핵심] window.kakao가 정의되어 있는지 최종 확인
      if (!window.kakao || !window.kakao.maps) {
        return;
      }

      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        // 지도 생성 위치 결정 (데이터가 없으면 서울 시청 기준)
        const centerPos = items.length > 0 
          ? new window.kakao.maps.LatLng(Number(items[0].mapy), Number(items[0].mapx))
          : new window.kakao.maps.LatLng(37.5665, 126.9780);

        const options = {
          center: centerPos,
          level: 8,
        };
        
        const map = new window.kakao.maps.Map(mapRef.current, options);

        // 마커 생성
        items.forEach((item) => {
          const position = new window.kakao.maps.LatLng(Number(item.mapy), Number(item.mapx));
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: map,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;color:#333;width:150px;text-align:center;">${item.title}</div>`,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker);
          });
        });
      });
    };

    // 스크립트 로드 로직
    if (window.kakao && window.kakao.maps) {
      // 이미 로드된 경우
      initMap();
    } else {
      // 스크립트가 없거나 아직 로드 중인 경우
      const isScriptExist = document.querySelector(`script[src*="dapi.kakao.com"]`);
      
      if (!isScriptExist) {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => initMap();
      } else {
        // 스크립트는 있는데 kakao 객체가 아직 없는 경우를 대비해 약간의 대기 후 실행
        const interval = setInterval(() => {
          if (window.kakao && window.kakao.maps) {
            initMap();
            clearInterval(interval);
          }
        }, 100);
        return () => clearInterval(interval);
      }
    }
  }, [items]);

  return (
    <div 
      ref={mapRef} 
      style={{ width: '100%', height: '100%', borderRadius: '12px' }} 
    />
  );
}