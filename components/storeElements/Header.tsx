import React, { FC, useState, ChangeEvent, useRef, useEffect, useContext } from "react"
import Methods from "../services/DB/Methods"
import { useRouter } from 'next/router'
import Link from "next/link"
import Script from 'next/script'
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'

import style from '../../style/store.module.scss'

type hederComponent = {
    handleSearchingValue: (e: ChangeEvent<HTMLInputElement>) => string|null,
    handleSearchResults: (value: string) => void,
}

export const Header: FC<hederComponent> = ({handleSearchingValue, handleSearchResults}: hederComponent) => {
    const currentPath = useRouter().pathname
    const [isSearchVisible, setIsSearchVisible] = useState(false) 
    const searchIntup = useRef<HTMLInputElement|null>(null)

    const { user, $logOut } = Methods()

    const toggleSearch = () => {
        setIsSearchVisible(prevState => !prevState)
    }

    useEffect(() => {
        const input = searchIntup.current
        if(input) {
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    handleSearchResults(input.value)
                    input.value = ''
                }
              })
        }
    }, [])

    const { getCounter }: ServiceProductsContextProps = useContext(ProductsContext)

    return(
        <>
            <nav className={`navbar navbar-expand-lg bg-body-tertiary ${style.customNavbarStyles}`}>
                <div className={`container-fluid ${style.container}`}>
                    <a className="navbar-brand" href="/store">
                        <i className={`fa-solid fa-paw ${style.paw}`}></i>
                    </a>
                    <button className={`navbar-toggler ${style.toggleMenu}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={`navbar-toggler-icon`}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${'/store' === currentPath ? style.active : style.navLink}`} href="/store">
                                    <span>STORE</span>
                                </Link>
                            </li>
                            {user && user.customer === false ?
                                <li className="nav-item">
                                    <Link className={`nav-link ${ '/store/categories' === currentPath ? style.active : style.navLink }`} href="/store/categories">
                                        <span>CATEGORIES</span>
                                    </Link>
                                </li>
                            : null }
                            {user && user.customer === false ?
                                <li className="nav-item">
                                    <Link className={`nav-link ${ '/store/products' === currentPath ? style.active : style.navLink }`} href="/store/products">
                                        <span>PRODUCTS</span>
                                    </Link>
                                </li>
                            : null }
                            {user && user.customer ? 
                                <li className="nav-item">
                                    <Link className={`nav-link ${ '/store/orders' === currentPath ? style.active : style.navLink }`} href="/store/orders">
                                        <span>Orders</span>
                                    </Link>
                                </li>
                            : null}
                        </ul>
                        <div className={`${style.iconWrapper}`}>
                            <input 
                                className={`${style.inputSearch} ${style.animationInput}  ${isSearchVisible ? style.inputVisible : ''}`} 
                                placeholder="Search for products" 
                                onChange={handleSearchingValue}
                                ref={searchIntup}
                                />
                            <i className={`fa-solid fa-magnifying-glass ${style.ico} ${isSearchVisible ? style.activeSearch : ''}`} onClick={toggleSearch}></i>
                            <Link  href="/store/order">
                                <div className={`${style.shoppingWraper}`}>
                                    <i className={`fa-solid fa-cart-shopping ${style.ico} ${user ? style.m0 : ''}`}></i>
                                    <span className={`${style.counter}`}>{getCounter.length}</span> 
                                </div>
                            </Link>
                            {!user ? 
                                <Link className={`${style.ico}`} href="/store/login">
                                    <i className={`fa-solid fa-user`}></i>
                                </Link>
                            : null}
                            {!user ? 
                                <Link className={`${style.ico}`} href="/store/registration">
                                    <i className={`fa-solid fa-user-pen`}></i>
                                </Link>
                            : null}
                            {user ? 
                                <Link className={`${style.ico} ${style.logOut}`} href="#" onClick={$logOut}>
                                    <i className={`fa-solid fa-arrow-right-from-bracket`}></i>
                                </Link>
                            : null}
                        </div>
                    </div>
                </div>
            </nav>
            <Script src="https://kit.fontawesome.com/fced0552ee.js" crossOrigin="anonymous" />
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous" />
        </>
    )
}