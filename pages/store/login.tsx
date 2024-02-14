import React, { useEffect, FC } from "react";
import Methods from '../../components/services/DB/Methods'
import { Header } from '../../components/storeElements/Header'

type registrationForm = {
    name: string,
    surname: string,
    email: string,
    password: string,
    street: string,
    houseNumber: string,
    City: string,
    postalCode: string,
    customer: boolean
}

const login: FC = () => {
    const { $handleSearchingValue, $handleSearchResults, searchResults, searchingValue} = Methods()

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])
    
    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])

    return (
        <>
            <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
        </>
    )
}

export default login