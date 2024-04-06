import React, { useEffect, useState, useContext, FC, ReactNode } from "react"
import { Header } from '../../components/storeElements/Header'
import SearchResults from '../../components/storeElements/SearchResults'
import Methods from '../../components/services/DB/Methods'

import style from '../../style/store.module.scss'

type Product = {
    imgUrl: string,
    name: string,
    quantity: number,
    unitPrice: number,
}
type Order = {
    orderId: ReactNode,
    totalAmount: string,
    products: Product    
}

const Orders: FC = () => {
    
    const { $handleSearchingValue, $handleSearchResults, $getDocsByFieldValue, searchResults, searchingValue, valuesArray, user } = Methods()

    const [orders, setOrders] = useState<Order[]>([])

    

    let listOrders = orders.map((el, index) => (
        <tr  key={`${index}`} className={`${style.borderBottom}`}>
            <th scope="row" className={`${style.td}`}>    
                <div className={`d-lg-flex align-items-lg-center ${style.product}`}>
                    <img className={`${style.imgProduct}`} src={el.products.imgUrl} />
                    <p className={`${style.name}`}>{el.products.name}</p>
                </div>
            </th>
            <td className={`${style.td}`}>{el.products.unitPrice} PLN</td>
            <td className={`${style.td}`}>{el.products.quantity}</td>
            <td className={`${style.td}`}>{Number(el.products.quantity * el.products.unitPrice).toFixed(2)} PLN</td>
        </tr>
    ))

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
        if(user){
            $getDocsByFieldValue('order', user.uuid, 'uuid')
                .then((x: any) => {
                    return setOrders(x)
                })
        }
    }, [])

    return (
        <div className="col-lg-12">
            <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
            <div className="row">
                <div className="col-lg-12">
                    <div className={`${style.orderWrapper}`}>
                        <div className={`table-responsive ${style.tableWrapper}`}>
                            <h1 className={`${style.title}`}>Your orders:</h1>
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
                                    {listOrders}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
            <SearchResults valueSearch={searchingValue} results={searchResults} valuesArray={valuesArray}/>
        </div>
    )
}

export default Orders