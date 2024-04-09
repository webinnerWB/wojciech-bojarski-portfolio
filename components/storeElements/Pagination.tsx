import React, { FC } from "react"
import Link from "next/link"
import style from '../../style/store.module.scss'
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
        <div className={style.paginationWrapper}>
            {pagesCount.map((num, i) => (
                <Link key={i} className={`${style.pagination} ${num === currentPage ? style.active : null}`} onClick={() => paginate(num)} href="#">
                    {num}
                </Link>
            ))}
        </div>
    )
}

export default Pagination