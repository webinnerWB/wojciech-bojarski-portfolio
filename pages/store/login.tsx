import React, { useEffect, FC, useState, useRef, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/router"
import Methods from '../../components/services/DB/Methods'
import { Header } from '../../components/storeElements/Header'

import style from '../../style/store.module.scss'
interface UserData {
    email: string,
    password: string,
}
const Login: FC = () => {
    const { $handleSearchingValue, $handleSearchResults, $loginUser, $isUserLogged, searchResults, searchingValue} = Methods()
    const msgRef = useRef<HTMLSpanElement>(null) 
    const [userCredential, setUserCredential] = useState<UserData>({
        email: '',
        password: ''
    })
    const [userLogged, setUserLogged] = useState<boolean>(false)
    const [formSubmit, setFormSubmit] = useState<boolean>(false)
    const routing = useRouter()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserCredential({
            ...userCredential,
            [name]: value
        })
    }

    const subbmitLoggin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormSubmit(true)
        if(msgRef.current){
            $loginUser(userCredential, msgRef.current)
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
                <h1 className={`${style.titleCategories}`}>Sign in</h1>
                <span ref={msgRef} className={`${style.formMsg}`}></span>
                <div className={`${style.formWrapper} ${style.login}`}>
                <form onSubmit={subbmitLoggin}>
                    <div className={`row ${style.formInputWrapper}`}>
                        <div className={`col-lg-12`}>
                            <label className={`${style.label}`} htmlFor="email">Email</label>
                            <input 
                                id="email"
                                type="email" 
                                className={`form-control ${style.input} ${style.login}
                                ${formSubmit && userCredential.email === '' ? style.inputError : null}`} 
                                name="email" 
                                value={userCredential.email}
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
                                className={`form-control ${style.input} ${style.login}
                                ${formSubmit && userCredential.password === '' ? style.inputError : null}`} 
                                name="password" 
                                value={userCredential.password}
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

export default Login