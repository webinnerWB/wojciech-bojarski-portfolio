import React, {
    useState,
    useEffect,
    createContext,
    FC,
    ReactNode,
    Dispatch,
    SetStateAction
} from "react"

export interface ServiceProductsContextProps  {
    productsArray: object[],
    getProductsArray: object[],
    $updateCounter: (obj: object, id: number) => void,
    $addProduct: (obj: object, index: number) => object[],
    setGetProductsArray: Dispatch<SetStateAction<object[]>>,
    $removeProduct: (obj: object, index: number) => void,
    shippingCost: number,
    orderingProducts: object[]
    $SetOrder: (obj: object) => void
}

type productsContext = {
    children: ReactNode
}

export const ProductsContext = createContext<ServiceProductsContextProps>({} as ServiceProductsContextProps)

const ProductsContextProvider: FC<productsContext> = ({ children }) => {
    const [productsArray, setProductsArray] = useState<object[]>([])
    const [getProductsArray, setGetProductsArray] = useState<object[]>([])
    const [orderingProducts, setOrderingProducts] = useState<object[]>([])
    const [shippingCost, setShippingCost] = useState<number>(15)

    const $SetOrder = (obj: object) => {
        setOrderingProducts([obj])
    }

    const $addProduct = (obj: object, index: number) => {
        const objAsString = JSON.stringify(obj)
        localStorage.setItem(`${index}${productsArray.length}`, objAsString)
        setProductsArray(prevEl => [...prevEl, obj])
        return productsArray
    }

    const $removeProduct = (obj: object, id: number) => {
        let removed = false
        Object.keys(localStorage).forEach(localStorageElement => {
            const isNumberKey = Number(localStorageElement)
            if (!isNaN(isNumberKey)) {
                const product = localStorage.getItem(localStorageElement)
                if (product) {
                    const productObj = JSON.parse(product)
                    if (productObj.id === id && !removed) {
                        localStorage.removeItem(localStorageElement)
                        removed = true
                        setProductsArray(prevEl => [...prevEl, obj])
                        return productsArray
                    }
                }
            }
        })
    }
    const $updateCounter = (obj: object, id: number) => {
        setProductsArray(prevEl => [...prevEl, obj])
        return productsArray
    }

    useEffect(() => {
        setGetProductsArray([])
        if(localStorage.length > 0) {
            Object.keys(localStorage).map((key: any) => {
                const keyValue = Number(key)
                if(!isNaN(keyValue)) {
                    const product = localStorage.getItem(key)
                    if(product) {
                        setGetProductsArray(prevEl => [...prevEl, JSON.parse(product)])
                    }
                }
            })
        }
    }, [productsArray])
    
    const contextValue: ServiceProductsContextProps = {
        productsArray,
        getProductsArray,
        $updateCounter,
        $addProduct,
        $removeProduct,
        shippingCost,
        setGetProductsArray,
        orderingProducts,
        $SetOrder
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider