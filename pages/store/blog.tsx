import React, { useEffect, FC } from "react";
import { Header } from '../../components/storeElements/Header'
import Methods from '../../components/services/DB/Methods'

const blog: FC = () => {
    const { $handleSearchingValue, $handleSearchResults, searchResults, searchingValue} = Methods()

    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])

    return(
        <>
            <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
            blog
        </>
    )
}

export default blog
