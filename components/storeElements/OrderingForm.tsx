import React, {useEffect, useState, useContext, FC, useRef, FormEvent, ChangeEvent} from "react"
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'
import { useRouter } from "next/router"
import style from '../../style/store.module.scss'
import Methods from "../services/DB/Methods"

interface RecipientData {
    uuid: string,
    name: string,
    surname: string,
    email: string,
    street: string,
    houseNumber: string,
    city: string,
    postalCode: string,
    country: string,
    [key: string]: string | boolean
}

const OrderingForm: FC = () => {
const routing = useRouter()

    const { orderForPayu, totalCostContext, orderingProducts, shippingCost }:ServiceProductsContextProps = useContext(ProductsContext)
    const [recipientData, setRecipientData] = useState<RecipientData>({
        uuid: '-',
        name: '',
        surname: '',
        email: '',
        street: '',
        houseNumber: '',
        city: '',
        postalCode: '',
        country: ''
    })
    
    const [formCompletedError, setFormCompletedError] = useState<boolean>(false)

    const { user,  $addNewDocument } = Methods()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setRecipientData({
            ...recipientData,
            [name]: value
        })
    }


    const isFormValid = () => {

        for (const key in recipientData) {
            if (recipientData[key] === '') {
                setFormCompletedError(true)
                return false
            }
        }

        return true
    }

    const msgRef = useRef<HTMLSpanElement>(null) 


    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
        if(user){
            const { uuid, name, surname, email, street, houseNumber, city, postalCode, country } = user as unknown as RecipientData
            setRecipientData({
                uuid,
                name,
                surname,
                email,
                street,
                houseNumber,
                city,
                postalCode,
                country,
            })
        }
    }, [user])

    
    const handleSubmitPayment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isFormValid()) {

            const totalAmount = totalCostContext + (shippingCost*100)
            const products = orderForPayu
            if(totalCostContext && orderForPayu){
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payuOrder`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            totalAmount, products
                        })
                    })
                    const jsonResponse = await response.json()
                    localStorage.setItem('orderIdPayu', jsonResponse.data.orderId)
                    if(jsonResponse.data.status.statusCode === 'SUCCESS') {
                        if(user) {
                            const { uuid, email } = user
                            $addNewDocument('order', {
                                uuid,
                                email,
                                orderId: jsonResponse.data.orderId,
                                totalAmount,
                                products: [...orderingProducts],
                                status: 'pending payment'
                            }).then(() => {
                                if (jsonResponse.data.redirectUri) {
                                    routing.push(jsonResponse.data.redirectUri)
                                }
                            }).catch(err => {
                                console.error(`Error: `, err)
                            });
                        }else{
                            $addNewDocument('order', {
                                uuid: '-',
                                email: '-',
                                orderId: jsonResponse.data.orderId,
                                totalAmount,
                                products: [...orderingProducts],
                                status: 'pending payment'
                            }).then(() => {
                                if (jsonResponse.data.redirectUri) {
                                    routing.push(jsonResponse.data.redirectUri)
                                }
                            }).catch(err => {
                                console.error(`Error: `, err)
                            });
                        }
                    }
                } catch(err) {
                    console.error(`Error: `, err)
                }
            }
        }
    }
    
    return (
        <>
            <div className={`${style.formOrderWrapper}`}>
                <h2 className={`${style.title}`}>Recipient's data</h2>
                <span ref={msgRef} className={`${style.formMsg}`}></span>
                <div className={`${style.formWrapper}`}>
                    <form onSubmit={handleSubmitPayment}>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-6`}>
                                <label className={`${style.label}`} htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input} 
                                    ${formCompletedError && recipientData.name === '' ? style.inputError : null}`} 
                                    id="name"
                                    name="name" 
                                    value={recipientData.name}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className={`col-lg-6`}>
                                <label className={`${style.label}`} htmlFor="surname">Surname</label>
                                <input 
                                    type="text" 
                                    id="surname"
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formCompletedError && recipientData.surname === '' ? style.inputError : null}`} 
                                    name="surname" 
                                    value={recipientData.surname}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-12 mt-3`}>
                                <label className={`${style.label}`} htmlFor="email">Email</label>
                                <input 
                                    id="email"
                                    type="email" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formCompletedError && recipientData.email === '' ? style.inputError : null}`} 
                                    name="email" 
                                    value={recipientData.email}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-12 mt-3`}>
                                <label className={`${style.label}`} htmlFor="street">Street</label>
                                <input 
                                    id="street"
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formCompletedError && recipientData.street === '' ? style.inputError : null}`} 
                                    name="street" 
                                    value={recipientData.street}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-12 mt-3`}>
                                <label className={`${style.label}`} htmlFor="city">City</label>
                                <input 
                                    id="city"
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formCompletedError && recipientData.city === '' ? style.inputError : null}`} 
                                    name="city" 
                                    value={recipientData.city}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-12 mt-3`}>
                                <label className={`${style.label}`} htmlFor="houseNumber">House number</label>
                                <input 
                                    id="houseNumber"
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formCompletedError && recipientData.houseNumber === '' ? style.inputError : null}`} 
                                    name="houseNumber" 
                                    value={recipientData.houseNumber}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-12 mt-3`}>
                                <label className={`${style.label}`} htmlFor="postalCode">Postal Code</label>
                                <input 
                                    id="postalCode"
                                    placeholder="00-000"
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formCompletedError && recipientData.postalCode === '' ? style.inputError : null}`} 
                                    name="postalCode" 
                                    value={recipientData.postalCode}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-12 mt-3`}>
                                <label className={`${style.label}`} htmlFor="country">Country</label>
                                <input 
                                    type="text" 
                                    id="country"
                                    className={`form-control ${style.input} ${style.input} 
                                    ${ formCompletedError && recipientData.country === '' ? style.inputError : null}`} 
                                    name="country" 
                                    value={recipientData.country}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <button type="submit" className={`btn btn-light ${style.formButton}`} >Continue to Payment &#62;</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default OrderingForm