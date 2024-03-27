import React, { useState, useEffect, FC } from "react"

const Payment: FC = () => {
    const [payment, setPayment] = useState<boolean>(false)
    const [orderID, setOrderID] = useState<string | null>()

    const getOrderID =  () => {
        if(localStorage.getItem('orderIdPayu')) {
            setOrderID(localStorage.getItem('orderIdPayu'))
        }

    }
    useEffect(() => {
        getOrderID()
        const baseUrl = `${window.location.protocol}//${window.location.host}`;
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
        console.log(`baseUrl: `, baseUrl)
        console.log(`orderID: `, orderID)
        getNotifyPayu(baseUrl)
    }, [])



    const $generationAccessToken = async() => {
        try {
            const response = await fetch(`${window.location.protocol}//${window.location.host}/api/payuToken`, {
              method: 'POST',
            })
        
            const data = await response.json()
            console.log('TOKEN: ', data.access_token)
            return data.access_token
          } catch (err) {
            console.error('Error: ', err)
          }
    }
    const getOrderStatus = async (baseUrl: string) => {
        try {
            const response = await fetch(`${baseUrl}/api/payuGetOrderStatus`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${$generationAccessToken}`
                }
            })

        } catch(err){
            console.error(`Error: `, err)
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
        <>
            {payment ? `SUCCESS : ${orderID}` : 'FALSE'}
        </>
    )
}

export default Payment
