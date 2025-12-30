'use client';

/* 컴포넌트 */
import Card from './Card';

/* SWIPER */
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

/* CSS */
import './slider.module.css';

/* 부모 컴포넌트에서 받아온 api 데이터 타입 지정 */
interface TourItem {
    contentid: string;
    title: string;
    firstimage: string;
    addr1: string;
    contenttypeid?: string;
}

export default function HomeSlider({ items, defaultType }: { items: TourItem[], defaultType: string }) {
    return (
        <Swiper
            modules={[FreeMode, Pagination]}
            spaceBetween={16}
            slidesPerView={'auto'}
            freeMode={true}
            grabCursor={true}
            className="mySwiper"
        >
            {/* 받아온 데이터를 반복문으로 Card 컴포넌트를 이용해 표시 */}
            {items.map((item) => (
                <SwiperSlide key={item.contentid} style={{ width: '280px' }}>
                    <Card
                        id={item.contentid}
                        title={item.title}
                        image={item.firstimage}
                        address={item.addr1}
                        contentTypeId={item.contenttypeid || defaultType}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}