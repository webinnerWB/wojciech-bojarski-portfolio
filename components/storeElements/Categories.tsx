import React, { useEffect, useState, FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Methods from '../services/DB/Methods'

import 'swiper/swiper-bundle.css';
import style from '../../style/store.module.scss'

type categoryComponent = {
  handleSearchResults: (value: string) => void
}

const Categories: FC<categoryComponent> = ({ handleSearchResults }: categoryComponent) => {

  const [categories, setCategories] = useState<any>([])
  // const [el, setEl] = useState<string>()
  
  const getAllDocuments = Methods().$getAllDocuments

  const getCategories = async () => {
    try {
      const category = await getAllDocuments('categories')
      setCategories(category.docs.map(doc => doc.data()))
    } catch (err) {
      console.log(`Error: `, err)
    }
  }

  const categoryFilterHandler = ( value: string) => {
    const value2: string = value.toLocaleLowerCase()
    handleSearchResults(value2)
  }
  // const getElement = (name: string) => {
  //   setEl(name)
  // }

  // const handleMethod = (name: string) => {
  //   setEl(name)
  //   categoryFilterHamdler(name)
  // }
  const slides = categories.map((el: any, index: number) => (
    <SwiperSlide className={`${style.slide}`} key={index} id={el.name} onClick={() => categoryFilterHandler(el.name)}>
      <i className={`${el.icon} ${style.categoryIcon}`}></i>
      <h4>{el.name}</h4>
    </SwiperSlide>
  ))

  useEffect(() => {
    getCategories()
  }, [])

  // useEffect(() => {
  //   if(el) {
  //     let element: HTMLElement | null = document.getElementById(el)    
  //     if(element) {
  //       element.style.pointerEvents = 'none'
  //     }
  //   }
  // }, [el])

  // useEffect(() => {
  //   console.log(categories)
  // }, [categories])


    return (
     <>
       <h2 className={`${style.titleCategories}`}>Categories</h2>
      <Swiper 
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        loop={true}
        // autoplay={{ delay: 3000 }}
        breakpoints={{
            1219: {slidesPerView: 5},
            600: {slidesPerView: 3},
            320: {slidesPerView: 1}

        }}
        className={`${style.swiperWrapper}`}
        >
          {slides}
      </Swiper>
     </>
    );
  };
  
  export default Categories;