import React, { useState, useEffect, FC, ChangeEvent, FormEvent } from "react"
import { Header } from '../../components/storeElements/Header'
import Methods from '../../components/services/DB/Methods'
import SearchResults from "@/components/storeElements/SearchResults"
import { Modal, Button } from 'react-bootstrap'

import style from '../../style/store.module.scss'

type Category = {
    name: string,
    icon: string,
    id: number,
    [key: string | number]: string | number
}

const Categories: FC = () => {
    const [formValid, setFormValid] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    // const [searchingFiledValue, setSearchingFiledValue] = useState<string>('')
    const [categories, setCategories] = useState<Category[]>([])
    const [category, setCategory] = useState<Category>({
        name: '',
        icon: '',
        id: 0
    })

    const [showModal, setShowModal] = useState<boolean>(false)
    const [showDelateModal, setShowDelateModal] = useState<boolean>(false)
    const [delateConfirmation, setDelateConfirmation] = useState<boolean>(false)
    const [categoryToRemove, setCategoryToRemove] = useState<Category>()

    const { $getAllDocuments, $updateDocument, $handleSearchingValue, $removeDocument, $handleSearchResults, $addNewDocument, searchResults, valuesArray, searchingValue } = Methods()

    const getAllCategories = async () => {
        try {
            const categories = await $getAllDocuments('categories')
            const categoryList = categories.docs.map(el => el.data() as Category)
            const sortedCategoryList = categoryList.sort((b, a) => b.id - a.id)
            setCategories(sortedCategoryList)
        } catch (err) {
            console.error(`Error: `, err)
        }
    }

    const generateIDs = async (newID: number) => {
        try {
            const categories = await $getAllDocuments('categories')
            const categoriesList = categories.docs.map(el => el.data() as Category)
            let arrayIDs: number[] = []
            categoriesList.forEach(el => {
                arrayIDs.push(el.id)
            })
            while(arrayIDs.includes(newID)) {
                newID++
            }
            return newID
        } catch (err) {
            console.error(`Error: `, err)
        }
    }

    const changehandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const cursorPopsition = e.target.selectionStart
        let setID = await generateIDs(0)

        if(edit) {
            setCategory({
                ...category,
                [name]: value
            })
        } else {
            setCategory({
                ...category,
                id: Number(setID),
                [name]: value
            })
        }

        setTimeout(() => {
            e.target.setSelectionRange(cursorPopsition, cursorPopsition)
        }, 0.1)
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
            $updateDocument('categories', 'id', category.id, category)
            getAllCategories()
            handleClose()
        }
    }

    const actionHandler = (category: Category, action: string) => {
        if (action === 'edit') {
            setEdit(true)
            setCategory({
                ...category,
                name: category.name,
                icon: category.icon
            })
            setShowModal(true)
        }else{
            setEdit(false)
            setShowDelateModal(true)
            setCategoryToRemove(category)
            
        }
    }

    const deleteFunction = () => {
        if(categoryToRemove) {
            $removeDocument('categories', categoryToRemove.id, 'id')
                .then(() => {
                    setShowDelateModal(false)
                    setCategoryToRemove(undefined)
                    setDelateConfirmation(false)
                })
        }
    }

    useEffect(() => {
        if(delateConfirmation) {
            deleteFunction()
        }
        getAllCategories()
    }, [delateConfirmation])

    const handleClose = () => {
        setShowModal(false)
        setEdit(false)
        setCategory({
            name: '',
            icon: '',
            id: 0
        })
    }

    const categoriesList = categories.map(el => (
        <div key={el.name} className={`d-lg-flex align-items-lg-center ${style.categoryWrapper} mb-4`}>
            <div className={`${style.wrapperCell}`}>
                <i className={`${el.icon}`}></i>
                <p className={`${style.text}`}>{el.name}</p>
                <p className={`${style.text}`}>{el.id}</p>
            </div>
            <div className={`${style.wrapperBtn}`}>
                <button type="button" className={`btn btn-light ${style.btnEdit} ${style.defaultBtn}`} onClick={() => actionHandler(el, 'edit')}>Edit</button>
                <button type="button" className={`btn btn-light ${style.btnDelete} ${style.defaultBtn}`} onClick={() => actionHandler(el, 'delete')}>Delete</button>
            </div>
        </div>
    ))

    useEffect(() => {
        const modalContent = document.querySelector('.modal-content') as HTMLElement
        if (modalContent) {
        modalContent.style.backgroundColor = 'transparent'
        }
    }, [showModal, showDelateModal])

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
                        <button type="button" className={`${style.modalCloseBtn}`} onClick={() => handleClose()}>X</button>
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
                                    <button type="submit" className={`btn btn-light ${style.formButton}`}>{!edit ? 'Add' : 'Edit'}</button>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showDelateModal} onHide={() => setShowDelateModal(false)}>
                        <Modal.Body className={`${style.modalBody}`}>
                            <div className={style.removeModalWrapper}>
                                <h2 className={style.title}>{`Delate the "${categoryToRemove && categoryToRemove.name}"?`}</h2>
                                <button type="button" className={`btn btn-light  ${style.btnDelete} ${style.defaultBtn} ${style.removebtn}`} onClick={() => setDelateConfirmation(true)}>Yes</button>
                                <button type="button" className={`btn btn-light ${style.btnEdit} ${style.defaultBtn} ${style.removebtn}`} onClick={() => setShowDelateModal(false)}>No</button>
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