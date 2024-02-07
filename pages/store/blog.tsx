import React, { useEffect, FC } from "react";
import { Header } from '../../components/storeElements/Header'

const blog: FC = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#161616';
        document.body.style.color = '#ffffff';
    }, []);
    return(
        <>
         <Header />
            blog
        </>
    )
}

export default blog