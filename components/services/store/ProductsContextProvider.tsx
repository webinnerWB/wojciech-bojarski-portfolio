import React, {
    useState,
    useEffect,
    createContext,
    FC,
    ReactNode
} from "react";

export interface ServiceProductsContextProps  {
    productsArray: object[],
    addProduct: (obj: object, index: number) => object[]
}

type productsContext = {
    children: ReactNode
}

export const ProductsContext = createContext<ServiceProductsContextProps>({} as ServiceProductsContextProps)

const ProductsContextProvider: FC<productsContext> = ({ children }) => {
    const [productsArray, setProductsArray] = useState<object[]>([])


    const addProduct = (obj: object, index: number) => {
        const objAsString = JSON.stringify(obj)
        localStorage.setItem(`${index}`, objAsString)
        setProductsArray(prevEl => {return[...prevEl, obj]})
        return productsArray
    }
    useEffect(() => {
        console.log(`productsArray: `, productsArray)
        Object.keys(localStorage).map(key => {
            const value = localStorage.getItem(key)
            console.log(`localstorage value: ${value} localeStorage KEY: ${key} `)
        })
    }, [productsArray])
    const contextValue: ServiceProductsContextProps = {
        productsArray,
        addProduct
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider