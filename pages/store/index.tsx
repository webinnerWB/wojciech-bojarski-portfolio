import React, { FC, useState, useEffect, ChangeEvent } from "react"
import Methods from '../../components/services/DB/Methods'
import { Header } from '../../components/storeElements/Header'
import Main from '../../components/storeElements/Main'
import Categories from '../../components/storeElements/Categories'
import SearchResults from '../../components/storeElements/SearchResults'

const StoreMainPage: FC = () => {
    const { $handleSearchingValue, $handleSearchResults, 
            $handleFilterCategory, searchResults, 
            searchingValue, valuesArray} = Methods()

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])

    return (
        <>
            <div className="col-lg-12">
                <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
                <Main handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults}/>
                <Categories handleSearchResults={$handleFilterCategory} valuesArray={valuesArray}/>
                <SearchResults valueSearch={searchingValue} results={searchResults} valuesArray={valuesArray}/>
            </div>
        </>
    )
}

export default StoreMainPage
