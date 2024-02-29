import React, { useState, useEffect, useContext, FC } from "react";
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'

import style from '../../style/store.module.scss'
const ProductOrdered: FC = () => {
    const [localStorageDataProducts, setLocalStorageDataProducts] = useState<any[]>([])
    const [localstorageArrayWithoutRepetitions, setLocalstorageArrayWithoutRepetitions] = useState<any[]>([])
    const { productsArray }:ServiceProductsContextProps = useContext(ProductsContext)

    useEffect(() => {
        setLocalStorageDataProducts([])
        if(typeof window !== 'undefined' && window.localStorage){
            Object.keys(localStorage).map((key) => {
                const keyValue = Number(key)
                if (!isNaN(keyValue)) {
                    const localStorageProductValue = localStorage.getItem(key)
                    if(localStorageProductValue) {
                        const product = JSON.parse(localStorageProductValue)
                        setLocalStorageDataProducts(prev => [...prev, product])
                    }
                }
            })
        }
    }, [productsArray])

    let products = localStorageDataProducts.map((el, index) => (
        <>
            <tr key={index}>
                <th scope="row">
                    <div className={`d-lg-flex ${style.product}`}>
                        <img className={`${style.imgProduct}`} src={el.imgurl} />
                        <p>{el.name}</p>
                    </div>
                </th>
                <td>{el.price}</td>
                <td>{el.id}</td>
                <td>{el.price}</td>
            </tr>
        </>
    ))
    return (
        <>
            { localStorageDataProducts 
            ? 
            products
            : 
            <p>NO DATA</p> }      
        </>
        
    )
}

export default ProductOrdered