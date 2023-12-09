import React, { FC } from "react";

import style from '../../style/weather.module.scss'

type forecastData = {
    time: string|null|false,
    temp: number|null|false,
    icon: string|null|false
}

export const CurrentDayForecast: FC<forecastData> = ({time, temp, icon}: forecastData) => {
    const altText = icon ? `${icon} icon` : undefined;
    return (
        <div className={style.forecastCurrentDayWrapper}>
            <p className={style.p}>{time}</p>
            <img src={`../../${icon}`} className={style.weatherIcon} alt={altText}/>
            <p className={style.p}>{`${temp}℃`}</p>
        </div>
    )
}