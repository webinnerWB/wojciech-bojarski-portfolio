import React, { useState, useEffect, useContext, FC } from "react"
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'

import style from '../../style/store.module.scss'
const ProductOrdered: FC = () => {

    interface Order {
        id: number,
        amount: number,
        price: number,
        name: string,
        imgurl: string
    }

    const { productsArray, shippingCost, $addProduct, $removeProduct, $removeProducts }:ServiceProductsContextProps = useContext(ProductsContext)
    const [order, setOrder] = useState<Order[]>([])
    const [totalCost, setTotatCost] = useState<number>(0)
    const [removeProduct, setRemoveProduct] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)

    const updateOrder = () =>  {
        setOrder([])
        Object.keys(localStorage).forEach(key => {
            const isNumberKey = Number(key)
            if (!isNaN(isNumberKey)) {
                const product = localStorage.getItem(key)
                if (product) {
                    const objectProduct = JSON.parse(product)
                    
                    setOrder(prev => {
                        const product = prev.findIndex(item => item.id === objectProduct.id)
                        if (product !== -1) {
                            const updatedProducts = [...prev]
                            updatedProducts[product] = {
                                ...updatedProducts[product],
                                amount: updatedProducts[product].amount + 1
                            };
                            return updatedProducts
                        } else {
                            return [...prev, {
                                id: objectProduct.id,
                                amount: 1,
                                price: objectProduct.price,
                                name: objectProduct.name,
                                imgurl: objectProduct.imgurl
                            }]
                        }
                    })
                }
            }
        })
    }

    const removeProducts = (obj: Order) => {
        $removeProducts(obj, obj.id)
        updateOrder()
    }


    const changeAmountHandler = (obj: Order,  action: 'increment' | 'decrement') => {
        setDisabledButton(true)
        if(action === 'increment') {
            setOrder(prev => {
                const product = prev.findIndex(el => el.id === obj.id)
                const updatedProducts = [...prev]
                if(product !== -1){
                    updatedProducts[product] = {
                        ...updatedProducts[product],
                        amount: updatedProducts[product].amount + 1
                    }
                }
                return updatedProducts
            })
            $addProduct(obj, obj.id)
        }else{
            setOrder(prev => {
                
                const product = prev.findIndex(el => el.id === obj.id)
                const updatedProducts = [...prev]
                if(product !== -1){
                    updatedProducts[product] = {
                        ...updatedProducts[product],
                        amount: updatedProducts[product].amount - 1
                    }
                }
                setRemoveProduct(false)
                if(updatedProducts[product].amount === 0){
                    setRemoveProduct(true)
                }
                return updatedProducts
            })
            $removeProduct(obj, obj.id)
            
        }
        setTimeout(() => {
            setDisabledButton(false)
        }, 300)
    }

    useEffect(() => {
        updateOrder()
    }, [])

    useEffect(() => {
        if(removeProduct){
            updateOrder()
        }
    }, [removeProduct])

    useEffect(() => {
        setTotatCost(0)
        order.map(product => {
            setTotatCost(prev => prev + (product.amount * product.price))
        })
    }, [order])

    useEffect(() => {
        const IDs: number[] = []
        Object.keys(localStorage).forEach(key => {
            const isNumberKey = Number(key)
            if(!isNaN(isNumberKey)) {
                const elementKey = localStorage.getItem(key)
                if(elementKey){
                    const product = JSON.parse(elementKey)
                    IDs.push(product.id)
                }
            }
        })
        order.forEach(el => {
            const indexFound = IDs.findIndex(i => i === el.id)

            if(indexFound !== -1) {
                updateOrder()                
            }
        })
    }, [productsArray])

  
    let products = order.map((el, index) => (
        <tr  key={`${el.id}-${index}`} className={`${style.borderBottom}`}>
            <th scope="row" className={`${style.td}`}>    
                <div className={`d-lg-flex align-items-lg-center ${style.product}`}>
                    <img className={`${style.imgProduct}`} src={el.imgurl} />
                    <p className={`${style.name}`}>{el.name}</p>
                </div>
            </th>
            <td className={`${style.td}`}>{el.price} $</td>
            <td className={`${style.td}`}>
                <button className={`${style.amountBtn}`} 
                onClick={() => changeAmountHandler(el, 'decrement')}
                disabled={disabledButton}
                >-</button>
                    {el.amount}
                <button className={`${style.amountBtn}`} 
                onClick={() => changeAmountHandler(el, 'increment')}
                disabled={disabledButton}
                >+</button>
            </td>
            <td className={`${style.td}`}>{Number(el.amount * el.price).toFixed(2)} $</td>
            <td 
            onClick={() => removeProducts(el)}
             className={`${style.td} ${style.remove}`}>x</td>
        </tr>
    ))

    return (
        <>
            { order
            ? 
            products
            : 
            null }      
            <tr className={`${style.orderSumContainer}`}>
                <td></td>
                <td></td>
                <td></td>
                <td className={`${style.text}`}>Subtotal:</td>
                <td className={`${style.cost}`}>
                {Number(totalCost).toFixed(2)} $</td>
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
                <td className={`${style.cost}`}>
                {Number(shippingCost + totalCost).toFixed(2)} $</td>
            </tr>
        </>
        
    )
}

export default ProductOrdered