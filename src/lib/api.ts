const API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
const BASE_URL = 'https://apis.data.go.kr/B551011/KorService2';

/* 검색 */
export async function searchTours(keyword: string) {
    const params = new URLSearchParams({
        serviceKey: API_KEY as string,
        numOfRows: '20',
        pageNo: '1',
        MobileOS: 'ETC',
        MobileApp: 'Tourch',
        _type: 'json',
        arrange: 'Q',
        keyword: keyword,
    });

    try {
        const res = await fetch(`${BASE_URL}/searchKeyword2?${params.toString()}`, {
            cache: 'no-store'
        });
        const data = await res.json();
        return data.response.body.items.item || [];
    } catch (error) {
        console.error("검색 에러:", error);
        return [];
    }
}

/* 인기 */
export async function getPopularTours() {
    const params = new URLSearchParams({
        serviceKey: API_KEY as string,
        numOfRows: '6',
        pageNo: '1',
        MobileOS: 'ETC',
        MobileApp: 'Tourch',
        _type: 'json',
        arrange: 'Q',
        contentTypeId: '12',
    });

    try {
        const res = await fetch(`${BASE_URL}/areaBasedList2?${params.toString()}`, {
        next: { revalidate: 3600 }
        });
        
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.');
        
        const data = await res.json();
        return data.response.body.items.item || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

/* 목록 */
export async function getCategoryTours(contentTypeId: string, pageNo: number = 1) {
    const params = new URLSearchParams({
        serviceKey: API_KEY as string,
        numOfRows: '12',
        pageNo: pageNo.toString(),
        MobileOS: 'ETC',
        MobileApp: 'Tourch',
        _type: 'json',
        arrange: 'Q',
        contentTypeId: contentTypeId,
    });

    if (!contentTypeId) params.delete('contentTypeId');

    try {
        const res = await fetch(`${BASE_URL}/areaBasedList2?${params.toString()}`);
        if (!res.ok) throw new Error('데이터 로드 실패');
        const data = await res.json();
        return data.response.body.items.item || [];
    } catch (error) {
        return [];
    }
}

/* 상세 페이지 */
export async function getTourDetail(contentId: string) {
    const params = new URLSearchParams({
        serviceKey: API_KEY as string,
        MobileOS: 'ETC',
        MobileApp: 'Tourch',
        _type: 'json',
        contentId: contentId,
    });

    try {
        const res = await fetch(`${BASE_URL}/detailCommon2?${params.toString()}`, {
            next: { revalidate: 3600 }
        });
        const data = await res.json();
        return data.response.body.items.item[0];
    } catch (error) {
        console.error("상세 정보 호출 에러:", error);
        return null;
    }
}