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
    const isScriptExist = document.querySelector(`script[src*="dapi.kakao.com"]`);
    
    const initMap = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        // 1. 지도 생성 (첫 번째 아이템 기준 혹은 기본 위치)
        const options = {
          center: new window.kakao.maps.LatLng(Number(items[0]?.mapy || 37.5665), Number(items[0]?.mapx || 126.9780)),
          level: 8,
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);

        // 2. 여러 개 마커 찍기
        items.forEach((item) => {
          const position = new window.kakao.maps.LatLng(Number(item.mapy), Number(item.mapx));
          
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: map,
          });

          // 3. 인포윈도우(클릭 시 이름 표시)
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;color:#333;">${item.title}</div>`,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker);
          });
        });
      });
    };

    if (!isScriptExist) {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
      script.async = true;
      document.head.appendChild(script);
      script.onload = initMap;
    } else {
      initMap();
    }
  }, [items]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}