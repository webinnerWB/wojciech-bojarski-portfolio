import React, {useEffect, useState, FC} from "react";
import OrderingForm from './OrderingForm'
import Methods from "../services/DB/Methods";
import NoAccount from './NoAccount'

import style from '../../style/store.module.scss'

const OrderingDetails: FC = () => {

    const { user } = Methods()

    const [createAccount, setCreateAccount] = useState<boolean>(false)

    const createAccountHandler = () => {
        setCreateAccount(prevState => !prevState)
        console.log(createAccount)
    }

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])
    
    return (
        <>
            {!user && !createAccount ? <NoAccount createAccountHandler={createAccountHandler}/> : <OrderingForm />}
        </>
    )
}

export default OrderingDetails