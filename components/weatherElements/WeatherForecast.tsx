import React, {
    FC
} from 'react'

import style from '../../style/weather.module.scss'

type ForecastData = {
    fullDay: string|null|false,
    day: string|null|false,
    icon: string|null|false,
    description: string|null|false,
    temp: number|null|false
}

const WeatherForecast: FC<ForecastData> = ({day,fullDay, icon, description, temp}: ForecastData) => {
    const altText = icon ? `${icon} icon` : undefined

    return(
        <div className={`${style.forecastCurrentDayWrapper} ${style.swiperMb}`}>
            <p className={style.p}>{day && new Date(Number(day) * 1000).toLocaleString('en-us', {weekday:'long'})} {fullDay && fullDay.slice(11)}</p>
            <img src={`../../${icon}`} className={style.weatherIcon} alt={altText}/>
            <p className={style.p}>{description}</p>
            <p className={style.p}>{`${temp}℃`}</p>
        </div>
    )
}

export default WeatherForecast