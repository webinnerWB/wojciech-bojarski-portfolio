import React, {
    
    createContext,
    FC,
    useContext,
    useState,
    ReactNode
} from 'react'

type TimeZoneData = {
    dataTimeZone: any,
    timezone: any
}

export interface ServiceTimeZoneContextProps  {
    dataTimeZone: TimeZoneData|null,
    getTimeZonaData: (lat:string, long:string) => void
}

export const TimeZoneContext = createContext<ServiceTimeZoneContextProps>({} as ServiceTimeZoneContextProps)

type TimeZoneProviderProps = {
    children: ReactNode
}

const TimeZoneContextProvider: FC<TimeZoneProviderProps> = ({
    children
}: TimeZoneProviderProps) => {

    const [dataTimeZone, setDataTimeZone] = useState<any|null>(null)

    const getTimeZonaData = (lat:string, long:string) => {
        const timeZone_URL = `https://api.ipgeolocation.io/timezone?apiKey=${process.env.NEXT_PUBLIC_API_KEY_TIMEZONE}&lat=${lat}&long=${long}`
        fetch(timeZone_URL)
            .then(res => res.json())
            .then(data => {
                setDataTimeZone(data)
            }).catch(err => {
                console.error(`Error: `, err)
            })
    }

   const contextValue: ServiceTimeZoneContextProps = {
        dataTimeZone,
        getTimeZonaData
    }
    return(
        <TimeZoneContext.Provider value={contextValue}>
            {children}
        </TimeZoneContext.Provider>
    )
}

export  default TimeZoneContextProvider