import React, {
    useState,
    useEffect,
    createContext,
    FC,
    ReactNode
} from "react";

export interface ServiceProductsContextProps  {
    productsArray: object[],
    getProductsArray: object[],
    $updateCounter: (id: number) => void,
    $addProduct: (obj: object, index: number) => object[]
}

type productsContext = {
    children: ReactNode
}

export const ProductsContext = createContext<ServiceProductsContextProps>({} as ServiceProductsContextProps)

const ProductsContextProvider: FC<productsContext> = ({ children }) => {
    const [productsArray, setProductsArray] = useState<object[]>([])
    const [getProductsArray, setGetProductsArray] = useState<any[]>([])
    const $addProduct = (obj: object, index: number) => {
        const objAsString = JSON.stringify(obj)
        localStorage.setItem(`${index}${productsArray.length}4444988`, objAsString)
        setProductsArray(prevEl => [...prevEl, obj])
        return productsArray
    }
    const $updateCounter = (id: number) => {
        setGetProductsArray(prevEl => {
            const newArray = prevEl.filter(el => el.id !== id)
            return newArray
        })
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
        $addProduct,
        $updateCounter
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider