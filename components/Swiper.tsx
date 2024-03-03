import React from 'react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import {Swiper, SwiperSlide } from "swiper/react"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface SwiperProps {
    children: React.ReactNode
  }

  const MySwiper = ({ children }: SwiperProps) => {
    let slidesPerView = 1
  
    if (React.Children.count(children) > 3) {
      slidesPerView = 3
    } else if (React.Children.count(children) === 2) {
      slidesPerView = 2
    }
  
    return (
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          484: {slidesPerView: slidesPerView},
          320: {slidesPerView: 1}

        }}
      >
        {children}
      </Swiper>
    )
  }
  
  export { SwiperSlide, MySwiper as Swiper }