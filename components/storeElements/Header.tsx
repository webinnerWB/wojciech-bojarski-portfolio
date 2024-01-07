import React, { FC } from "react";
import Link from "next/link";

import style from '../../style/store.module.scss'
export const Header: FC = () => {
    return(
        <>
            <nav className={`navbar navbar-expand-lg bg-body-tertiary ${style.customNavbarStyles}`}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/store">
                        <i className={`fa-solid fa-paw ${style.paw}`}></i>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className={`nav-link active ${style.navLink}`} aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${style.navLink}`} href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${style.navLink}`} href="#">Pricing</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}