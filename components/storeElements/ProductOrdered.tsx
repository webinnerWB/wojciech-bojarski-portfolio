import React, { useState, useEffect, useContext, FC } from "react"
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'
import { useRouter } from "next/router"

import style from '../../style/store.module.scss'
const ProductOrdered: FC = () => {

    interface QuantityItem {
        id: number,
        amount: number,
        price: number
    }

    const [localStorageDataProducts, setLocalStorageDataProducts] = useState<any[]>([])
    const { productsArray, getProductsArray, $addProduct, $removeProduct, $updateCounter, shippingCost }:ServiceProductsContextProps = useContext(ProductsContext)
    const [quantityObjects, setQuantityObjects] = useState<QuantityItem[]>([])
    const [objectsID, setObjectsID] = useState<number[]>([])
    const [totalCost, setTotalCost] = useState<number>(0)
    const router = useRouter()

    const changeAmountHandler = (obj: any, index: number, action: 'increment' | 'decrement') => {
        setQuantityObjects(prevElements => {
            const updatedElemetns = prevElements.map((quantityElement, i) => {
                if (i === index) {
                    const newAmount = action === 'increment' ? quantityElement.amount + 1 : quantityElement.amount - 1
                    if (newAmount === 0) {
                        $removeProduct(obj, quantityElement.id)
                        return null
                    } else {
                        if (action === 'decrement' && quantityElement.amount > 0) {
                            $removeProduct(obj, quantityElement.id)
                        } else if (action === 'increment' && quantityElement.amount > 0) {
                            $addProduct(obj, index)
                        }
    
                        return {
                            ...quantityElement,
                            amount: newAmount
                        }
                    }
                }
    
                return quantityElement
            })
            const filterdElemetns = updatedElemetns.filter(el => el !== null) as QuantityItem[]
            return filterdElemetns
        })
    }
    
    
    const removeProducts = (obj: object, id: number) => {
        $updateCounter(obj, id)
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
    }, [getProductsArray, localStorageDataProducts])

    let products = localStorageDataProducts.map((el, index) => (
        <tr key={`${index}`} className={`${style.borderBottom}`}>
            <th scope="row" className={`${style.td}`}>    
                <div className={`d-lg-flex align-items-lg-center ${style.product}`}>
                    <img className={`${style.imgProduct}`} src={el.imgurl} />
                    <p className={`${style.name}`}>{el.name}</p>
                </div>
            </th>
            <td className={`${style.td}`}>{el.price} $</td>
            <td className={`${style.td}`}>
                <button className={`${style.amountBtn}`} onClick={() => changeAmountHandler(el, index, 'decrement')}>-</button>
                    {quantityObjects[index] && el.id === quantityObjects[index].id && quantityObjects[index].amount}
                <button className={`${style.amountBtn}`} onClick={() => changeAmountHandler(el, index, 'increment')}>+</button>
            </td>
            <td className={`${style.td}`}>{quantityObjects[index] && Number((el.price * quantityObjects[index].amount).toFixed(2))} $</td>
            <td onClick={() => removeProducts(el, el.id)} className={`${style.td} ${style.remove}`}>x</td>
        </tr>
    ))

    return (
        <>
            { localStorageDataProducts
            ? 
            products
            : 
            null }      
            <tr className={`${style.orderSumContainer}`}>
                <td></td>
                <td></td>
                <td></td>
                <td className={`${style.text}`}>Subtotal:</td>
                <td className={`${style.cost}`}>{Number(totalCost).toFixed(2)} $</td>
            </tr>
            <tr className={`${style.orderSumContainer}`}>
                <td></td>
                <td></td>
                <td></td>
                <td className={`${style.borderBottom} ${style.text}`}>Shipping:</td>
                <td className={`${style.borderBottom} ${style.cost}`}>{Number(shippingCost).toFixed(2)} $</td>
            </tr>
            <tr className={`${style.orderSumContainer}`}>
                <td></td>
                <td></td>
                <td></td>
                <td className={`${style.text}`}>Total:</td>
                <td className={`${style.cost}`}>{Number(shippingCost + totalCost).toFixed(2)} $</td>
            </tr>
        </>
        
    )
}

export default ProductOrdered