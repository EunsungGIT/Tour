# 📍 Tourch (터치) - 대한민국 구석구석 여행 가이드

> **"어디로 떠날지 고민될 때, 터치 한 번으로 시작하는 여행"** > 공공데이터 API를 활용한 국내 관광지 정보 및 찜하기 서비스

---

## 🚀 프로젝트 개요
- **개발 기간**: 2024.xx ~ 2024.xx (1인 개발)
- **주요 기능**: 
  - 한국관광공사 API 연동 실시간 관광지 검색
  - 카카오 맵 API를 활용한 위치 정보 제공 (단일/복수 마커)
  - Firebase Auth 기반 회원 시스템
  - Firestore 기반 사용자별 찜하기(Wishlist) 기능

## 🛠 Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, CSS Modules
- **Backend**: Firebase (Authentication, Firestore)
- **API**: 공공데이터포털(TourAPI 4.0), Kakao Maps SDK
- **Deployment**: Vercel

## 🌟 Key Features & Problem Solving

### 1. 효율적인 데이터 검색 (API 연동)
- `fetch` API의 `URLSearchParams`를 활용하여 키워드별 맞춤 검색 기능 구현.
- 서버 사이드 렌더링(SSR)을 활용해 초기 로딩 속도 최적화.

### 2. 실시간 지도 탐색
- 상세 페이지의 단일 위치 표시뿐만 아니라, `/map` 페이지에서 여러 장소를 한눈에 볼 수 있는 클러스터링 기반 지도 구현.

### 3. 유저 데이터 관리 (Firebase)
- `onAuthStateChanged`를 통한 로그인 상태 유지 및 헤더 UI 분기 처리.
- `onSnapshot` 리스너를 사용하여 찜 목록의 실시간 상태 동기화 구현.

### 4. 퍼블리싱 및 반응형 디자인
- Mobile-First 디자인을 적용하여 다양한 기기에서 최적화된 UX 제공.
- CSS Modules를 활용하여 스타일 충돌 방지 및 유지보수성 향상.

---

## 📸 Screen Shots
| 메인 페이지 | 지도 탐색 | 상세 정보 | 찜 목록 |
| :---: | :---: | :---: | :---: |
| (이미지 링크) | (이미지 링크) | (이미지 링크) | (이미지 링크) |