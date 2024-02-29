import React, { useState, useEffect, useContext, FC } from "react";
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'
import ProductOrdered from '../../components/storeElements/ProductOrdered'
import { Header } from '../../components/storeElements/Header'

import style from '../../style/store.module.scss'
import Methods from "@/components/services/DB/Methods";
import SearchResults from "@/components/storeElements/SearchResults";

const OrderPage: FC = () => {
    const { productsArray }: ServiceProductsContextProps = useContext(ProductsContext)
    const { searchingValue, searchResults, valuesArray, $handleSearchingValue, $handleSearchResults } = Methods()
    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])
    return (
        <>
            <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults}/>
            <div className={`${style.orderWrapper} d-lg-flex`}>
                <div>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Products</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total Price</th>
                            </tr>
                        </thead>
                        <tbody className={`${style.productList}`}>
                            <ProductOrdered />
                        </tbody>
                    </table>
                </div>
            </div>
            <SearchResults valueSearch={searchingValue} results={searchResults} valuesArray={valuesArray}/>
        </>
    )
}

export default OrderPage