import React, {
    FC,
} from 'react'

import style from '../../style/weather.module.scss'

type temperatureData = {
    temp: number| null,
    name: string | null,
    iconURL: string | null
    imgDesc: string | null
}




const TemperatureMainInfo: FC<temperatureData> = ({ temp, name, iconURL,imgDesc }: temperatureData) => {
    const altText = iconURL ? `${iconURL} icon` : undefined

    return(
        <>
            <div className={style.infoWeatherWrapper}>
                <div className={style.weatherInfoContainer}>
                    <div className={style.title}>
                        <h1 className={style.margin0}>{`Weather in ${name}`}</h1>
                        <span className={style.info}>{`Weather: ${imgDesc}`}</span>
                    </div>
                    <p className={`${style.temp} ${style.margin0}` }>{`Temperature: ${temp}`}<span>℃</span></p>
                </div>
                
                {iconURL ? <img src={`../../${iconURL}`} className={style.weatherIcon} alt={altText}/> : null }
            </div>
        </>
    )
}

export default TemperatureMainInfo