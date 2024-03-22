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
    getCounter: object[],
    $addProduct: (obj: object, index: number) => object[],
    setGetCounter: Dispatch<SetStateAction<object[]>>,
    $removeProduct: (obj: object, index: number) => void,
    shippingCost: number,
    totalCostContext: number,
    orderingProducts: object[]
    $SetOrder: (obj: object) => void,
    $SetTotalCost: (obj: number) => void,
    $removeProducts: (obj: object, index: number) => void
}

type productsContext = {
    children: ReactNode
}

export const ProductsContext = createContext<ServiceProductsContextProps>({} as ServiceProductsContextProps)

const ProductsContextProvider: FC<productsContext> = ({ children }) => {
    const [productsArray, setProductsArray] = useState<object[]>([])
    const [getCounter, setGetCounter] = useState<object[]>([])
    const [totalCostContext, setTotatCostContext] = useState<number>(0)
    const [orderingProducts, setOrderingProducts] = useState<object[]>([])
    const [shippingCost, setShippingCost] = useState<number>(15)

    const $SetTotalCost = (cost: number) => {
        const converterTotalCost = Math.round(cost * 100)
        setTotatCostContext(converterTotalCost)
    }
    const $SetOrder = (obj: object) => {
        setOrderingProducts([obj])
    }

    useEffect(() => {
        console.log(`orderingProducts123123213: `, orderingProducts)
    }, [orderingProducts])

    const $addProduct = (obj: object, index: number) => {
        const objAsString = JSON.stringify(obj)
        localStorage.setItem(`${index}${productsArray.length}`, objAsString)
        setProductsArray(prevEl => [...prevEl, obj])
        return productsArray
    }

    const $removeProduct = (obj: object, id: number) => {
        let removed = false
        Object.keys(localStorage).forEach(key => {
            const isNumberKey = Number(key)
            if (!isNaN(isNumberKey)) {
                const product = localStorage.getItem(key)
                if (product) {
                    const productObj = JSON.parse(product)
                    if (productObj.id === id && !removed) {
                        localStorage.removeItem(key)
                        removed = true
                        setProductsArray(prevEl => [...prevEl, obj])
                        return productsArray
                    }
                }
            }
        })
    }

    const $removeProducts = (obj: object, id: number) => {
        Object.keys(localStorage).forEach(key => {
            const isNumberKey = Number(key)
            if (!isNaN(isNumberKey)) {
                const product = localStorage.getItem(key)
                if (product) {
                    const productObj = JSON.parse(product)
                    if (productObj.id === id) {
                        localStorage.removeItem(key)
                        setProductsArray(prevEl => [...prevEl, obj])
                        return productsArray
                    }
                }
            }
        })
    }

    useEffect(() => {
        setGetCounter([])
        if(localStorage.length > 0) {
            Object.keys(localStorage).map(key => {
                const isNumberKey = Number(key)
                if(!isNaN(isNumberKey)) {
                    const product = localStorage.getItem(key)
                    if(product) {
                        setGetCounter(prevEl => [...prevEl, JSON.parse(product)])
                    }
                }
            })
        }
    }, [productsArray])
    
    const contextValue: ServiceProductsContextProps = {
        productsArray,
        totalCostContext,
        getCounter,
        $addProduct,
        $removeProduct,
        shippingCost,
        setGetCounter,
        orderingProducts,
        $SetOrder,
        $SetTotalCost,
        $removeProducts
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider