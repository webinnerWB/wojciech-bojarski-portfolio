import React, { useState, useEffect, FC, ChangeEvent, FormEvent } from "react"
import { Header } from '../../components/storeElements/Header'
import Methods from '../../components/services/DB/Methods'
import SearchResults from "@/components/storeElements/SearchResults"
import { Modal, Button } from 'react-bootstrap'

import style from '../../style/store.module.scss'

type Category = {
    name: string,
    icon: string,
    [key: string]: string
}

const Categories: FC = () => {
    const [formValid, setFormValid] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [searchingFiledValue, setSearchingFiledValue] = useState<string>('')
    const [categories, setCategories] = useState<Category[]>([])
    const [category, setCategory] = useState<Category>({
        name: '',
        icon: ''
    })

    const [showModal, setShowModal] = useState<boolean>(false)

    const { $getAllDocuments, $updateFieldInDocument, $handleSearchingValue, $removeDocument, $handleSearchResults, $addNewDocument, searchResults, valuesArray, searchingValue } = Methods()

    const getAllCategories = async () => {
        try {
            const categories = await $getAllDocuments('categories')
            setCategories(categories.docs.map(el => el.data() as Category))
        } catch (err) {
            console.error(`Error: `, err)
        }
    }

    const changehandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCategory({
            ...category,
            [name]: value
        })
    }

    const isFormValid = () => {
        setFormValid(false)
        for (const key in category) {
            if (category[key] === '') {
                setFormValid(true)
                return false
            }
        }
        return true
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isFormValid() && !edit) {
            $addNewDocument('categories', category)
                .then(() => {
                    getAllCategories()
                    handleClose()
                })
        }else if(isFormValid() && edit) {
            $updateFieldInDocument('categories', 'name', searchingFiledValue, category.name, 'name')
            $updateFieldInDocument('categories', 'name', searchingFiledValue, category.icon, 'icon')
                .then(() => {
                    getAllCategories()
                    handleClose()
                })

        }
    }

    const clickHandler = (category: Category, action: string) => {
        if (action === 'edit') {
            setCategory({
                name: category.name,
                icon: category.icon
            })
            setSearchingFiledValue(category.name)
            setShowModal(true)
            setEdit(true)
        }else{
            $removeDocument('categories', category.name, 'name')
                .then(() => {
                    getAllCategories()
                })
        }
    }
    const handleClose = () => {
        setShowModal(false)
        setCategory({
            name: '',
            icon: ''
        })
    }

    const categoriesList = categories.map(el => (
        <div key={el.name} className={`d-lg-flex align-items-lg-center ${style.categoryWrapper} mb-4`}>
            <div className={`${style.wrapperCell}`}>
                <p className={`${style.name}`}>{el.name}</p>
                <i className={`${el.icon}`}></i>
            </div>
            <div className={`${style.wrapperBtn}`}>
                <button type="button" className={`btn btn-light ${style.btnEdit} ${style.defaultBtn}`} onClick={() => clickHandler(el, 'edit')}>Edit</button>
                <button type="button" className={`btn btn-light ${style.btnDelete} ${style.defaultBtn}`} onClick={() => clickHandler(el, 'delete')}>Delete</button>
            </div>
        </div>
    ))

    useEffect(() => {
        const modalContent = document.querySelector('.modal-content') as HTMLElement
        if (modalContent) {
        modalContent.style.backgroundColor = 'transparent'
        }
    }, [showModal])

    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        document.body.style.color = '#ffffff'
        getAllCategories()
    }, [])

    return (
        <div className="col-lg-12">
            <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
            <div className="row">
                <div className={`col-lg-12  ${style.formWrapper} ${style.category} mt-5 mb-5`}>
                    <Button className={`btn ${style.defaultBtn} ${style.category}`} onClick={() => setShowModal(true)}>Add new category:</Button>
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Body className={`${style.modalBody}`}>
                        <button type="button" className={`${style.modalCloseBtn}`} onClick={() => setShowModal(false)}>X</button>
                            <div className={`col-lg-12  ${style.formWrapper} mt-5 mb-5`}>
                                <form onSubmit={submitHandler}>
                                    <div className={`form-group ${style.formInputWrapper}`}>
                                        <label className={`${style.label}`} htmlFor="icon">Icon</label>
                                        <input
                                            type="text"
                                            name='icon'
                                            value={category.icon}
                                            className={`form-control ${style.input} ${formValid && category.icon === '' ? style.inputError : null}`}
                                            id="icon"
                                            placeholder="e.g. fa-solid fa-icons"
                                            onChange={changehandler}
                                        />
                                    </div>
                                    <div className={`form-group ${style.formInputWrapper} mt-3`}>
                                        <label className={`${style.label}`} htmlFor="name">Categories name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={category.name}
                                            className={`form-control ${style.input} ${formValid && category.name === '' ? style.inputError : null}`}
                                            id="name"
                                            placeholder="Name"
                                            onChange={changehandler}
                                        />
                                    </div>
                                    <button type="submit" className={`btn btn-light ${style.formButton}`}>Add</button>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className={`col-lg-12 ${style.categoriesListWrapper}`}>
                    <h2 className={`${style.title}`}>Category list:</h2>
                    <br />
                    {categories && categoriesList}
                </div>
            </div>
            <SearchResults valueSearch={searchingValue} results={searchResults} valuesArray={valuesArray} />
        </div>
    )
}

export default Categories