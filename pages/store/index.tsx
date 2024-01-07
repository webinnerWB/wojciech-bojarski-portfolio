import React, { FC, useState, useEffect } from "react";
import Methods from '../../components/services/DB/Methods'
import { Header } from '../../components/storeElements/Header'

import style from '../../style/store.module.scss';

const StoreMainPage: FC = () => {


    const [prodDocuments, setProdDocuments] = useState<any>([])

    const getAllDocuments = Methods().$getAllDocuments

    const loadData = async () => {
        try {
            const myDocs = await getAllDocuments('products')
            setProdDocuments(myDocs.docs.map(doc => doc.data()))
        } catch (error) {
            console.error('Error while loading documents:', error)
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = '#161616';
        document.body.style.color = '#ffffff';
        loadData()
    }, []);

    useEffect(() => {
        console.log(prodDocuments)
    }, [prodDocuments]);

    return (
        <>
            <Header />
        </>
    );
};

export default StoreMainPage;
