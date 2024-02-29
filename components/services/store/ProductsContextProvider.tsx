import React, {
    useState,
    useEffect,
    createContext,
    FC,
    ReactNode
} from "react";

export interface ServiceProductsContextProps  {
    productsArray: object[],
    productsArrayLength: object[]
    addProduct: (obj: object, index: number) => object[]
}

type productsContext = {
    children: ReactNode
}

export const ProductsContext = createContext<ServiceProductsContextProps>({} as ServiceProductsContextProps)

const ProductsContextProvider: FC<productsContext> = ({ children }) => {
    const [productsArray, setProductsArray] = useState<object[]>([])
    const [productsArrayLength, setProductsArrayLength] = useState<object[]>([])
    const addProduct = (obj: object, index: number) => {
        const objAsString = JSON.stringify(obj)
        localStorage.setItem(`${index}${productsArray.length}4444988`, objAsString)
        setProductsArray(prevEl => [...prevEl, obj])
        return productsArray
    }
    useEffect(() => {
        setProductsArrayLength([])
        if(localStorage.length > 0) {
            Object.keys(localStorage).map((key: any) => {
                const keyValue = Number(key)
                if(!isNaN(keyValue)) {
                    const product = localStorage.getItem(key)
                    if(product) {
                        setProductsArrayLength(prevEl => [...prevEl, JSON.parse(product)])
                    }
                }
            })
        }
    }, [productsArray])
    const contextValue: ServiceProductsContextProps = {
        productsArray,
        productsArrayLength,
        addProduct
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider