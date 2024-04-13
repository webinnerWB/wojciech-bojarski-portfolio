import React, {useEffect, FC} from "react"
import Link from "next/link"

import style from '../../style/store.module.scss'

type ErrorPaiment = {
    status: string,
}

const ErrorPaiment: FC<ErrorPaiment> = ({ status }: ErrorPaiment) => {
    
    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])
    
    return (
      <div className={style.paymentInfoWrapper}>
        <div className={style.info}>
            <h1>Payment status: {status}</h1><br/>
            <h2>Paymant failed</h2><br/>
            <Link href='/store'>
                <button className={`${style.defaultBtn} ${style.payment}`}>Back to shop</button>
            </Link>
        </div>
      </div>
    )
}

export default ErrorPaiment







