import React, {
    FC,
    createContext,
    useState,
    ReactNode
} from "react";

type MultiWeatherData = {
    dataMultiWeather: any,
    dt: number,
    weather: any
}

export interface ServiceMultiWeatherContextProps {
    dataMultiWeather: MultiWeatherData[]|null,
    getMultiWeather: (lat:string, long:string) => void
}

export const MultiWeatherContext = createContext<ServiceMultiWeatherContextProps>({} as ServiceMultiWeatherContextProps)

type MultiWeatherProviderProps = {
    children: ReactNode
}

const MultiWeatherProvider: FC<MultiWeatherProviderProps> = ({
    children
}: MultiWeatherProviderProps) => {

    const [dataMultiWeather, setDataMultiWeather] = useState<any|null>(null)

    const getMultiWeather = (lat:string, long:string) => {
        const URL = `https://api.agromonitoring.com/agro/1.0/weather/forecast?lat=${lat}&lon=${long}&appid=${process.env.NEXT_PUBLIC_API_KEY_AGROMONITORING}&units=metric`

        fetch(URL)
            .then(res => res.json())
            .then(data => {
                setDataMultiWeather(data)
            }).catch(err => {
                console.error(`Error: `, err)
            })

    }
    const contextValue: ServiceMultiWeatherContextProps ={
        dataMultiWeather,
        getMultiWeather
    }

    return (
        <MultiWeatherContext.Provider value={contextValue}>
            {children}
        </MultiWeatherContext.Provider>
    )
}

export default MultiWeatherProvider