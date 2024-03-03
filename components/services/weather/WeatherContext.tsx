import React,
{
    createContext,
    useState,
    FC,
    ReactNode
} from "react"

type WeatherData = {
    data: string,
    main: string,
    name: string,
    weather: string,
    coord: string,
    wind: string,
    clouds: string,
    sys: string,
    dt: string
    timezone: number
}

export interface ServiceGetWeatherContextProps  {
    data: WeatherData | null | string | any,
    error404: boolean,
    handleCityName: ( value:string ) => void,
    getWeatherData: ( e: React.FormEvent<HTMLFormElement> ) => void
    getTimeFromTimeZone: (timeZone:string, country:string, time:number) => string,
    getTimeFromTimeZoneWithDate: (timeZone:string, country:string, time:number) => string
}

export const WeatherContext = createContext<ServiceGetWeatherContextProps>({} as ServiceGetWeatherContextProps)

type WeatherContextProviderProps = {
    children: ReactNode,
}

const WeatherContextProvider: FC<WeatherContextProviderProps> = ({
    children,
}: WeatherContextProviderProps) => {
    const [city, setCity] = useState<string>('')
    const [error404, setError404] = useState<boolean>(false)
    const [data, setData] = useState<WeatherData | null>(null)
    
    const handleCityName = ( value: string ) => setCity(value)

    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}&units=metric&lang=en`

    const getWeatherData = ( e: React.FormEvent<HTMLFormElement> ) => {
        setData(null)
        setError404(false)

        if(e){
            e.preventDefault()
        }
        if(city) {
            fetch(WEATHER_URL)
            .then(res => {
                if(!res.ok) {
                    if(res.status === 404) {
                        setError404(true)
                    }
                }
                return res.json()
            })
            .then(data => {
                setData(() => data)
            }).catch(err => {
                console.error(`Error: ${err}`)
            })
        }
    }

    const getTimeFromTimeZone = (timeZone:string, country:string, time:number) => {
       const converterTime =  new Date(time * 1000).toLocaleTimeString(`${country.toLowerCase()}-${country}`, {hour12: true, timeZone: timeZone})

       return converterTime
    }

    const getTimeFromTimeZoneWithDate = (timeZone:string, country:string, time:number) => {
        const converterTime =  new Date(time * 1000).toLocaleTimeString(`${country.toLowerCase()}-${country}`, {hour12: true, timeZone: timeZone})
        const date = new Date(time * 1000).toLocaleDateString()
        const converterDet = `${date} ${converterTime}`
        return converterDet
     }

    const contextValue: ServiceGetWeatherContextProps = {
        handleCityName,
        data,
        error404,
        getWeatherData,
        getTimeFromTimeZone,
        getTimeFromTimeZoneWithDate
    }
    
    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherContextProvider