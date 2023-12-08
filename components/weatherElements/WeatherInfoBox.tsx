import React, { 
    FC, 
    ReactNode 
} from 'react'

import style from '../../style/weather.module.scss'

type BoxInfo = {
    icon: ReactNode,
    title: string,
    value: string|ReactNode|null
}

const WeatherInfoBox: FC<BoxInfo> = ({icon, title, value}: BoxInfo) => {
    return(
        <div className={style.infoWeatherWrapper}>
            {icon}
            <div className={style.weatherDetailsWrapper}>
                <h2 className={style.boxTitle}>{title}</h2>
                <p className={`${style.margin0} ${style.boxValue}`}>{value}</p>
            </div>
        </div>
    )
}

export default WeatherInfoBox