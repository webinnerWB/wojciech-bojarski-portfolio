import React, { useEffect, useState, FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Methods from '../services/DB/Methods'

import 'swiper/swiper-bundle.css';
import style from '../../style/store.module.scss'
import { DocumentData } from "firebase/firestore";

type categoryComponent = {
  handleSearchResults: (value: string) => void,
  valuesArray: string[]
}

const Categories: FC<categoryComponent> = ({ handleSearchResults, valuesArray }: categoryComponent) => {

  const [categories, setCategories] = useState<DocumentData[]>([])
  const [elIndex, setElIndex] = useState<number[]>([])
  
  const getAllDocuments = Methods().$getAllDocuments
  const getCategories = async () => {
    try {
      const category = await getAllDocuments('categories')
      setCategories(category.docs.map(doc => doc.data()))
    } catch (err) {
      console.error(`Error: `, err)
    }
  }

  const categoryFilterHandler = ( value: string) => {
    const categoryValue: string = value.toLocaleLowerCase()
    handleSearchResults(categoryValue)
  }
  const removeCategoryFilter = (index: number) => {
    if(elIndex.includes(index)) {
      setElIndex((prevIndex: any[]) => {
        const newArray = prevIndex.filter(item => item !== index)
        return newArray
      })
    }
  }
  const clearActiveSlide = () => {
    if(valuesArray.length === 1) {
      setElIndex([])
    }
  }
  const handleMethods = (name: string, index: number) => {
    setElIndex((prevIndex: number[]) => {
      const newArray = [...prevIndex, index]
      return newArray
    })
    removeCategoryFilter(index)
    categoryFilterHandler(name)
  }
  
  const slides = categories.map((el: any, index: number) => (
    <SwiperSlide className={`${style.slide} ${elIndex.includes(index) ? style.active : ''}`} key={index} id={el.name} onClick={() => handleMethods(el.name, index)}>
      <i className={`${el.icon} ${style.categoryIcon}`}></i>
      <h4>{el.name}</h4>
    </SwiperSlide>
  ))

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    clearActiveSlide()
  }, [valuesArray])


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