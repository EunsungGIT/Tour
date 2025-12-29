# 📍 Tourch (투치)
> **"터치 한 번으로 발견하는 대한민국의 숨은 명소"**
> 한국관광공사 공공데이터를 활용한 사용자 맞춤형 여행 정보 큐레이션 서비스

---

## 🔗 Link
- **Live Demo**: [https://tour-eight-gamma.vercel.app/]
- **Github**: [https://github.com/EunsungGIT/Tourch]

---

## 🚀 Project Overview
- **개발 기간**: 2025.10 - 2025.12 (1인 개발)
- **핵심 목표**: 방대한 공공 데이터를 사용자의 위치와 관심사에 맞춰 직관적으로 전달하고, Firebase를 통한 개인화된 경험(찜하기) 제공.
- **핵심 키워드**: `Next.js`, `Server Components`, `Real-time DB`, `Location-based Service`

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Library**: Framer Motion (Animation)

### Backend & API
- **Backend**: Firebase (Authentication, Firestore)
- **API**: 한국관광공사 TourAPI 4.0, Kakao Maps SDK
- **Deployment**: Vercel

---

## 🌟 Key Features & Tech Insights

### 1. 위치 기반 실시간 주변 탐색 (`/map`)
- **Geolocation API**: 브라우저의 현재 좌표를 획득하여 실시간 위치 서비스 제공.
- **다중 마커 렌더링**: 반경 5km 이내의 관광지 데이터를 가져와 지도상에 마커로 시각화하고, 리스트와 연동하여 사용자 인터랙션 강화.

### 2. 효율적인 데이터 페칭 및 보안
- **Mixed Content 해결**: 공공데이터의 HTTP 응답 문제를 HTTPS 엔드포인트 강제 전환 및 프록시 설정을 통해 해결하여 보안 연결 환경 구축.
- **API 보안**: API Key 및 Firebase 설정값을 환경 변수(`.env`)로 분리하여 클라이언트 노출을 방지하고 Vercel 배포 환경에서 안전하게 관리.
- **ISR (Incremental Static Regeneration)**: 자주 바뀌지 않는 인기 데이터에 `revalidate` 옵션을 적용하여 서버 부하 감소 및 렌더링 성능 최적화.

### 3. 실시간 유저 데이터 동기화
- **Auth Guard**: `onAuthStateChanged`를 통해 유저 인증 상태를 추적하고, 비로그인 유저의 기능 접근 제한 및 UX 분기 처리.
- **Real-time Sync**: Firestore의 `onSnapshot` 리스너를 활용해 사용자가 찜 버튼을 누르는 즉시 `Wishlist` 페이지와 데이터가 실시간으로 동기화되도록 구현.

### 4. 반응형 UI/UX 디자인
- **Mobile-First**: 모바일 사용성을 최우선으로 고려한 레이아웃 설계 및 햄버거 메뉴 구현.
- **User Feedback**: 데이터 로딩 중 `loading.tsx`를 제공하여 사용자가 느끼는 대기 시간을 심리적으로 단축.

---

## 📸 Screen Shots
| 메인 페이지 | 내 주변 탐색 (지도) | 검색 결과 | 상세 페이지 |
| :---: | :---: | :---: | :---: |
| <img src="./public/images/read/main.png" width="200" /> | <img src="./public/images/read/map.png" width="200" /> | <img src="./public/images/read/search.png" width="200" /> | <img src="./public/images/read/detail.png" width="200" /> |

---

## 📁 Directory Structure

```text
src/
├── app/                        # Next.js App Router 및 페이지 구성
│   ├── detail/[id]/            # 관광지 상세 페이지 (동적 라우팅)
│   ├── join/                   # 회원가입 페이지
│   ├── list/                   # 관광지 목록 페이지
│   ├── login/                  # 로그인 페이지
│   ├── map/                    # 내 주변 탐색 (지도) 페이지
│   ├── search/                 # 키워드 검색 페이지
│   ├── wish/                   # 찜 목록(Wishlist) 페이지
│   ├── globals.css             # 전역 스타일 설정
│   ├── layout.tsx              # 공통 레이아웃 (헤더, 푸터 포함)
│   ├── loading.tsx             # 전역 로딩 UI
│   └── page.tsx                # 메인(홈) 페이지
├── components/                 # 재사용 가능한 UI 컴포넌트 및 스타일
│   ├── Card.tsx                # 관광지 카드 아이템 (Card.module.css 포함)
│   ├── DetailMap.tsx           # 상세 페이지용 단일 지도
│   ├── Footer.tsx              # 하단 푸터 (Footer.module.css 포함)
│   ├── FullMap.tsx             # 메인 지도 서비스 컴포넌트
│   ├── Header.tsx              # 상단 네비게이션 (Header.module.css 포함)
│   ├── Infinite.tsx            # 무한 스크롤 처리 컴포넌트
│   ├── Like.tsx                # 찜하기 버튼 및 로직
│   └── SearchInput.tsx         # 검색창 입력 컴포넌트
└── lib/                        # 외부 서비스 라이브러리 설정
    ├── api.ts                  # 한국관광공사 TourAPI 호출 로직
    └── firebase.ts             # Firebase Authentication & Firestore 설정