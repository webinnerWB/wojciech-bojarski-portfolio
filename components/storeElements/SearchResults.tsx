import React, {useState, useEffect, FC, useRef, useContext, RefObject } from "react"
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'

import style from '../../style/store.module.scss'
import { DocumentData } from "firebase/firestore"

type results = {
    valueSearch: string|null,
    results: DocumentData[] | undefined,
    valuesArray: string[]
}

const SearchResults: FC<results> = ({ valueSearch, results, valuesArray }: results) => {
    const searchResultsRef = useRef<HTMLDivElement>(null)
    const noResultsRef = useRef<HTMLDivElement | null>(null)
    const span = useRef<HTMLSpanElement[] | null>([])
    
    const { $addProduct }: ServiceProductsContextProps = useContext(ProductsContext)
    
    const addingAnimation = (index: number) => {
      if(span.current?.[index]) {
        span.current[index].style.animation = `${style.animateAdding} 0.5s ease-in`
        setTimeout(() => {
          span.current![index].removeAttribute('style')
        }, 900)
      }
    }

    const clickProductHandler = (result: object, index:number) => {
      $addProduct(result, index)
      addingAnimation(index)
    }

    useEffect(() => {
      if(results && searchResultsRef.current) {
        searchResultsRef.current.scrollIntoView({ behavior: 'smooth' })
      }else{
        if(noResultsRef.current) noResultsRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, [results])

    const activeCategories = valuesArray.slice(1).map(el => {
      const category = el.charAt(0).toUpperCase() + el.slice(1)
      
      return category
    }).join(', ')

    return (
      <>
        {results && results.length > 0 ? (
          <>
            <h2 ref={searchResultsRef} className={style.searchTitle}>{valueSearch && activeCategories.length === 0 ? `Search results for: "${valueSearch}"` : `Search results for categories: "${activeCategories}"`}</h2>
            <div className={style.productWrapper}>
              {results.map((result) => (
                <div key={result.id} className={style.product} onClick={() => clickProductHandler(result, result.id)}>
                  <p>{result.name.map((namePart: string, nameIndex: number) => (
                    nameIndex === 0 ?
                        namePart.charAt(0).toUpperCase() + namePart.slice(1) :
                        namePart
                  )).join(' ')
                  }</p>
                  <img src={result.imgurl} className={style.productImg}/>
                  <p>{result.price}$</p>
                  <div className={`${style.addWrapperButton}`}>+</div>
                  <span ref={el => (span.current![result.id] = el!)} className={`${style.addingAnimation}`}>1</span>
                </div>
              ))}
            </div>
          </>
        ) : results === undefined ? <h3 className={style.noSearch} ref={noResultsRef}>No products match your criteria!</h3> : null}
      </>
    )
  }

export default SearchResults