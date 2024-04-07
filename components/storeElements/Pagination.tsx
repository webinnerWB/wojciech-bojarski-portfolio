import React, { FC } from "react"

type Pagination = {
    itemsPerPage: number
    tootalOrders: number
    paginate: (num: number) => void
    currentPage: number
}

const Pagination: FC<Pagination> = ({ itemsPerPage, tootalOrders, paginate, currentPage }: Pagination) => {
    let pagesCount = []
    for(let i = 1; i <= Math.ceil( tootalOrders / itemsPerPage ); i++) {
        pagesCount.push(i)
    }
    return (
        <>
            {pagesCount.map(num => (
                <a onClick={() => paginate(num)} href="#">
                    {num}
                </a>
            ))}
        </>
    )
}

export default Pagination