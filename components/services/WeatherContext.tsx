import React,
{
    createContext,
    useEffect,
    useState,
    FC,
    ReactNode
} from "react";

type WeatherData = {
    data: any,
    main: any,
    name: string,
    weather: any
}

export interface ServiceGetWeatherContextProps  {
    data: WeatherData | null,
    handleCityName: ( value:string ) => void,
    getWeatherData: ( e: React.FormEvent<HTMLFormElement> ) => void
}

export const WeatherContext = createContext<ServiceGetWeatherContextProps>({} as ServiceGetWeatherContextProps)

type WeatherContextProviderProps = {
    children: ReactNode,
}

const WeatherContextProvider: FC<WeatherContextProviderProps> = ({
    children,
}: WeatherContextProviderProps) => {
    const [city, setCity] = useState<string>('')
    const [data, setData] = useState<WeatherData | null>(null);
    
    const handleCityName = ( value: string ) => setCity(value)

    const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}&units=metric&lang=en`

    const getWeatherData = ( e: React.FormEvent<HTMLFormElement> ) => {

        if(e){
            e.preventDefault()
        }

        fetch(WEATHER_URL)
            .then(res => res.json())
            .then(req => {
                setData(() => req)
            }).catch(err => {
                console.error(`Error: ${err}`)
            })
    }

    const contextValue: ServiceGetWeatherContextProps = {
        handleCityName,
        data,
        getWeatherData
    };
    
    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherContextProvider;