'use client';

/* REACT */
import { useEffect, useRef } from 'react';

/* 카카오맵에 필요한 데이터 타입 */
interface MapItem {
  contentid: string;
  title: string;
  mapx: string;
  mapy: string;
  firstimage: string;
}

export default function FullMap({ items }: { items: MapItem[] }) {
  /* 지도를 유지하고 마커만 효율적으로 갱신하기 위해 useRef 사용 */
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      /* 카카오 SDK 상태 확인 (타입은 declare로 지정 완료) */
      if (!window.kakao || !window.kakao.maps) {
        return;
      }

      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        /* 데이터가 1개 이상 일 경우 표시 없으면 기본값 : 서울시청 */
        const centerPos = items.length > 0
          ? new window.kakao.maps.LatLng(Number(items[0].mapy), Number(items[0].mapx))
          : new window.kakao.maps.LatLng(37.5665, 126.9780);

        const options = {
          center: centerPos,
          level: 8,
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);

        /* 마커 생성 */
        items.forEach((item) => {
          const position = new window.kakao.maps.LatLng(Number(item.mapy), Number(item.mapx));

          /* 마커 이미지 */
          const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
          const imageSize = new window.kakao.maps.Size(24, 35);
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

          const marker = new window.kakao.maps.Marker({
            position: position,
            map: map,
            image: markerImage, // 이 한 줄이 추가됩니다!
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

    /* 스크립트 로직 */
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      /* SDK가 없거나 로드 중인 경우 */
      const isScriptExist = document.querySelector(`script[src*="dapi.kakao.com"]`);

      if (!isScriptExist) {
        /* 새로 스크립트 다운 */
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => initMap();
      } else {
        /* 스크립트는 다운로드 중이지만 완료가 안된 경우 */
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
      /* 지도에 useRef 선언 */
      ref={mapRef}
      style={{ width: '100%', height: '100%', borderRadius: '12px' }}
    />
  );
}