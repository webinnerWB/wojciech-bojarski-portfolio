import React, { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

const Categories: FC = () => {
    
    return (
      <Swiper 
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        autoplay={{ delay: 3000 }}
        breakpoints={{
            484: {slidesPerView: 3},
            320: {slidesPerView: 1}

        }}
    >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        {/* Dodaj więcej slajdów według potrzeb */}
      </Swiper>
    );
  };
  
  export default Categories;