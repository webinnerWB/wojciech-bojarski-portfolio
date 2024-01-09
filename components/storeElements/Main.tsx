import React, {FC} from "react"

import style from '../../style/store.module.scss'

const Main: FC = () => {
    return(
        <div>
            <div className={`${style.mainWrapper}`}>
                <h1 className={`${style.title}`}>Find the perfect product with petishop</h1>
                <div className={`${style.searchMainWrapper}`}>
                    <input className={`${style.inputSearch} ${style.inputSearchMain}`} placeholder="Search for products"/>
                    <i className={`fa-solid fa-magnifying-glass ${style.iconSearchMain}`}></i>
                    <button className={`${style.searchBtn}`}>Search</button>
                </div>
            </div>
        </div>
    )
}
export default Main