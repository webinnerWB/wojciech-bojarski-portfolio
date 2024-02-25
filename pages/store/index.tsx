import React, { FC, useState, useEffect, ChangeEvent } from "react";
import Methods from '../../components/services/DB/Methods'
import { Header } from '../../components/storeElements/Header'
import Main from '../../components/storeElements/Main'
import Categories from '../../components/storeElements/Categories'
import SearchResults from '../../components/storeElements/SearchResults'

import style from '../../style/store.module.scss';

const StoreMainPage: FC = () => {
    const addNewDocu = Methods().$addNewDocument
    const { $handleSearchingValue, $handleSearchResults, 
        $isUserLogged, $handleFilterCategory, 
        searchResults, searchingValue, valuesArray} = Methods()


    const add = () => {
        addNewDocu('products', {
            category: 'Cats',
            name: 'test dodania',
            price: 4,
            imgurl: 'URL'
        })
    }
    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
        $isUserLogged()
    }, [])

    // useEffect(() => {
    //     console.log(searchResults)
    //     console.log(searchingValue)
    // }, [searchResults])

    return (
        <>
            <div className="col-lg-12">
                <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
                <Main handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults}/>
                <Categories handleSearchResults={$handleFilterCategory} valuesArray={valuesArray}/>
                <SearchResults valueSearch={searchingValue} results={searchResults} valuesArray={valuesArray}/>
                <button onClick={add}>KLIK</button>
            </div>
        </>
    );
};

export default StoreMainPage;
