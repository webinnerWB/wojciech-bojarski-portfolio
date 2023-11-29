import React, { useContext, useEffect, useState} from 'react'
import TemperatureMainInfo from '../../components/weatherElements/TemeratureMainInfo'
import { WeatherContext, ServiceGetWeatherContextProps } from '../../components/services/WeatherContext'
import weatherInfo from '../../components/weatherElements/weatherInfoJSON'

import style from '../style/weather.module.scss'

const WeatherMainPage = () => {
    const [iconID, setIconID] = useState<number|null>(null)
    const [temp, setTemp] = useState<number|null>(null)
    const [name, setName] = useState<string|null>(null)
    const [imgURL, setImgURL] = useState<string|null>(null)
    const [imgDesc, setImgDesc] = useState<string|null>(null)
    const [icon, setIcon] = useState<string|null>(null)

    const {
        handleCityName,
        data,
        getWeatherData
    }: ServiceGetWeatherContextProps = useContext(WeatherContext)


    useEffect(() => {
        if (data && iconID !== null) {
            const matchedInfo = weatherInfo.find(el => iconID === el.id);
            if (matchedInfo) {
                if(((iconID === 800) || (iconID === 801) || (iconID === 802) || (iconID === 803)) && (icon === 'n') && matchedInfo.n) {
                    setImgURL(matchedInfo.n);
                }else if(matchedInfo.img && (icon === 'd')) {
                    setImgURL(matchedInfo.img);
                    }
                setImgDesc(matchedInfo.description);
            }
        }
    }, [data, iconID]);

   
    useEffect(() => {
        document.body.style.backgroundColor = '#161616'
        if(data){
            console.log(data)
            setTemp(Math.floor(data.main.temp))
            setName(data.name)
            setIconID(data.weather[0].id)
            setIcon(data.weather[0].icon.slice(-1))
        }
    }, [data])
    return(
        <div className='col-12'>
            <form
            onSubmit={(e) => {
                e.preventDefault();
                getWeatherData(e);
            }}>
                <div className="form-group">
                    <label htmlFor="cityName">City</label>
                    <input 
                        type="cityName" 
                        className="form-control" 
                        id="cityName" 
                        aria-describedby="cityName" 
                        placeholder="City"
                        onChange={(e) => handleCityName(e.target.value)}
                        />
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
            {data && <TemperatureMainInfo 
                temp={data && temp} 
                name={ data && name } 
                iconURL={ data && imgURL}
                imgDesc={ data && imgDesc}
            />}
        </div>
    )
}

export default WeatherMainPage