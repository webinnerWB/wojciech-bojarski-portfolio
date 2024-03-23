import React, {useEffect, useState, useContext, FC, useRef, FormEvent, ChangeEvent} from "react"
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'

import style from '../../style/store.module.scss'
import Methods from "../services/DB/Methods"

interface RecipientData {
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
    const { orderingProducts, totalCostContext }:ServiceProductsContextProps = useContext(ProductsContext)
    const [recipientData, setRecipientData] = useState<RecipientData>({
        name: '',
        surname: '',
        email: '',
        street: '',
        houseNumber: '',
        city: '',
        postalCode: '',
        country: ''
    })
    const [formSubmit, setFormSubmit] = useState<boolean>(false)
    const [formCompletedError, setFormCompletedError] = useState<boolean>(false)
    
    const { user } = Methods()

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

    // const subbmitRegistration = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     setFormSubmit(true)
    //     setFormCompletedError(false)
    // }

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
        if(user){
            const { name, surname, email, street, houseNumber, city, postalCode, country } = user as unknown as RecipientData
            setRecipientData({
                name,
                surname,
                email,
                street,
                houseNumber,
                city,
                postalCode,
                country,
            })
            console.log(`recispienstwsDastsa2: `, recipientData)
            
        }
    }, [user])

    const handleSubmitPayment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            try {
                const response = await fetch('http://localhost:3000/api/payuOrder', {
                    method: 'POST'
                })
                console.log(`dataPAYu: `, response.status)
                const data = await response.json()
                console.log(`dataPAYu: `, data)
            } catch(err) {
                console.error(`Error: `, err)
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
                                    ${formSubmit && formCompletedError && recipientData.name === '' ? style.inputError : null}`} 
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
                                    ${formSubmit && formCompletedError && recipientData.surname === '' ? style.inputError : null}`} 
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
                                    ${formSubmit && formCompletedError && recipientData.email === '' ? style.inputError : null}`} 
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
                                    ${formSubmit && formCompletedError && recipientData.street === '' ? style.inputError : null}`} 
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
                                    ${formSubmit && formCompletedError && recipientData.city === '' ? style.inputError : null}`} 
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
                                    ${formSubmit && formCompletedError && recipientData.houseNumber === '' ? style.inputError : null}`} 
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
                                    ${formSubmit && formCompletedError && recipientData.postalCode === '' ? style.inputError : null}`} 
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
                                    ${formSubmit && formCompletedError && recipientData.country === '' ? style.inputError : null}`} 
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