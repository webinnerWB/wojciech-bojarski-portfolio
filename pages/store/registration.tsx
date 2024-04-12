import React, { ChangeEvent, FormEvent, useEffect, useState, useRef, FC } from "react"
import { useRouter } from "next/router"
import Methods from '../../components/services/DB/Methods'
import { Header } from '../../components/storeElements/Header'

import style from '../../style/store.module.scss'
interface UserData {
    name: string,
    surname: string,
    email: string,
    password: string,
    street: string,
    houseNumber: string,
    city: string,
    postalCode: string,
    country: string,
    customer: boolean,
    [key: string]: string | boolean
}
const Registration: FC = () => {
    const { $handleSearchingValue, $handleSearchResults, $registrationUser, $isUserLogged, searchResults } = Methods()
    const [registrationFormData, setRegistrationFormData] = useState<UserData>({
        name: '',
        surname: '',
        email: '',
        password: '',
        street: '',
        houseNumber: '',
        city: '',
        postalCode: '',
        country: '',
        customer: true
    })
    const [userLogged, setUserLogged] = useState<boolean>(false)
    const [formSubmit, setFormSubmit] = useState<boolean>(false)
    const [formCompletedError, setFormCompletedError] = useState<boolean>(false)
    const routing = useRouter()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setRegistrationFormData({
            ...registrationFormData,
            [name]: value
        })
    }


    const isFormValid = () => {

        for (const key in registrationFormData) {
            if (registrationFormData[key] === '') {
                setFormCompletedError(true)
                return false
            }
        }

        return true
    }

    const msgRef = useRef<HTMLSpanElement>(null) 

    const subbmitRegistration = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormSubmit(true)
        setFormCompletedError(false)
        if(isFormValid() && msgRef.current) {
            $registrationUser(registrationFormData, msgRef.current)
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
        $isUserLogged().then(isUserLoggedIn => {
            setUserLogged(isUserLoggedIn)
        }).catch( err => {
            setUserLogged(false)
            console.error(`ERROR: `, err)
        })
    }, [])

    useEffect(() => {
        if(userLogged) {
            routing.push('/store')
        }
    }, [userLogged])

    return (
        <>
            <div className="col-lg-12">
                <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
                <h1 className={`${style.titleCategories}`}>Create account</h1>
                <span ref={msgRef} className={`${style.formMsg}`}></span>
                <div className={`${style.formWrapper} ${style.registration}`}>
                    <form onSubmit={subbmitRegistration}>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-6`}>
                                <label className={`${style.label}`} htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    className={`form-control ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.name === '' ? style.inputError : null}`} 
                                    name="name" 
                                    value={registrationFormData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`col-lg-6`}>
                                <label className={`${style.label}`} htmlFor="surname">Surname</label>
                                <input 
                                    type="text" 
                                    id="surname"
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.surname === '' ? style.inputError : null}`} 
                                    name="surname" 
                                    value={registrationFormData.surname}
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
                                    ${formSubmit && formCompletedError && registrationFormData.email === '' ? style.inputError : null}`} 
                                    name="email" 
                                    value={registrationFormData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-12 mt-3`}>
                                <label className={`${style.label}`} htmlFor="password">Password</label>
                                <input 
                                    id="password"
                                    type="password" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.password === '' ? style.inputError : null}`} 
                                    name="password" 
                                    value={registrationFormData.password}
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
                                    ${formSubmit && formCompletedError && registrationFormData.street === '' ? style.inputError : null}`} 
                                    name="street" 
                                    value={registrationFormData.street}
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
                                    ${formSubmit && formCompletedError && registrationFormData.city === '' ? style.inputError : null}`} 
                                    name="city" 
                                    value={registrationFormData.city}
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
                                    ${formSubmit && formCompletedError && registrationFormData.houseNumber === '' ? style.inputError : null}`} 
                                    name="houseNumber" 
                                    value={registrationFormData.houseNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-12 mt-3`}>
                                <label className={`${style.label}`} htmlFor="postalCode">Postal Code</label>
                                <input 
                                    id="postalCode"
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.postalCode === '' ? style.inputError : null}`} 
                                    name="postalCode" 
                                    placeholder="00-000"
                                    value={registrationFormData.postalCode}
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
                                    ${formSubmit && formCompletedError && registrationFormData.country === '' ? style.inputError : null}`} 
                                    name="country" 
                                    value={registrationFormData.country}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className={`btn btn-light ${style.formButton}`}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Registration