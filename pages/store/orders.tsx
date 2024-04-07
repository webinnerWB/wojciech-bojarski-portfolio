import React, { useEffect, useState, useContext, FC, ReactNode } from "react"
import { Header } from '../../components/storeElements/Header'
import SearchResults from '../../components/storeElements/SearchResults'
import Pagination from '../../components/storeElements/Pagination'
import Methods from '../../components/services/DB/Methods'

import style from '../../style/store.module.scss'
import OrderPage from "./order"

type Product = {
    length: number | undefined
    map(arg0: (product: Product, productIndex: number) => React.JSX.Element): React.ReactNode
    imgUrl: string,
    name: string,
    quantity: number,
    unitPrice: number,
}
type Order = {
    orderId: ReactNode,
    totalAmount: string,
    imgUrl: string,
    name: string,
    quantity: number,
    unitPrice: number,
    products: Product    
}

const Orders: FC = () => {
    
    const { $handleSearchingValue, $handleSearchResults, $getDocsByFieldValue, searchResults, searchingValue, valuesArray, user } = Methods()

    const [orders, setOrders] = useState<Order[]>([])
    const [itemsPerPage, setItemsPerPage] = useState<number>(5)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const lastOrderIndex = currentPage * itemsPerPage
    const firstOrderIndex = lastOrderIndex - itemsPerPage
    const currentOrders = orders.slice(firstOrderIndex, lastOrderIndex) 

    const paginate = (num: number) => setCurrentPage(num)

    const listOrders = currentOrders.map((order: Order, index: number) => (
        <React.Fragment key={`${index}`}>
            {order.products.map((product: Product, productIndex: number) => (
                <tr key={`${index}-${productIndex}`} className={`${style.borderBottom}`}>
                    {productIndex === 0 && (
                        <td rowSpan={order.products.length} className={`${style.td}`}>Order ID: {order.orderId}</td>
                    )}
                    <th scope="row" className={`${style.td}`}>    
                        <div className={`d-lg-flex align-items-lg-center ${style.product}`}>
                            <img className={`${style.imgProduct}`} src={product.imgUrl} alt={product.name} />
                            <p className={`${style.name}`}>{product.name}</p>
                        </div>
                    </th>
                    <td className={`${style.td}`}>{product.unitPrice} PLN</td>
                    <td className={`${style.td}`}>{product.quantity}</td>
                    <td className={`${style.td}`}>{Number(product.quantity * product.unitPrice).toFixed(2)} PLN</td>
                </tr>
            ))}
        </React.Fragment>
    ));


    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])

    useEffect(() => {
        if(user){
            $getDocsByFieldValue('order', user.uuid, 'uuid')
                .then((docs: any) => {
                    return setOrders(docs)
                })
        }
    }, [user])

    useEffect(() => {
        console.log(`orders: `, orders)

    }, [orders])

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
                                        <th className={`${style.th}`} scope="col" >Order ID</th>
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
                    <Pagination 
                        itemsPerPage={itemsPerPage}
                        tootalOrders={orders.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            </div>
            <SearchResults valueSearch={searchingValue} results={searchResults} valuesArray={valuesArray}/>
        </div>
    )
}

export default Orders