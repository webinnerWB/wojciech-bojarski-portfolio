import React, { useState, useEffect, useContext, FC } from "react";
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'

import style from '../../style/store.module.scss'
const ProductOrdered: FC = () => {

    interface QuantityItem {
        id: number,
        amount: number
    }

    const [localStorageDataProducts, setLocalStorageDataProducts] = useState<any[]>([])
    const { productsArray, getProductsArray }:ServiceProductsContextProps = useContext(ProductsContext)
    const [quantity, setQuantity] = useState<QuantityItem[]>([])
    const [objectsID, setObjectsID] = useState<number[]>([])

    useEffect(() => {
        setLocalStorageDataProducts([])
        setObjectsID([])
        if(typeof window !== 'undefined' && window.localStorage){
            Object.keys(localStorage).map((key) => {
                const keyValue = Number(key)
                if (!isNaN(keyValue)) {
                    const localStorageProductValue = localStorage.getItem(key)
                    if(localStorageProductValue) {
                        const product = JSON.parse(localStorageProductValue)
                        setObjectsID(prevEl => [...prevEl, product.id])
                        setLocalStorageDataProducts((prevIndex: any[]) => {
                            const newArray = prevIndex.filter(item => item.id !== product.id)
                            return newArray
                          })
                        setLocalStorageDataProducts(prev => [...prev, product])
                    }
                }
            })
        }
    }, [productsArray])

    useEffect(() => {
        localStorageDataProducts.forEach((product) => {
            const lengthArray = objectsID.filter(el => el === product.id)
            const newItem: QuantityItem = {
                id: product.id,
                amount: lengthArray.length
            }
            setQuantity(prevEl => {
                const newArray = prevEl.filter(item => item.id !== product.id)
                return newArray
            })
            setQuantity(prevEl => [...prevEl, newItem])
        })        
        console.log(`quantity: `, quantity)
    }, [getProductsArray, localStorageDataProducts, productsArray, objectsID])

    let products = localStorageDataProducts.map((el, index) => (
        <tr key={`${index}`}>
            <th scope="row">    
                <div className={`d-lg-flex ${style.product}`}>
                    <img className={`${style.imgProduct}`} src={el.imgurl} />
                    <p>{el.name}</p>
                </div>
            </th>
            <td>{el.price}</td>
            <td>{quantity[index] && el.id === quantity[index].id && quantity[index].amount}</td>
            <td>{el.price}</td>
        </tr>
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