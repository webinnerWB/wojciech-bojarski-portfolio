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
    $SetOrder: (obj: any) => void,
    $setOrderForPayu: (obj: any) => void,
    $SetTotalCost: (obj: number) => void,
    $removeProducts: (obj: object, index: number) => void,
    orderForPayu: payuOrder[],
}

interface payuOrder {
    name: string,
    unitPrice: string,
    quantity: string
}
interface Order {
    name: string,
    unitPrice: string,
    quantity: string,
    imgUrl: string,
}
type productsContext = {
    children: ReactNode
}
export const ProductsContext = createContext<ServiceProductsContextProps>({} as ServiceProductsContextProps)

const ProductsContextProvider: FC<productsContext> = ({ children }) => {
    const [productsArray, setProductsArray] = useState<object[]>([])
    const [getCounter, setGetCounter] = useState<object[]>([])
    const [totalCostContext, setTotatCostContext] = useState<number>(0)
    const [orderingProducts, setOrderingProducts] = useState<Order[]>([])
    const [orderForPayu, setOrderForPayu] = useState<payuOrder[]>([])
    const [shippingCost, setShippingCost] = useState<number>(15)

    const $SetTotalCost = (cost: number) => {
        const converterTotalCost = Math.round(cost * 100)
        setTotatCostContext(converterTotalCost)
    }
    const $SetOrder = (obj: any) => {
        obj.forEach((el: any) => {
            setOrderingProducts(prev => {
                return [...prev, {
                    name: el.name.join('').replace(',', ''),
                    unitPrice: el.price,
                    quantity: el.amount,
                    imgUrl: el.imgurl
                }]
            })
        })
    }
    const $setOrderForPayu = (obj: any) => {
        obj.forEach((el: any) => {
            const price = el.price * 100
            const stringPrice = price.toFixed(0).toString()
            const name = el.name.join('').replace(',', '')
            const amount = el.amount.toString()
            setOrderForPayu(prev => {
                return [...prev, {
                    name: name,
                    unitPrice: stringPrice,
                    quantity: amount
                }]
            })
        })
    }

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
        $setOrderForPayu,
        $SetTotalCost,
        $removeProducts,
        orderForPayu
    }

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider