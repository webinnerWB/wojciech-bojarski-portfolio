import React, {
    FC
} from 'react'

import style from '../../style/weather.module.scss'

type ForecastData = {
    day: string|null|false,
    icon: string|null|false,
    description: string|null|false,
    temp: number|null|false
}

const WeatherForecast: FC<ForecastData> = ({day, icon, description, temp}: ForecastData) => {
    const altText = icon ? `${icon} icon` : undefined;

    return(
        <div className={`${style.forecastCurrentDayWrapper}`}>
            <p className={style.p}>{day}</p>
            <img src={`../../${icon}`} className={style.weatherIcon} alt={altText}/>
            <p className={style.p}>{description}</p>
            <p className={style.p}>{`${temp}℃`}</p>
        </div>
    )
}

export default WeatherForecast