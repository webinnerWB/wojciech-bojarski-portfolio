import React, { ChangeEvent, FormEvent, useEffect, useState, useRef, FC } from "react"
import { useRouter } from "next/router"
import Methods from '../../components/services/DB/Methods'
import { Header } from '../../components/storeElements/Header'

import style from '../../style/store.module.scss'

const Registration: FC = () => {
    const { $handleSearchingValue, $handleSearchResults, $registrationUser, $isUserLogged, searchResults, searchingValue} = Methods()
    const [registrationFormData, setRegistrationFormData] = useState<any>({
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

    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])

    return (
        <>
            <div className="col-lg-12">
                <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
                <h1 className={`${style.titleCategories}`}>Create account</h1>
                <span ref={msgRef} className={`${style.formMsg}`}></span>
                <div className={`${style.formWrapper}`}>
                    <form onSubmit={subbmitRegistration}>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.name === '' ? style.inputError : null}`} 
                                    placeholder="Name" 
                                    name="name" 
                                    value={registrationFormData.name}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.surname === '' ? style.inputError : null}`} 
                                    placeholder="Surname" 
                                    name="surname" 
                                    value={registrationFormData.surname}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="email" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.email === '' ? style.inputError : null}`} 
                                    placeholder="Email" 
                                    name="email" 
                                    value={registrationFormData.email}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="password" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.password === '' ? style.inputError : null}`} 
                                    placeholder="Password" 
                                    name="password" 
                                    value={registrationFormData.password}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.street === '' ? style.inputError : null}`} 
                                    placeholder="Street" 
                                    name="street" 
                                    value={registrationFormData.street}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.city === '' ? style.inputError : null}`} 
                                    placeholder="City" 
                                    name="city" 
                                    value={registrationFormData.city}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.houseNumber === '' ? style.inputError : null}`} 
                                    placeholder="House number" 
                                    name="houseNumber" 
                                    value={registrationFormData.houseNumber}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.postalCode === '' ? style.inputError : null}`} 
                                    placeholder="Postal Code" 
                                    name="postalCode" 
                                    value={registrationFormData.postalCode}
                                    onChange={handleChange}
                                    />
                            </div>
                        </div>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input} ${style.input} 
                                    ${formSubmit && formCompletedError && registrationFormData.country === '' ? style.inputError : null}`} 
                                    placeholder="Country" 
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