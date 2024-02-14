import React, { ChangeEvent, FormEvent, useEffect, useState, FC } from "react";
import Methods from '../../components/services/DB/Methods'
import { Header } from '../../components/storeElements/Header'

import style from '../../style/store.module.scss';

// type registrationForm = {
//     name: string,
//     surname: string,
//     email: string,
//     password: string,
//     street: string,
//     houseNumber: string,
//     city: string,
//     postalCode: string,
//     country: string,
//     customer: boolean
// }

const Registration: FC = () => {
    const { $handleSearchingValue, $handleSearchResults, searchResults, searchingValue} = Methods()

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setRegistrationFormData({
            ...registrationFormData,
            [name]: value
        })
    }

    const isFormValid = () => {
        const emptyFields = [];
    
        for (const key in registrationFormData) {
            if (registrationFormData[key] === '') {
                emptyFields.push(key);
            }
        }
    
        if (emptyFields.length === 0) {
            return true;
        } else {
            console.error("Empty fields: ", emptyFields.join(', '));
            return false;
        }
    }

    const subbmitRegistration = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(isFormValid()) {
            console.log(`Wszystko gitara`, registrationFormData)
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])

    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])

    return (
        <>
            <div className="col-lg-12">
                <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
                <h1 className={`${style.titleCategories}`}>Create account</h1>
                <div className={`${style.formWrapper}`}>
                    <form onSubmit={subbmitRegistration}>
                        <div className={`row ${style.formInputWrapper}`}>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input}`} 
                                    placeholder="Name" 
                                    name="name" 
                                    value={registrationFormData.name}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input}`} 
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
                                    className={`form-control ${style.input}`} 
                                    placeholder="Email" 
                                    name="email" 
                                    value={registrationFormData.email}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="password" 
                                    className={`form-control ${style.input}`} 
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
                                    className={`form-control ${style.input}`} 
                                    placeholder="Street" 
                                    name="street" 
                                    value={registrationFormData.street}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input}`} 
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
                                    className={`form-control ${style.input}`} 
                                    placeholder="House number" 
                                    name="houseNumber" 
                                    value={registrationFormData.houseNumber}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className={`col-lg-6`}>
                                <input 
                                    type="text" 
                                    className={`form-control ${style.input}`} 
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
                                    className={`form-control ${style.input}`} 
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