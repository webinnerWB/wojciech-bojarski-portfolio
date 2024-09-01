import React, { useState, useEffect, FC, ChangeEvent, FormEvent, useRef } from "react"
import { Header } from '../../components/storeElements/Header'
import Methods from '../../components/services/DB/Methods'
import SearchResults from "@/components/storeElements/SearchResults"
import { Modal, Button, Dropdown, Form } from 'react-bootstrap'

import style from '../../style/store.module.scss'

type Category = {
    name: string,
    id: string,
    [key: string]: string
}

type Products = {
    name: Array<string>,
    imgurl: string,
    price: string,
    id: number,
    quantity: string,
    category: Array<string>,
    [key: string]: string | number| Array<string>
}

const Products: FC = () => {
    const [formValid, setFormValid] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const [newProductName, setNewProductName] = useState<string[]>([])
    const [allCategories, setAllCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<Products[]>([])
    const [product, setProduct] = useState<Products>({
        name: newProductName,
        imgurl: '',
        id: 0,
        quantity: '',
        price: '',
        category: selectedOptions
    })

    const [showModal, setShowModal] = useState<boolean>(false)
    const [showDelateModal, setShowDelateModal] = useState<boolean>(false)
    const [delateConfirmation, setDelateConfirmation] = useState<boolean>(false)
    const [productToRemove, setProductToRemove] = useState<Products>()

    const { $getAllDocuments, $updateDocument, $handleSearchingValue, $removeDocument, $handleSearchResults, $addNewDocument, searchResults, valuesArray, searchingValue } = Methods()

    const getAllCategories = async () => {
        try {
            const categories = await $getAllDocuments('categories')
            setAllCategories(categories.docs.map(el => el.data() as Category))
        } catch (err){
            console.error(`Error: `, err)
        }
    }
    const getAllProducts = async () => {
        try {
            const products = await $getAllDocuments('products')
            const productsList = products.docs.map(el => el.data() as Products)
            const sortedProductsList = productsList.sort((b, a) => b.id - a.id)
            setProducts(sortedProductsList)
        } catch (err) {
            console.error(`Error: `, err)
        }
    }

    const generateIDs = async (newID: number) => {
        try {
            const products = await $getAllDocuments('products')
            const productsList = products.docs.map(el => el.data() as Products)
            let arrayIDs: number[] = []
            productsList.forEach(el => {
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
        const {name, value, type, checked} = e.target
        const setID = await generateIDs(0)
        let updatedCategories = [...selectedOptions]
        let productName = [...newProductName]
        if(type === 'checkbox') {
            if(checked){
                updatedCategories.push(name)
            }else{
                updatedCategories = updatedCategories.filter(el => el !== name)
            }
            setSelectedOptions(updatedCategories)
            setProduct(prevState => ({
                ...prevState,
                category: updatedCategories
            }))
        } else if(name === 'name') {
            productName = value.split(/(\s+)/)
            setNewProductName(productName)
            setProduct(prevState => ({
                ...prevState,
                name: productName
            }))
        } else {
            setProduct(prevState => ({
                ...prevState,
                [name]: value,
                id: !edit ? Number(setID) : prevState.id
            }))
        }
    }
    const dropDownElementCategory = allCategories.map((el: Category, i: number) => (
        <React.Fragment key={`${el.id}${el.name}`}>
            <label className={style.optionElemnt}>
                <input
                    type="checkbox"
                    className={style.checkbox}
                    id={el.id}
                    name={`${el.name.toLocaleLowerCase()}`}
                    checked={selectedOptions.includes(el.name.toLocaleLowerCase())}
                    onChange={changehandler}
                />
                <span className={style.checkmark}></span>
                <span>{el.name}</span>
            </label>
        </React.Fragment>
    ))
    const isFormValid = () => {
        setFormValid(false)
        for (const key in product) {
            if (product[key] === '') {
                setFormValid(true)
                return false
            }
        }
        if(selectedOptions.length === 0) {
            setFormValid(true)
            return false
        }
        return true
    }
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(isFormValid() && !edit) {
            $addNewDocument('products', product)
                .then(() => {
                    getAllProducts()
                    handleClose()
                })
        }else if(isFormValid() && edit) {
            $updateDocument('products', 'id', product.id, product)
                .then(() => {
                    getAllProducts()
                    handleClose()
                })
        }
    }
    const actionHandler = (product: Products, action: string) => {
        if (action === 'edit') {
            setEdit(true)
            setSelectedOptions(product.category)
            setProduct({
                name: product.name,
                imgurl: product.imgurl,
                id: product.id,
                quantity: product.quantity,
                price: product.price,
                category: selectedOptions
            })
            setShowModal(true)
        }else{
            setEdit(false)
            setShowDelateModal(true)
            setProductToRemove(product)
        }
    }

    const deleteFunction = () => {
        if(productToRemove) {
            $removeDocument('products', productToRemove.id, 'id')
            .then(() => {
                setShowDelateModal(false)
                setProductToRemove(undefined)
                setDelateConfirmation(false)
            })
        }
    }

    useEffect(() => {
        if(delateConfirmation) {
            deleteFunction()
        }
        getAllProducts()
    }, [delateConfirmation])

    const handleClose = () => {
            setEdit(false)
            setShowModal(false)
            setSelectedOptions([])
            setProduct({
                name: [],
                imgurl: '',
                id: 0,
                quantity: '',
                price: '',
                category: selectedOptions
            })
    }

    const toUpperLetter = (words: string[]) => {
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
        return words
    }

    const productsList = products.map((el, i)=> (
        <React.Fragment key={`category-${el.id}`}>
            <tr className={`${style.trSpace}`}></tr>
            <tr className={`${style.categoryWrapper}`}>
                <th className={`${style.td}`} scope="row">{el.id}</th>
                <td className={`${style.td}`}>
                    <div className={`${style.wrapperCell} ${style.products}`}>
                        <img className={`${style.img} mr-5`} src={`${el.imgurl}`} alt={`${el.name.join('')}`} />
                        <p className={`${style.text}`}>{toUpperLetter(el.name)}</p>
                    </div> 
                </td>
                <td className={`${style.td}`}>
                    <div className={`${style.wrapperCell} ${style.tdProducts}`}>
                        <p className={`${style.text}`}>{el.category.join(', ')}</p>
                    </div> 
                </td>
                <td className={`${style.td}`}>
                    <div className={`${style.wrapperCell} ${style.products}`}>
                        <p className={`${style.text}`}>{el.quantity}</p>
                    </div> 
                </td>
                <td className={`${style.td}`}>
                    <div className={`${style.wrapperCell} ${style.products}`}>
                        <p className={`${style.text}`}>{el.price} PLN</p>
                    </div> 
                </td>
                <td className={`${style.td}`}>
                    <div className={`${style.wrapperBtn}`}>
                        <button type="button" className={`btn btn-light ${style.btnEdit} ${style.defaultBtn}`} onClick={() => actionHandler(el, 'edit')}>Edit</button>
                        <button type="button" className={`btn btn-light ${style.btnDelete} ${style.defaultBtn}`} onClick={() => actionHandler(el, 'delete')}>Delete</button>
                    </div> 
                </td>
            </tr>
        </React.Fragment>
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
        getAllProducts()
        getAllCategories()       
    }, [])

    return (
        <div className="col-lg-12">
            <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
            <div className="row">
                <div className={`col-lg-12  ${style.formWrapper} ${style.category} mt-5 mb-5`}>
                    <Button className={`btn ${style.defaultBtn} ${style.category}`} onClick={() => setShowModal(true)}>Add new product:</Button>
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Body className={`${style.modalBody}`}>
                        <button type="button" className={`${style.modalCloseBtn}`} onClick={() => handleClose()}>X</button>
                            <div className={`col-lg-12  ${style.formWrapper} mt-5 mb-5`}>
                                <form onSubmit={submitHandler}>
                                    <div className={`form-group ${style.formInputWrapper}`}>
                                        <label className={`${style.label}`} htmlFor="icon">Name</label>
                                        <input
                                            type="text"
                                            name='name'
                                            value={product.name.join('')}
                                            className={`form-control ${style.input} ${formValid && product.name.length === 0 ? style.inputError : null}`}
                                            id="name"
                                            onChange={changehandler}
                                        />
                                    </div>
                                    <div className={`form-group ${style.formInputWrapper} mt-3`}>
                                        <label className={`${style.label}`} htmlFor="name">Url</label>
                                        <input
                                            type="text"
                                            name="imgurl"
                                            value={product.imgurl}
                                            className={`form-control ${style.input} ${formValid && product.imgurl === '' ? style.inputError : null}`}
                                            id="imgurl"
                                            onChange={changehandler}
                                        />
                                    </div>
                                    <div className={`form-group ${style.formInputWrapper} mt-3`}>
                                        <label className={`${style.label}`} htmlFor="name">Quantity</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={product.quantity}
                                            className={`form-control ${style.input} ${formValid && product.quantity === '' ? style.inputError : null}`}
                                            id="quantity"
                                            onChange={changehandler}
                                        />
                                    </div>
                                    <div className={`form-group ${style.formInputWrapper} mt-3`}>
                                        <label className={`${style.label}`} htmlFor="name">Price</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={product.price}
                                            className={`form-control ${style.input} ${formValid && product.price === '' ? style.inputError : null}`}
                                            id="price"
                                            onChange={changehandler}
                                        />
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Toggle className={style.dropDownBTN} variant="secondary" id="dropdown-basic">
                                            Categories
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className={style.dropDownListContainer}>
                                            <div className={style.dropDownWrapper}>
                                                {dropDownElementCategory}
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <button type="submit" className={`btn btn-light ${style.formButton}`}>{!edit ? 'Add' : 'Edit'}</button>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={showDelateModal} onHide={() => setShowDelateModal(false)}>
                        <Modal.Body className={`${style.modalBody}`}>
                            <div className={style.removeModalWrapper}>
                                <h2 className={style.title}>{`Delate the "${productToRemove && productToRemove.name.join('')}"?`}</h2>
                                <button type="button" className={`btn btn-light  ${style.btnDelete} ${style.defaultBtn} ${style.removebtn}`} onClick={() => setDelateConfirmation(true)}>Yes</button>
                                <button type="button" className={`btn btn-light ${style.btnEdit} ${style.defaultBtn} ${style.removebtn}`} onClick={() => setShowDelateModal(false)}>No</button>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className={`col-lg-12 ${style.categoriesListWrapper} table-responsive ${style.tableWrapper} ${style.orderPageAdmin}`}>
                    <h2 className={`${style.title}`}>Products list:</h2>
                    <br />
                    <table className={`${style.tableProductAdmin}`}>
                        <thead className={`${style.tableCustom}`}>
                            <tr  className={`${style.borderBottom}`}>
                                <th className={`${style.th} text-center`} scope="col">ID</th>
                                <th className={`${style.th}`} scope="col">Product</th>
                                <th className={`${style.th}`} scope="col">Category</th>
                                <th className={`${style.th}`} scope="col">Quantity</th>
                                <th className={`${style.th}`} scope="col">Price</th>
                                <th className={`${style.th} text-center`} scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && productsList}
                        </tbody>
                    </table>
                </div>
            </div>
            <SearchResults valueSearch={searchingValue} results={searchResults} valuesArray={valuesArray} />
        </div>
    )
}

export default Products