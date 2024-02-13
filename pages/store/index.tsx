import React, { FC, useState, useEffect, ChangeEvent } from "react";
import Methods from '../../components/services/DB/Methods'
import { Header } from '../../components/storeElements/Header'
import Main from '../../components/storeElements/Main'
import Categories from '../../components/storeElements/Categories'
import SearchResults from '../../components/storeElements/SearchResults'
import Script from 'next/script'

import style from '../../style/store.module.scss';

const StoreMainPage: FC = () => {
    const search = Methods().$search
    const addNewDocu = Methods().$addNewDocu
    const [searchingValue, setSearchingValue] = useState<string>('')
    const [searchResults, setSearchRelusts] = useState<any>([])

    const handleSearchingValue = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setSearchingValue(e.target.value)
        return searchingValue
    }

    const handleSearchResults = async (value: string) => {
        try {
         const query = await search('products', value)
         setSearchRelusts(query?.docs.map(el => el.data()))
        }catch(err) {
            console.error(`Error: `, err)
        }
    }

    const add = () => {
        addNewDocu('products', {
            category: 'Cats',
            name: 'test dodania',
            price: 4,
            imgurl: 'URL'
        })
    }
    useEffect(() => {
        document.body.style.backgroundColor = '#161616';
        document.body.style.color = '#ffffff';
    }, []);

    useEffect(() => {
        console.log(searchResults)
    }, [searchResults]);

    return (
        <>
            <div className="col-lg-12">
                <Header handleSearchingValue={handleSearchingValue} handleSearchResults={handleSearchResults} />
                <Main handleSearchingValue={handleSearchingValue} handleSearchResults={handleSearchResults}/>
                <Categories />
                <SearchResults valueSearch={searchingValue} results={searchResults}/>
                <button onClick={add}>KLIK</button>
            </div>
            <Script src="https://kit.fontawesome.com/fced0552ee.js" crossOrigin="anonymous" />
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous" />
        </>
    );
};

export default StoreMainPage;
