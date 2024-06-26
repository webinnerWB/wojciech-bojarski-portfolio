import React, { useEffect, FC } from "react"
import { Header } from '../../components/storeElements/Header'
import Methods from '../../components/services/DB/Methods'

const Blog: FC = () => {
    const { $handleSearchingValue, $handleSearchResults, searchResults, searchingValue} = Methods()

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

export default Blog
