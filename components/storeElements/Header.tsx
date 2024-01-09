import React, { FC, useState } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";

import style from '../../style/store.module.scss'
export const Header: FC = () => {
    const currentPath = useRouter().pathname
    const [isSearchVisible, setIsSearchVisible] = useState(false); 

    const toggleSearch = () => {
        setIsSearchVisible(prevState => !prevState);
    };

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
                                    <span>HOME</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${ '/store/categories' === currentPath ? style.active : style.navLink }`} href="/store/categories">
                                    <span>CATEGORIES</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${ '/store/blog' === currentPath ? style.active : style.navLink }`} href="/store/blog">
                                    <span>BLOG</span>
                                </Link>
                            </li>
                        </ul>
                        <div className={`${style.iconWrapper}`}>
                            <input className={`${style.inputSearch} ${style.animationInput}  ${isSearchVisible ? style.inputVisible : ''}`} placeholder="Search for products"/>
                            <i className={`fa-solid fa-magnifying-glass ${style.ico} ${isSearchVisible ? style.activeSearch : ''}`} onClick={toggleSearch}></i>
                            <i className={`fa-solid fa-cart-shopping ${style.ico}`}></i>
                            <i className={`fa-solid fa-user ${style.ico}`}></i>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}