import React, { useState, useEffect, useContext, FC } from "react";
import { ServiceProductsContextProps, ProductsContext } from '../../components/services/store/ProductsContextProvider'
import ProductOrdered from '../../components/storeElements/ProductOrdered'

import style from '../../style/store.module.scss'

const OrderPage: FC = () => {
    const { productsArray }: ServiceProductsContextProps = useContext(ProductsContext)
    const [ stateProductsArray, setStateProductsArray ] = useState<object[]>([])
    useEffect(() => {
        const storageData = localStorage.lo
    }, [productsArray])
    const product = stateProductsArray.map(el => (
        <ProductOrdered product={el}/>
    ))

    return (
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
                    <tbody>
                       {product}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderPage