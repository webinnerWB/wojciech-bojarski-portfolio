import React, { useEffect, FC } from "react"
import { Header } from '../../components/storeElements/Header'
import Methods from '../../components/services/DB/Methods'

import style from '../../style/store.module.scss'
const Categories: FC = () => {
    const { $handleSearchingValue, $handleSearchResults, searchResults, searchingValue} = Methods()

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
    }, [])

    return(
        <div className="col-lg-12">
            <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
            <div className="row">
                <div className={`col-lg-12  ${style.formWrapper} ${style.login} mt-5`}>
                    <form>
                        <div className={`form-group ${style.formInputWrapper}`}>
                            <label className={`${style.label}`} htmlFor="url">URL</label>
                            <input type="text" className={`form-control ${style.input}`} id="url" placeholder="e.g. fa-icons" />
                        </div>
                        <div className={`form-group ${style.formInputWrapper} mt-3`}>
                            <label className={`${style.label}`} htmlFor="name">Categories name</label>
                            <input type="text" className={`form-control ${style.input}`} id="name" placeholder="Name" />
                        </div>
                        <button type="submit" className={`btn btn-light ${style.formButton}`}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Categories
