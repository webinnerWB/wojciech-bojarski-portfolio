import React, { useState, useEffect, FC, ChangeEvent } from "react"
import { Header } from '../../components/storeElements/Header'
import Methods from '../../components/services/DB/Methods'
import SearchResults from "@/components/storeElements/SearchResults"

import style from '../../style/store.module.scss'

type Category = {
    name: string,
    icon: string
}

const Categories: FC = () => {
    const [category, setCategory] = useState<Category>({
        name: '',
        icon: ''
    })

    const { $handleSearchingValue, $handleSearchResults, searchResults, valuesArray, searchingValue} = Methods()


    const changehandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setCategory({
            ...category,
            [name]: value
        })
               
    }

    useEffect(() => {
        console.log(`category: `, category) 
    }, [category])

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])

    return(
        <div className="col-lg-12">
            <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
            <div className="row">
                <div className={`col-lg-12  ${style.formWrapper} ${style.login} mt-5 mb-5`}>
                    <form>
                        <div className={`form-group ${style.formInputWrapper}`}>
                            <label className={`${style.label}`} htmlFor="icon">Icon</label>
                            <input 
                                type="text" 
                                name='icon' 
                                className={`form-control ${style.input}`} 
                                id="icon" 
                                placeholder="e.g. fa-icons" 
                                onChange={changehandler}
                                />
                        </div>
                        <div className={`form-group ${style.formInputWrapper} mt-3`}>
                            <label className={`${style.label}`} htmlFor="name">Categories name</label>
                            <input 
                                type="text" 
                                name="name" 
                                className={`form-control ${style.input}`} 
                                id="name" 
                                placeholder="Name" 
                                onChange={changehandler}
                                />
                        </div>
                        <button type="submit" className={`btn btn-light ${style.formButton}`}>Submit</button>
                    </form>
                </div>
            </div>
            <SearchResults valueSearch={searchingValue} results={searchResults} valuesArray={valuesArray}/>
        </div>
    )
}

export default Categories
