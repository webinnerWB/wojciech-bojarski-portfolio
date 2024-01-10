import React, {FC} from "react"

import style from '../../style/store.module.scss'

const Main: FC = () => {
    return(
        <div className={`${style.wrapper}`}>
            <img className={`${style.digi}`} src="/web_store/digital.png" />
            <div className={`${style.mainWrapper}`}>
                <h1 className={`${style.title}`}>Find the perfect product with petishop</h1>
                <div className={`${style.searchMainWrapper}`}>
                    <input className={`${style.inputSearch} ${style.inputSearchMain}`} placeholder="Search for products"/>
                    <i className={`fa-solid fa-magnifying-glass ${style.iconSearchMain}`}></i>
                    <button className={`${style.searchBtn}`}>Search</button>
                </div>
            </div>
            <img className={`${style.digi} ${style.secPosition}`} src="/web_store/digi.png" />
        </div>
    )
}
export default Main