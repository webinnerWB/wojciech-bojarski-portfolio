import React, {
    FC,
    useEffect,
    useContext
} from 'react'
import WeatherInfoBox from './WeatherInfoBox'
import { ServiceGetWeatherContextProps, WeatherContext } from '../services/WeatherContext'
import { ServiceTimeZoneContextProps, TimeZoneContext } from '../services/TimeZoneContext'
import style from '../../style/weather.module.scss'

type temperatureData = {
    temp: number| null,
    name: string | null,
    iconURL: string | null
    imgDesc: string | null
}




const TemperatureMainInfo: FC<temperatureData> = ({ temp, name, iconURL,imgDesc }: temperatureData) => {
    const {
        data
    }: ServiceGetWeatherContextProps = useContext(WeatherContext)

    const {
        dataTimeZone,
        getTimeZonaData
    }: ServiceTimeZoneContextProps = useContext(TimeZoneContext)
    
    useEffect(() => {
        if(data) {
            getTimeZonaData(data.coord.lat, data.coord.lon)
            if(dataTimeZone) {
                console.log(`dataTimeZone`, dataTimeZone)
            }
        }
    }, [data])
    return(
        <>
            <div className='row'>
                <div className='col-6'>
                    <div className={style.setFlex}>
                        <div className={style.weatherInfoContainer}>
                            <div className={style.title}>
                                <h1 className={style.margin0}>{`Weather in ${name}`}</h1>
                                <span className={style.info}>{`Weather: ${imgDesc}`}</span>
                            </div>
                            <p className={`${style.temp} ${style.margin0}` }>{`Temperature: ${temp}`}<span>&#x2103;</span></p>
                        </div>
                        
                        {iconURL ? <img src={`../../${iconURL}`} className={style.weatherIcon}/> : null }
                    </div>
                    <WeatherInfoBox 
                    icon={<i className={`fa-regular fa-sun fa-2xs ${style.iconStyle}`} ></i>}
                    title={`Test`}
                    value={dataTimeZone && dataTimeZone.timezone}/>
                </div>
            </div>
        </>
    )
}

export default TemperatureMainInfo