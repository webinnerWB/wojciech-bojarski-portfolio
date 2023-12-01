import React, {
    FC,
    useEffect,
    useContext
} from 'react'
import WeatherInfoBox from './WeatherInfoBox'
import { ServiceGetWeatherContextProps, WeatherContext } from '../services/WeatherContext'
import { ServiceTimeZoneContextProps, TimeZoneContext } from '../services/TimeZoneContext'
import { Clock } from '../Clock'

import style from '../../style/weather.module.scss'

type temperatureData = {
    temp: number| null,
    name: string | null,
    iconURL: string | null
    imgDesc: string | null
}




const TemperatureMainInfo: FC<temperatureData> = ({ temp, name, iconURL,imgDesc }: temperatureData) => {
    const {
        data,
        getTimeFromTimeZone
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
                    <div className={style.infoWeatherWrapper}>
                        <div className={style.weatherInfoContainer}>
                            <div className={style.title}>
                                <h1 className={style.margin0}>{`Weather in ${name}`}</h1>
                                <span className={style.info}>{`Weather: ${imgDesc}`}</span>
                            </div>
                            <p className={`${style.temp} ${style.margin0}` }>{`Temperature: ${temp}`}<span>&#x2103;</span></p>
                        </div>
                        
                        {iconURL ? <img src={`../../${iconURL}`} className={style.weatherIcon}/> : null }
                    </div>
                    <div className={style.boxContainer}>
                        <WeatherInfoBox 
                        icon={<i className={`fa-regular fa-clock fa-2xs ${style.iconStyle}`} ></i>}
                        title='Current time'
                        value={dataTimeZone && data ? <Clock date={dataTimeZone.date} time={dataTimeZone.time_12}/> : ''}/>
                        
                        <WeatherInfoBox 
                        icon={<i className={`fa-solid fa-wind fa-2xs ${style.iconStyle}`} ></i>}
                        title='Wind speed'
                        value={`${data && data.wind.speed} m/s`}/>

                        <WeatherInfoBox 
                        icon={<i className={`fa-regular fa-face-smile fa-2xs ${style.iconStyle}`} ></i>}
                        title='Pressure'
                        value={`${data && data.main.pressure} hPa`}/>

                        <WeatherInfoBox 
                        icon={<i className={`fa-solid fa-droplet fa-2xs ${style.iconStyle}`} ></i>}
                        title='Humidity'
                        value={`${data && data.main.humidity }%`}/>
                        
                        <WeatherInfoBox 
                        icon={<i className={`fa-solid fa-temperature-high fa-2xs ${style.iconStyle}`} ></i>}
                        title='Feels like'
                        value={`${data && Math.floor(data.main.feels_like) }℃`}/>
                        
                        <WeatherInfoBox 
                        icon={<i className={`fa-solid fa-temperature-high fa-2xs ${style.iconStyle}`} ></i>}
                        title='Clouds'
                        value={`${data && data.clouds.all }%`}/>

                        <WeatherInfoBox 
                        icon={<i className={`fa-regular fa-sun fa-2xs ${style.iconStyle}`} ></i>}
                        title='Sunrise time'
                        value={dataTimeZone && data && getTimeFromTimeZone(dataTimeZone.timezone, data.sys.country, data.sys.sunrise)}/>
                        
                        <WeatherInfoBox 
                        icon={<i className={`fa-regular fa-moon fa-2xs ${style.iconStyle}`} ></i>}
                        title='Sunset time'
                        value={dataTimeZone && data && getTimeFromTimeZone(dataTimeZone.timezone, data.sys.country, data.sys.sunset)}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TemperatureMainInfo