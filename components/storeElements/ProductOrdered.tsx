import React, { useState, useEffect, FC } from "react";

type productComponent = {
    product: any,
}


const ProductOrdered: FC<productComponent> = ({ product }: productComponent) => {
    return (
        <tr>
            <th scope="row">
                <div className="d-lg-flex">
                    <img src={product.imgurl} />
                    <p>{product.name}</p>
                </div>
            </th>
            <td>{product.price}</td>
        </tr>
    )
}

export default ProductOrdered