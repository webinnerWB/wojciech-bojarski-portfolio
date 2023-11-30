import React, { FC } from 'react'

import style from '../../style/weather.module.scss'

type BoxInfo = {
    icon: React.ReactNode,
    title: string,
    value: string|null
}

const WeatherInfoBox: FC<BoxInfo> = ({icon, title, value}: BoxInfo) => {
    return(
        <div className={style.infoWeatherWrapper}>
            {icon}
            <div className={style.weatherDetailsWrapper}>
                <h2>{title}</h2>
                <p>{value}</p>
            </div>
        </div>
    )
}

export default WeatherInfoBox