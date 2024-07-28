import React, { useState, useEffect, FC, ChangeEvent, FormEvent } from "react"
import { Header } from '../../components/storeElements/Header'
import Methods from '../../components/services/DB/Methods'
import SearchResults from "@/components/storeElements/SearchResults"
import { Modal, Button, Dropdown, Form } from 'react-bootstrap'

import style from '../../style/store.module.scss'

// type Category = {
//     name: string,
//     [key: string]: string
// }

type Products = {
    name: string,
    imgurl: string,
    price: string,
    id: number,
    quantity: string,
    category: string[],
    [key: string]: string | number| string[]
}

const Products: FC = () => {
    const [formValid, setFormValid] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [searchingFiledValue, setSearchingFiledValue] = useState<string>('')
    const [products, setProducts] = useState<Products[]>([])
    const [product, setProduct] = useState<Products>({
        name: '',
        imgurl: '',
        id: 0,
        quantity: '',
        price: '',
        category: selectedOptions
    })

    const [showModal, setShowModal] = useState<boolean>(false)

    const { $getAllDocuments, $updateDocument, $handleSearchingValue, $removeDocument, $handleSearchResults, $addNewDocument, searchResults, valuesArray, searchingValue } = Methods()

    const getAllProducts = async () => {
        try {
            const products = await $getAllDocuments('products')
            const productsList = products.docs.map(el => el.data() as Products)
            const sortedProductsList = productsList.sort((a, b) => b.id - a.id)
            setProducts(sortedProductsList)
        } catch (err) {
            console.error(`Error: `, err)
        }
    }

    const changehandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        const { name, value, checked } = e.target
        setProduct({
            ...product,
            [name]: value,
            id: products.length + 1,
            category: checked ? [...selectedOptions, name] : selectedOptions.filter(el => el !== name)
        })
        setSelectedOptions(prevState => {
            if (checked) {
                return [...prevState, name];
            } else {
                return prevState.filter(el => el !== name);
            }
        })
    }

    const isFormValid = () => {
        setFormValid(false)
        for (const key in product) {
            if (product[key] === '') {
                setFormValid(true)
                return false
            }
        }
        return true
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        console.log(`products: `, products)
        e.preventDefault()
        if (isFormValid() && !edit) {
            $addNewDocument('products', product)
                .then(() => {
                    getAllProducts()
                    handleClose()
                })
        }else if(isFormValid() && edit) {
            
            $updateDocument('products', 'id', '$id', product)
                .then(() => {
                    getAllProducts()
                    handleClose()
                })

        }
    }

    const clickHandler = (product: Products, action: string) => {
        if (action === 'edit') {
            // setProduct({
            //     name: product.name,
            //     icon: product.icon
            // })
            setSearchingFiledValue(product.name)
            setShowModal(true)
            setEdit(true)
        }else{
            $removeDocument('products', product.id, 'id')
                .then(() => {
                    getAllProducts()
                })
        }
    }
    const handleClose = () => {
        setShowModal(false)
        // setProduct({
        //     name: '',
        //     icon: ''
        // })
    }

    const productsList = products.map(el => (
        <tr key={el.id} className={`${style.categoryWrapper}`}>
            <th className={`${style.td}`} scope="row">{el.id}</th>
            <td className={`${style.td}`}>
                <div className={`${style.wrapperCell} ${style.products}`}>
                    <img className={`${style.img} mr-5`} src={`${el.imgurl}`} alt={`${el.name}`} />
                    <p className={`${style.text}`}>{el.name}</p>
                </div> 
            </td>
            <td className={`${style.td}`}>
                <div className={`${style.wrapperCell} ${style.products}`}>
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
                    <button type="button" className={`btn btn-light ${style.btnEdit} ${style.defaultBtn}`} onClick={() => clickHandler(el, 'edit')}>Edit</button>
                    <button type="button" className={`btn btn-light ${style.btnDelete} ${style.defaultBtn}`} onClick={() => clickHandler(el, 'delete')}>Delete</button>
                </div> 
            </td>
        </tr>
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
        getAllProducts()
    }, [])

    return (
        <div className="col-lg-12">
            <Header handleSearchingValue={$handleSearchingValue} handleSearchResults={$handleSearchResults} />
            <div className="row">
                <div className={`col-lg-12  ${style.formWrapper} ${style.category} mt-5 mb-5`}>
                    <Button className={`btn ${style.defaultBtn} ${style.category}`} onClick={() => setShowModal(true)}>Add new product:</Button>
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Body className={`${style.modalBody}`}>
                        <button type="button" className={`${style.modalCloseBtn}`} onClick={() => setShowModal(false)}>X</button>
                            <div className={`col-lg-12  ${style.formWrapper} mt-5 mb-5`}>
                                <form onSubmit={submitHandler}>
                                    <div className={`form-group ${style.formInputWrapper}`}>
                                        <label className={`${style.label}`} htmlFor="icon">Name</label>
                                        <input
                                            type="text"
                                            name='name'
                                            value={product.name}
                                            className={`form-control ${style.input} ${formValid && product.name === '' ? style.inputError : null}`}
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
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Wybierz opcje
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Form.Check
                                            type="checkbox"
                                            id="option1"
                                            label="Opcja 1"
                                            name="option1"
                                            checked={selectedOptions.includes("option1")}
                                            onChange={changehandler}
                                            />
                                            <Form.Check
                                            type="checkbox"
                                            id="option2"
                                            label="Opcja 2"
                                            name="option2"
                                            checked={selectedOptions.includes("option2")}
                                            onChange={changehandler}
                                            />
                                            <Form.Check
                                            type="checkbox"
                                            id="option3"
                                            label="Opcja 3"
                                            name="option3"
                                            checked={selectedOptions.includes("option3")}
                                            onChange={changehandler}
                                            />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <button type="submit" className={`btn btn-light ${style.formButton}`}>Add</button>
                                </form>
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