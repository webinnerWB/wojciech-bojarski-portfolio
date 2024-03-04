import React, { useState, useEffect, useContext, FC } from "react"
import { User } from 'firebase/auth'
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'
import ProductOrdered from '../../components/storeElements/ProductOrdered'
import { Header } from '../../components/storeElements/Header'
import Link from "next/link"
import Methods from "@/components/services/DB/Methods"
import SearchResults from "@/components/storeElements/SearchResults"

import style from '../../style/store.module.scss'

const OrderPage: FC = () => {
    interface RecipientData {
        name: string,
        surname: string,
        email: string,
        password: string,
        street: string,
        houseNumber: string,
        city: string,
        postalCode: string,
        country: string,
        customer: boolean
    }
    const { getProductsArray }: ServiceProductsContextProps = useContext(ProductsContext)
    const { searchingValue, searchResults, valuesArray, user, $handleSearchingValue, $handleSearchResults, $isUserLogged } = Methods()
    const [recipientData, setRecipientData] = useState<RecipientData>()

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
        $isUserLogged().then(logged => {
            if(logged) {
                console.log(`useruser: `, user)
            }else{
                console.log(`useruser: null: `)
            }
        })
    }, [])
    return (
        <div className="col-lg-12">
            <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults}/>
            {getProductsArray.length > 0 ?
            <div className="row d-lg-flex">
                <div className="col-lg-7">
                    <div className={`${style.orderWrapper}`}>
                        <div className={`table-responsive ${style.tableWrapper}`}>
                            <h1 className={`${style.title}`}>Shopping cart</h1>
                            <table className={`${style.tableCustom}`}>
                                <thead>
                                    <tr className={`${style.borderBottom}`}>
                                        <th className={`${style.th}`} scope="col" >Products</th>
                                        <th className={`${style.th} text-center`} scope="col">Price</th>
                                        <th className={`${style.th} text-center`} scope="col">Quantity</th>
                                        <th className={`${style.th} ${style.price} text-center`} scope="col">Total price for product</th>
                                    </tr>
                                </thead>
                                <tbody className={`${style.productList}`}>
                                    <ProductOrdered />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className={`${style.formOrderWrapper}`}>
                        <h2 className={`${style.title}`}>Recipient's data</h2>
                    </div>
                </div>
            </div>
            :
            <div className={`${style.orderWrapper}`}>
                <div className={`table-responsive ${style.tableWrapper} text-center`}>
                    <h1 className={`${style.title}`}>Shopping cart is empty</h1>
                    <Link href='/store'>
                        <button className={`${style.backBtn}`}>Back to shop</button>
                    </Link>
                </div>
            </div> }
            <SearchResults valueSearch={searchingValue} results={searchResults} valuesArray={valuesArray}/>
        </div>
    )
}

export default OrderPage