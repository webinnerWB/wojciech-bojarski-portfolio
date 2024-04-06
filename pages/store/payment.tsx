import React, { useState, useEffect, useContext, FC } from "react"
import Methods from "@/components/services/DB/Methods"
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'

import SucessPaiment from '../../components/storeElements/SuccessPaiment'
import ErrorPaiment from '../../components/storeElements/ErrorPaiment'

const Payment: FC = () => {
    const [payment, setPayment] = useState<boolean>(false)
    const [dataReq, setDataReq] = useState<any>()
    const [dataReqProducts, setDataReqProducts] = useState<any>()

    const { $updateFieldInDocument, $getDocByFieldValue } = Methods()

    const { $clearAfterPayment }:ServiceProductsContextProps = useContext(ProductsContext)

    const clearCartShop = () => {
        Object.keys(localStorage).map(el => {
            localStorage.removeItem(el)
        })
        $clearAfterPayment()
    }

    useEffect(() => {
        const orderID = localStorage.getItem('orderIdPayu')
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
        getNotifyPayu(baseUrl)
        retrieveAnOrder()
        if(orderID){
            $getDocByFieldValue('order', orderID, 'orderId')
                .then((ob) => {
                        setDataReqProducts(ob)
                })
        }
    }, [])

    useEffect(() => {
        console.log(`dataReqProducts: `, dataReqProducts)
        clearCartShop()
    }, [dataReqProducts])

    const retrieveAnOrder = async () => {
        const orderID = localStorage.getItem('orderIdPayu')
        if(orderID){
            try {
                const response = await fetch(`${window.location.protocol}//${window.location.host}/api/retrieveAnOrder?orderId=${orderID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const data = await response.json()
                if(data){
                    setDataReq(data)
                }
                if(data.status.statusCode === 'SUCCESS') {
                    $updateFieldInDocument('order', 'orderId', `${orderID}`, `Paid`, 'status')
                    console.log(`data123131321: `, data)
                }else {
                    console.error(`Error: `, data)
                }

            } catch(err){
                console.error(`Error: `, err)
            }
        }
    }

    const getNotifyPayu = async (baseUrl: string) => {
        try {
            const response = await fetch(`${baseUrl}/api/payuGetOrderStatus`, {
                method: 'POST',
            })
            if(response.ok) {
                setPayment(true)
            }else{
                setPayment(false)
            }
        } catch(err){
            console.error(`Error: `, err)
        }
    }



    return(
        <div className="col-lg-12">
            {dataReqProducts && dataReq 
            ? <SucessPaiment amount={dataReq.orders[0].payMethod.amount} products={dataReqProducts.products} status={dataReq.orders[0].status} /> 
            : <ErrorPaiment status={dataReq && dataReq.status.statusCode} />}
        </div>
    )
}

export default Payment
