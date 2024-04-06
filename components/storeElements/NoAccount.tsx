import React, {useEffect, useState, FC} from "react"
import Link from "next/link"

import style from '../../style/store.module.scss'

type NoAccountComponent = {
    createAccountHandler: () => void
}

const NoAccount: FC<NoAccountComponent> = ({ createAccountHandler }: NoAccountComponent) => {

    

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])
    
    return (
       <div className={`${style.selectAccountWrapper}`}>
            <div className="text-center">
                <h2 className={`${style.title}`}>Do you not have an account?</h2>
                <Link href='/store/registration'>
                    <button className={`${style.backBtn}`}>Sign in</button>
                </Link> 
            </div>
            <div className="text-center">
                <h2 className={`${style.title}`}>Continue without creating an account</h2>
                <button className={`${style.backBtn}`} onClick={createAccountHandler}>Continue</button>
            </div>
       </div>
    )
}

export default NoAccount







