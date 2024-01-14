import React, { FC, ChangeEvent, useRef, useEffect } from "react"

import style from '../../style/store.module.scss'

type mainComponent = {
    handleSearchingValue: (e: ChangeEvent<HTMLInputElement>) => string|null,
    handleSearchResults: (value: string) => void,
}

const Main: FC<mainComponent> = ({handleSearchingValue, handleSearchResults}: mainComponent) => {
    const searchIntup = useRef<HTMLInputElement|null>(null)
    useEffect(() => {
        const input = searchIntup.current
        if(input) {
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    handleSearchResults(input.value)
                }
              });
        }
    }, [])
    return(
        <div className={`${style.wrapper}`}>
            <img className={`${style.digi}`} src="/web_store/digital.png" />
            <div className={`${style.mainWrapper}`}>
                <h1 className={`${style.title}`}>Find the perfect product with petishop</h1>
                <div className={`${style.searchMainWrapper}`}>
                    <input 
                    className={`${style.inputSearch} 
                    ${style.inputSearchMain}`} 
                    placeholder="Search for products" 
                    onChange={handleSearchingValue}
                    ref={searchIntup}
                    />
                    <i className={`fa-solid fa-magnifying-glass ${style.iconSearchMain}`}></i>
                    <button className={`${style.searchBtn}`}>Search</button>
                </div>
            </div>
            <img className={`${style.digi} ${style.secPosition}`} src="/web_store/digi.png" />
        </div>
    )
}
export default Main