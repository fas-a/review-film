import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './scroll.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
    <div className='px-4 md:px-20 xl:px-40 grid mt-4'>
      <div className='overflow-x-auto w-full bg-white rounded-lg shadow-md w-2 p-2'>
      <h1
                className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800"
              >
                Most View
              </h1>
        <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className=""
      >
        <SwiperSlide><img className='mySlide' src="img/poster-film/filmv1.jpg" /></SwiperSlide>
        <SwiperSlide><img className='mySlide' src="img/poster-film/filmv2.jpg" /></SwiperSlide>
        <SwiperSlide><img className='mySlide' src="img/poster-film/filmv3.jpg" /></SwiperSlide>
        <SwiperSlide><img className='mySlide' src="img/poster-film/filmv4.jpg" /></SwiperSlide>
        <SwiperSlide><img className='mySlide' src="img/poster-film/filmv5.jpg" /></SwiperSlide>
        <SwiperSlide><img className='mySlide' src="img/poster-film/filmv1.jpg" /></SwiperSlide>
        <SwiperSlide><img className='mySlide' src="img/poster-film/filmv2.jpg" /></SwiperSlide>
        <SwiperSlide><img className='mySlide' src="img/poster-film/filmv3.jpg" /></SwiperSlide>
        <SwiperSlide><img className='mySlide' src="img/poster-film/filmv4.jpg" /></SwiperSlide>
        <SwiperSlide><img className='mySlide' src="img/poster-film/filmv5.jpg" /></SwiperSlide>
      </Swiper>
      </div>
    </div>
    </>
  );
}
