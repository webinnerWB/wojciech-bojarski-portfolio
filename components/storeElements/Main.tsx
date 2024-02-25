import React, { FC, ChangeEvent, useRef, useEffect, useState, FormEvent } from "react"

import style from '../../style/store.module.scss'

type mainComponent = {
    handleSearchingValue: (e: ChangeEvent<HTMLInputElement>) => string|null,
    handleSearchResults: (value: string) => void,
}

const Main: FC<mainComponent> = ({handleSearchingValue, handleSearchResults}: mainComponent) => {
    const searchIntup = useRef<HTMLInputElement|null>(null)
    const [inputValue, setInputValue] = useState<string>('')


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSearchResults(inputValue)
        clearInpit()
        clearSlides(`${style.slide}`)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleSearchingValue(e)
        setInputValue(e.target.value)
    }

    const clearInpit = () => {
        const input = searchIntup.current

        if(input) {
            input.value = ''
        }
    }
    const clearSlides = (slideClass: string) => {
        const slidesElemtns = document.querySelectorAll(`.${slideClass}`)
        slidesElemtns.forEach(el => {
            if(el.classList.contains(`${style.active}`)){
                el.classList.remove(`${style.active}`)
            }
        })
    }

    useEffect(() => {
        const input = searchIntup.current
        if(input) {
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    handleSearchResults(input.value)
                    clearInpit()
                    clearSlides(`${style.slide}`)
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
                    <form onSubmit={handleSubmit}>
                        <input 
                            className={`${style.inputSearch} 
                            ${style.inputSearchMain}`} 
                            placeholder="Search for products" 
                            onChange={handleChange}
                            ref={searchIntup}
                        />
                        <i className={`fa-solid fa-magnifying-glass ${style.iconSearchMain}`}></i>
                        <button type="submit" className={`${style.searchBtn}`}>Search</button>
                    </form>
                </div>
            </div>
            <img className={`${style.digi} ${style.secPosition}`} src="/web_store/digi.png" />
        </div>
    )
}
export default Main