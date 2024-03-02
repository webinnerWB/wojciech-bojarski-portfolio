import React, { useState, useEffect, useContext, FC, Fragment } from "react";
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'
import { useRouter } from "next/router";

import style from '../../style/store.module.scss'
const ProductOrdered: FC = () => {

    interface QuantityItem {
        id: number,
        amount: number,
        price: number
    }

    const [localStorageDataProducts, setLocalStorageDataProducts] = useState<any[]>([])
    const { productsArray, getProductsArray, $updateCounter }:ServiceProductsContextProps = useContext(ProductsContext)
    const [quantityObjects, setQuantityObjects] = useState<QuantityItem[]>([])
    const [objectsID, setObjectsID] = useState<number[]>([])
    const [totalCost, setTotalCost] = useState<number>(0)
    const router = useRouter()

    const removeProduct = (id: number) => {
        $updateCounter(id)
        setLocalStorageDataProducts(prevEl => {
            const newArrayLocalStorageDataProducts = prevEl.filter(currentEl => currentEl.id !== id)
            return newArrayLocalStorageDataProducts
        })
        setQuantityObjects(prevEl => {
            const newArrayLocalStorageDataProducts = prevEl.filter(currentEl => currentEl.id !== id)
            return newArrayLocalStorageDataProducts
        })
        Object.keys(localStorage).forEach(key => {
            const isNumberKey = Number(key)
            if(!isNaN(isNumberKey)){
                const itemKey = localStorage.getItem(key)
                if(itemKey) {
                    const product = JSON.parse(itemKey)
                    if(product.id === id) {
                        localStorage.removeItem(key)
                    }
                }
            }
        })
        const arrayLength = localStorageDataProducts.length - 1
        if(arrayLength === 0) {
            router.push('/store')
        }
    }

    useEffect(() => {
        setTotalCost(0)
        quantityObjects.forEach(obj => {
            const singleProductCost = obj.amount * obj.price
            singleProductCost.toFixed(2)
            setTotalCost(prevCost => prevCost + singleProductCost)
        })
    }, [localStorageDataProducts, productsArray, quantityObjects, objectsID])

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
                amount: lengthArray.length,
                price: product.price
            }
            setQuantityObjects(prevEl => {
                const newArray = prevEl.filter(item => item.id !== product.id)
                return newArray
            })
            setQuantityObjects(prevEl => [...prevEl, newItem])
        })        
        console.log(`quantity: `, quantityObjects)
        console.log(`localStorageDataProducts: `, localStorageDataProducts)
    }, [getProductsArray, localStorageDataProducts])

    let products = localStorageDataProducts.map((el, index) => (
        <tr key={`${index}`} className={`${style.borderBottom}`}>
            <th scope="row" className={`${style.td}`}>    
                <div className={`d-lg-flex align-items-lg-center ${style.product}`}>
                    <img className={`${style.imgProduct}`} src={el.imgurl} />
                    <p className={`${style.name}`}>{el.name}</p>
                </div>
            </th>
            <td className={`${style.td}`}>{el.price}$</td>
            <td className={`${style.td}`}>{quantityObjects[index] && el.id === quantityObjects[index].id && quantityObjects[index].amount}</td>
            <td className={`${style.td}`}>{quantityObjects[index] && el.price * quantityObjects[index].amount}$</td>
            <td onClick={() => removeProduct(el.id)}>x</td>
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