import React, { useState, useEffect, FC } from "react"
import Methods from "@/components/services/DB/Methods"

import SucessPaiment from '../../components/storeElements/SuccessPaiment'

const Payment: FC = () => {
    const [payment, setPayment] = useState<boolean>(false)
    const [dataReq, setDataReq] = useState<any>()
    const [dataReqProducts, setDataReqProducts] = useState<any>()

    const { $updateFieldInDocument, $getFieldValue } = Methods()

    useEffect(() => {
        const orderID = localStorage.getItem('orderIdPayu')
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
        getNotifyPayu(baseUrl)
        retrieveAnOrder()
        if(orderID){
            $getFieldValue('order', orderID, 'orderId')
                .then((ob) => {
                        setDataReqProducts(ob)
                })
        }
    }, [])

    useEffect(() => {
        console.log(`dataReqProducts: `, dataReqProducts)
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
                if(data.status.statusCode === 'SUCCESS') {
                    setDataReq(data)
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
            {dataReq && dataReqProducts && <SucessPaiment orderId={dataReq.orders[0].orderId} amount={dataReq.orders[0].payMethod.amount} products={dataReqProducts.products} status={dataReq.orders[0].status} />}
        </div>
    )
}

export default Payment
